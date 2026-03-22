'use strict';

// ============================================
// i18n - 國際化語言切換模組
// ============================================

const I18n = {
  currentLang: 'zh',
  translations: {},

  /**
   * 初始化 i18n 模組
   */
  async init() {
    // 從 localStorage 讀取語言偏好，預設為中文
    this.currentLang = localStorage.getItem('lang') || 'zh';
    await this.loadTranslations(this.currentLang);
    this.applyTranslations();
    this.updateLangCheck();
    this.bindSettings();
  },

  /**
   * 載入翻譯檔案
   * @param {string} lang - 語言代碼 (zh/en)
   */
  async loadTranslations(lang) {
    try {
      const response = await fetch(`./assets/i18n/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      this.translations = await response.json();
    } catch (error) {
      console.error(`Error loading translations: ${error.message}`);
    }
  },

  /**
   * 根據 key 路徑取得翻譯文字
   * @param {string} key - 翻譯 key (例如: "sidebar.name")
   * @returns {string|array} 翻譯文字或陣列
   */
  getText(key) {
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return value;
  },

  /**
   * 套用翻譯到所有 data-i18n 元素
   */
  applyTranslations() {
    // 處理純文字內容
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.getText(key);
      if (typeof text === 'string') {
        el.textContent = text;
      }
    });

    // 處理包含 HTML 的內容
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const html = this.getText(key);
      if (typeof html === 'string') {
        el.innerHTML = html;
      }
    });

    // 處理列表內容 (ul > li)
    document.querySelectorAll('[data-i18n-list]').forEach(ul => {
      const key = ul.getAttribute('data-i18n-list');
      const items = this.getText(key);
      if (Array.isArray(items)) {
        const lis = ul.querySelectorAll('li');
        items.forEach((text, index) => {
          if (lis[index]) {
            lis[index].textContent = text;
          }
        });
      }
    });

    // 更新頁面語言屬性
    document.documentElement.lang = this.currentLang === 'zh' ? 'zh-TW' : 'en';

    // 切換 CV PDF 來源
    const cvEmbed = document.querySelector('[data-cv-embed]');
    if (cvEmbed) {
      const src = this.currentLang === 'zh'
        ? cvEmbed.getAttribute('data-cv-zh')
        : cvEmbed.getAttribute('data-cv-en');
      cvEmbed.setAttribute('src', src);
    }
  },

  /**
   * 切換語言
   * @param {string} lang - 語言代碼 (zh/en)
   */
  async setLang(lang) {
    if (lang === this.currentLang) return;

    this.currentLang = lang;
    localStorage.setItem('lang', this.currentLang);
    await this.loadTranslations(this.currentLang);
    this.applyTranslations();
    this.updateLangCheck();
  },

  /**
   * 更新語言選項的勾選狀態
   */
  updateLangCheck() {
    document.querySelectorAll('[data-lang-check]').forEach(check => {
      const lang = check.getAttribute('data-lang-check');
      if (lang === this.currentLang) {
        check.classList.add('active');
      } else {
        check.classList.remove('active');
      }
    });
  },

  /**
   * 綁定設定選單事件
   */
  bindSettings() {
    const settingsDropdown = document.querySelector('[data-settings]');
    const settingsBtn = document.querySelector('[data-settings-btn]');
    const langItems = document.querySelectorAll('[data-lang]');

    if (settingsBtn && settingsDropdown) {
      // 點擊齒輪按鈕切換選單
      settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsDropdown.classList.toggle('active');
      });

      // 點擊其他地方關閉選單
      document.addEventListener('click', (e) => {
        if (!settingsDropdown.contains(e.target)) {
          settingsDropdown.classList.remove('active');
        }
      });
    }

    // 綁定語言選項點擊事件
    langItems.forEach(item => {
      item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang');
        this.setLang(lang);
        settingsDropdown.classList.remove('active');
      });
    });
  }
};

// 匯出給其他模組使用
window.I18n = I18n;
