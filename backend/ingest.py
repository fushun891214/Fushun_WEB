"""
一次性執行的資料注入腳本。
解析個人網站 HTML → 分塊 → Gemini Embedding → ChromaDB
同時建立 NetworkX 知識圖 → 存為 JSON

使用方式：
    python ingest.py --api-key YOUR_GEMINI_API_KEY
"""
import argparse
import sys
from pathlib import Path

from bs4 import BeautifulSoup
from langchain_core.documents import Document

sys.path.insert(0, str(Path(__file__).parent))
from rag.graph_store import GraphStore
from rag.vector_store import get_vector_store

COMPONENTS_DIR = Path(__file__).parent.parent / "components"


# ── HTML 解析 ──────────────────────────────────────────────────────────────

def parse_sidebar() -> list[Document]:
    soup = BeautifulSoup(
        (COMPONENTS_DIR / "sidebar.html").read_text(encoding="utf-8"), "lxml"
    )
    docs = []

    name = soup.find(class_="name")
    title = soup.find(class_="title")
    if name and title:
        docs.append(Document(
            page_content=f"姓名：{name.get_text(strip=True)}\n職稱：{title.get_text(strip=True)}",
            metadata={"source": "sidebar", "section": "basic_info"},
        ))

    for item in soup.find_all(class_="contact-item"):
        label = item.find(class_="contact-title")
        value = (
            item.find(class_="contact-link")
            or item.find("time")
            or item.find("address")
        )
        if label and value:
            docs.append(Document(
                page_content=f"{label.get_text(strip=True)}：{value.get_text(strip=True)}",
                metadata={"source": "sidebar", "section": "contact"},
            ))

    return docs


def parse_about() -> list[Document]:
    soup = BeautifulSoup(
        (COMPONENTS_DIR / "about.html").read_text(encoding="utf-8"), "lxml"
    )
    docs = []

    about_text = soup.find(class_="about-text")
    if about_text:
        for p in about_text.find_all("p"):
            text = p.get_text(strip=True)
            if text:
                docs.append(Document(
                    page_content=text,
                    metadata={"source": "about", "section": "intro"},
                ))

    for item in soup.find_all(class_="service-item"):
        title_el = item.find(class_="service-item-title")
        skills_list = item.find(class_="service-item-list")
        if title_el and skills_list:
            skills = [
                li.get_text(strip=True)
                for li in skills_list.find_all("li")
                if li.get_text(strip=True)
            ]
            content = f"{title_el.get_text(strip=True)}：\n" + "\n".join(
                f"- {s}" for s in skills
            )
            docs.append(Document(
                page_content=content,
                metadata={
                    "source": "about",
                    "section": "skills",
                    "skill_category": title_el.get_text(strip=True),
                },
            ))

    return docs


def parse_resume() -> list[Document]:
    soup = BeautifulSoup(
        (COMPONENTS_DIR / "resume.html").read_text(encoding="utf-8"), "lxml"
    )
    docs = []

    for section in soup.find_all(class_="timeline"):
        title_wrapper = section.find(class_="title-wrapper")
        if not title_wrapper:
            continue
        section_h3 = title_wrapper.find("h3")
        if not section_h3:
            continue
        section_name = section_h3.get_text(strip=True)

        if "學歷" in section_name:
            for item in section.find_all(class_="timeline-item"):
                title_el = item.find(class_="timeline-item-title")
                span = item.find("span")
                if title_el:
                    text = title_el.get_text(strip=True)
                    if span:
                        text += f"（{span.get_text(strip=True)}）"
                    docs.append(Document(
                        page_content=f"學歷：{text}",
                        metadata={"source": "resume", "section": "education"},
                    ))

        elif "作品集" in section_name:
            for item in section.find_all(class_="timeline-item"):
                text = "\n".join(
                    line
                    for line in item.get_text(separator="\n", strip=True).splitlines()
                    if line.strip()
                )
                if text:
                    strong = item.find("strong")
                    project_title = strong.get_text(strip=True) if strong else "專案"
                    docs.append(Document(
                        page_content=text,
                        metadata={
                            "source": "resume",
                            "section": "project",
                            "project": project_title,
                        },
                    ))

    return docs


# ── 知識圖建立 ─────────────────────────────────────────────────────────────

