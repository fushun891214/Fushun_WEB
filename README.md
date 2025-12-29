# Fushun-WEB - 個人作品集網站

![GitHub repo size](https://img.shields.io/github/repo-size/fushun891214/Fushun_WEB)
![GitHub last commit](https://img.shields.io/github/last-commit/fushun891214/Fushun_WEB)

這是張富順的個人作品集網站，展示學歷、技能、專案經驗與研究所修課紀錄。採用純靜態網站架構，具備完整的響應式設計，支援所有裝置瀏覽。

## ✨ 特色

- 📱 **完全響應式設計** - 支援桌面、平板、手機
- 🎨 **現代化 UI** - 簡潔優雅的介面設計
- ⚡ **純靜態網站** - 無需後端，載入速度極快
- 🐳 **Docker 容器化** - 一鍵部署
- 🚀 **CI/CD 自動化** - GitHub Actions 自動部署到 EC2

## 🛠️ 技術棧

- **前端**: HTML5, CSS3, JavaScript (Vanilla)
- **字型**: Google Fonts (Poppins)
- **圖示**: Ionicons 5.5.2
- **部署**: Docker + Nginx/http-server
- **CI/CD**: GitHub Actions

## 📂 專案結構

```
Fushun-WEB/
├── index.html              # 主頁面
├── assets/
│   ├── css/
│   │   └── style.css      # 樣式表
│   ├── js/
│   │   └── script.js      # 互動邏輯
│   └── images/            # 圖片資源
├── Dockerfile             # Docker 建置檔
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions CI/CD
└── README.md
```

## 🚀 本地開發

### 前置要求

- [Git](https://git-scm.com/downloads)
- 瀏覽器（Chrome, Firefox, Safari 等）

### 安裝與執行

#### 方法 1：直接開啟（最簡單）

```bash
# Clone 專案
git clone https://github.com/fushun891214/Fushun_WEB.git
cd Fushun_WEB

# 直接用瀏覽器開啟
open index.html  # macOS
start index.html # Windows
```

#### 方法 2：使用 Python HTTP Server

```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# 瀏覽器訪問 http://localhost:8080
```

#### 方法 3：使用 Node.js http-server

```bash
# 安裝 http-server
npm install -g http-server

# 啟動伺服器
http-server . -p 8080

# 瀏覽器訪問 http://localhost:8080
```

#### 方法 4：使用 Docker（推薦用於生產環境）

```bash
# 建置 Docker 映像
docker build -t fushun-web .

# 啟動容器
docker run -d -p 8080:8080 --name fushun-web fushun-web

# 瀏覽器訪問 http://localhost:8080
```

## 🔄 CI/CD 自動化部署

本專案使用 GitHub Actions 自動部署到 EC2 伺服器。

### 部署流程

```
git push origin main
    ↓
GitHub Actions 觸發
    ↓
SSH 連接到 EC2
    ↓
拉取最新代碼
    ↓
重建 Docker 映像
    ↓
重啟容器
    ↓
✅ 部署完成！
```

### 設定步驟

1. **設定 GitHub Secrets**（Repository Settings → Secrets and variables → Actions）

   | Secret 名稱 | 說明 |
   |------------|------|
   | `EC2_HOST` | EC2 伺服器 IP 位址 |
   | `EC2_USERNAME` | SSH 登入用戶名（通常是 `ubuntu`） |
   | `EC2_SSH_KEY` | SSH 私鑰完整內容 |
   | `EC2_PORT` | SSH 連接 Port（預設 `22`） |

2. **EC2 伺服器準備**

   ```bash
   # 安裝 Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker ubuntu

   # Clone 專案
   cd ~
   git clone https://github.com/fushun891214/Fushun_WEB.git
   cd Fushun_WEB
   ```

3. **推送代碼觸發部署**

   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

   GitHub Actions 會自動執行部署流程。

## 📝 自訂內容

修改以下檔案來自訂您的作品集：

- **個人資訊**: `index.html` (line 44-135)
- **技能展示**: `index.html` (line 200-289)
- **學歷經歷**: `index.html` (line 314-471)
- **樣式調整**: `assets/css/style.css`
- **互動行為**: `assets/js/script.js`

## 📄 授權

MIT License

---

**開發者**: 張富順
**學歷**: 國立臺北科技大學電子工程所計算機組 (碩二)
**聯絡方式**: fushun891214@gmail.com
