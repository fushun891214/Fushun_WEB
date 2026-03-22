'use strict';

// ============================================
// Component Loader - 載入 HTML 元件
// ============================================

/**
 * 載入單一 HTML 元件
 * @param {string} url - 元件檔案路徑
 * @param {string} containerId - 容器元素 ID
 */
async function loadComponent(url, containerId) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading component: ${error.message}`);
  }
}

/**
 * 載入所有頁面元件 (about, resume, portfolio)
 * @param {string} containerId - 頁面容器元素 ID
 */
async function loadPages(containerId) {
  const pages = ['about', 'resume', 'portfolio', 'cv'];
  let allHtml = '';

  for (const page of pages) {
    try {
      const response = await fetch(`./components/${page}.html`);
      if (!response.ok) throw new Error(`Failed to load ${page}.html`);
      allHtml += await response.text();
    } catch (error) {
      console.error(`Error loading page: ${error.message}`);
    }
  }

  document.getElementById(containerId).innerHTML = allHtml;
}

/**
 * 初始化所有元件並設定事件監聯器
 */
async function initApp() {
  // 載入所有元件
  await Promise.all([
    loadComponent('./components/sidebar.html', 'sidebar-container'),
    loadComponent('./components/navbar.html', 'navbar-container'),
    loadPages('pages-container')
  ]);

  // 元件載入完成後，初始化事件監聽器
  initSidebar();
  initNavigation();

  // 初始化 i18n 國際化模組
  if (window.I18n) {
    await I18n.init();
  }
}

// ============================================
// Sidebar - 側邊欄功能
// ============================================

function initSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }
}

// ============================================
// Navigation - 頁面導航功能
// ============================================

function initNavigation() {
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {

      // 移除所有導航按鈕的 active class
      for (let k = 0; k < navigationLinks.length; k++) {
        navigationLinks[k].classList.remove("active");
      }

      // 對被點擊的按鈕加上 active class
      this.classList.add("active");

      // 顯示對應的頁面,隱藏其他頁面
      for (let j = 0; j < pages.length; j++) {
        if (this.dataset.page === pages[j].dataset.page) {
          pages[j].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
        }
      }

    });
  }
}

// ============================================
// App Entry Point - 應用程式進入點
// ============================================

document.addEventListener('DOMContentLoaded', initApp);
