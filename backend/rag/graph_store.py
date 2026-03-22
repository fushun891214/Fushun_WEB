import json
from pathlib import Path

import networkx as nx

GRAPH_PATH = Path(__file__).parent.parent / "data" / "graph.json"


class GraphStore:
    def __init__(self):
        self.graph = nx.DiGraph()

    def add_node(self, node_id: str, node_type: str, **attrs):
        self.graph.add_node(node_id, type=node_type, **attrs)

    def add_edge(self, source: str, target: str, relation: str, **attrs):
        self.graph.add_edge(source, target, relation=relation, **attrs)

    def get_node_context(self, node_id: str) -> str:
        """取得節點及其所有關聯資訊，轉為文字供 RAG 使用"""
        if node_id not in self.graph:
            return ""

        node_data = self.graph.nodes[node_id]
        parts = [f"{node_id}（{node_data.get('type', '')}）"]

        for src, tgt, data in self.graph.edges(data=True):
            if src == node_id:
                parts.append(f"  --{data['relation']}--> {tgt}")
            elif tgt == node_id:
                parts.append(f"  <--{data['relation']}-- {src}")

        return "\n".join(parts)

    def search_nodes(self, query: str) -> list[str]:
        """關鍵字搜尋節點"""
        query_lower = query.lower()
        results = []
        for node_id, data in self.graph.nodes(data=True):
            if query_lower in node_id.lower():
                results.append(node_id)
            elif any(query_lower in str(v).lower() for v in data.values()):
                results.append(node_id)
        return results

    def get_context_for_query(self, query: str) -> str:
        """搜尋相關節點並組合成完整 context"""
        matched_nodes = self.search_nodes(query)
        if not matched_nodes:
            return ""
        contexts = [self.get_node_context(n) for n in matched_nodes[:5]]
        return "\n\n".join(contexts)

    def save(self):
        GRAPH_PATH.parent.mkdir(parents=True, exist_ok=True)
        data = nx.node_link_data(self.graph)
        with open(GRAPH_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def load(self) -> bool:
        if not GRAPH_PATH.exists():
            return False
        with open(GRAPH_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
        self.graph = nx.node_link_graph(data)
        return True
