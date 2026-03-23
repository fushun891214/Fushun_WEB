// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n'],

  css: ['~/assets/css/style.css'],

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'zh',
    locales: [
      { code: 'zh', language: 'zh-TW', file: 'zh.json' },
      { code: 'en', language: 'en-US', file: 'en.json' }
    ],
    langDir: 'locales/',
    detectBrowserLanguage: false,
    compilation: {
      strictMessage: false
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-TW' },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: '張富順的個人作品集，全端工程師，熟悉後端開發、雲端服務與 LLM 應用。' },
        { property: 'og:title', content: '張富順 | 全端工程師' },
        { property: 'og:description', content: '張富順的個人作品集，全端工程師，熟悉 .NET、Vue、Nuxt、AWS 等技術。' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', href: '/images/logo.jpg', type: 'image/jpeg' },
        { rel: 'shortcut icon', href: '/images/logo.jpg', type: 'image/jpeg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap' }
      ],
      script: [
        { type: 'module', src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js' },
        { nomodule: true, src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js' }
      ]
    }
  }
})
