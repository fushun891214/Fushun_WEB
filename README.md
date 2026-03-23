# Fushun-WEB

張富順的個人作品集網站，使用 Nuxt 3 建置，支援 SSR/SSG 渲染與 SEO 優化，並整合中英文語言切換功能。

## 技術架構

- **Framework**：Nuxt 3 (SSG 模式)
- **i18n**：@nuxtjs/i18n，支援繁體中文 / English，URL 不變的 SPA 切換
- **部署**：Docker multi-stage build，運行於 AWS EC2
- **CI/CD**：GitHub Actions，push 到 main 自動部署

## 快速啟動

安裝依賴：

```bash
npm install
```

啟動開發伺服器（`http://localhost:3000`）：

```bash
npm run dev
```

## 建置與部署

產出靜態檔案（SSG）：

```bash
npm run generate
# 輸出至 .output/public/
```

本地預覽產出結果：

```bash
npm run preview
```

### Docker 部署

```bash
# 建置 image
docker build -t fushun-web:latest .

# 啟動容器（port 8080）
docker run -d \
  --name fushun-web \
  -p 8080:8080 \
  --restart unless-stopped \
  fushun-web:latest
```

### CI/CD 自動部署

push 到 `main` 分支後，GitHub Actions 會自動透過 SSH 連入 EC2 執行 build 與部署。

所需 GitHub Secrets：

| Secret | 說明 |
|--------|------|
| `EC2_HOST` | EC2 主機 IP |
| `EC2_USERNAME` | SSH 使用者名稱 |
| `EC2_SSH_KEY` | SSH 私鑰 |
| `EC2_PORT` | SSH Port |

## 專案結構

```
├── app/
│   ├── app.vue
│   ├── assets/css/       # 所有 CSS 樣式
│   ├── components/       # Vue 元件 (AppSidebar, AppNavbar, Page*)
│   └── pages/index.vue   # 主頁面，SPA 切換邏輯
├── i18n/locales/         # 翻譯檔 (zh.json, en.json)
├── public/images/        # 靜態圖片資源
├── nuxt.config.ts        # Nuxt 設定、SEO meta、i18n
└── Dockerfile            # Multi-stage build
```