def build_graph() -> GraphStore:
    store = GraphStore()

    store.add_node(
        "張富順", "Person",
        name_en="Fu-Shun Zhang",
        title="全端工程師",
        email="fushun891214@gmail.com",
        location="新北市淡水區",
        birthday="2000-12-14",
    )

    store.add_node("國立臺北科技大學電子工程所計算機組", "School", period="2024-2026")
    store.add_node("東吳大學資訊管理系", "School", period="2021-2024")
    store.add_edge("張富順", "國立臺北科技大學電子工程所計算機組", "studied_at", period="2024-2026")
    store.add_edge("張富順", "東吳大學資訊管理系", "studied_at", period="2021-2024")

    for skill in ["後端開發", "網頁開發", "雲服務開發", "LLM應用開發"]:
        store.add_node(skill, "SkillCategory")
        store.add_edge("張富順", skill, "skilled_in")

    skill_tech_map = {
        "後端開發": [".NET", "Express", "MVC架構", "Docker", "Git", "Jenkins", "CI/CD"],
        "網頁開發": ["HTML", "JavaScript", "CSS", "EJS", "Vue", "Nuxt", "SEO", "axios"],
        "雲服務開發": ["AWS EC2", "AWS Lambda", "AWS S3", "AWS ECR", "Cloudflare", "Load Balancer"],
        "LLM應用開發": ["Ollama", "LangChain", "LangGraph", "RAG", "AI Agent", "Multi Agent"],
    }
    for skill, techs in skill_tech_map.items():
        for tech in techs:
            if not store.graph.has_node(tech):
                store.add_node(tech, "Technology")
            store.add_edge(skill, tech, "uses")

    projects = {
        "虛擬檔案系統": {
            "source": "NTUT", "type": "期末專案", "course": "進階C語言實務",
            "techs": ["C語言", "INode", "SuperBlock", "Bitmap"],
        },
        "付清Bar": {
            "source": "NTUT", "type": "期末專案", "course": "作業系統",
            "techs": ["後端API", "Firebase Cloud Messaging", "資料庫設計"],
        },
        "iTalkuTalk": {
            "source": "NTUT", "type": "實驗室專案",
            "desc": "語言學習平台，Google Play超過100萬次下載",
            "techs": ["REST API", "MongoDB", "Vue", "EJS", "AWS"],
        },
        "HomeEasy": {
            "source": "NTUT", "type": "實驗室專案", "desc": "裝潢施工比價平台",
            "techs": ["REST API", "MongoDB", "SEO", "Google Search Console"],
        },
        "股票資料爬蟲": {
            "source": "SCU", "type": "期末專案", "course": "資料工程實務與應用",
            "techs": ["Python", "MongoDB", "Matplotlib", "爬蟲"],
        },
        "旅遊網站": {
            "source": "SCU", "type": "期末專案", "course": "敏捷開發與實務應用",
            "techs": ["Scrum", "RWD", "Email驗證"],
        },
        "皮膚識別APP": {
            "source": "SCU", "type": "大學專題",
            "techs": ["AI模型整合", "Google第三方登入", "APP開發"],
        },
    }

    for project_name, attrs in projects.items():
        techs = attrs.pop("techs", [])
        store.add_node(project_name, "Project", **attrs)
        store.add_edge("張富順", project_name, "built")
        for tech in techs:
            if not store.graph.has_node(tech):
                store.add_node(tech, "Technology")
            store.add_edge(project_name, tech, "uses")

    return store


# ── 主程式 ─────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Ingest portfolio content into RAG stores")
    parser.add_argument("--api-key", required=True, help="Gemini API key")
    args = parser.parse_args()

    print("📄 Parsing HTML files...")
    docs: list[Document] = []
    docs.extend(parse_sidebar())
    docs.extend(parse_about())
    docs.extend(parse_resume())
    print(f"   → {len(docs)} documents extracted")

    print("💾 Building vector store (embedding via Gemini)...")
    vector_store = get_vector_store(args.api_key)
    vector_store.add_documents(docs)
    print("   → ChromaDB saved to backend/data/chroma/")

    print("🕸  Building knowledge graph...")
    graph = build_graph()
    graph.save()
    print(f"   → Graph saved to backend/data/graph.json")
    print(f"   → Nodes: {graph.graph.number_of_nodes()}, Edges: {graph.graph.number_of_edges()}")

    print("✅ Ingestion complete!")


if __name__ == "__main__":
    main()
