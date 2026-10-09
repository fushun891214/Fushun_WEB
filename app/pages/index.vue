<script setup>
const activePage = ref('about')
const { t, locale } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value === 'zh' ? 'zh-TW' : 'en-US' },
}))

useSeoMeta({
  title: () => t('seo.title'),
  ogTitle: () => t('seo.title'),
  description: () => t('seo.description'),
  ogDescription: () => t('seo.description'),
  ogImage: '/images/logo.jpg',
})
</script>

<template>
  <main>
    <AppSidebar />

    <div class="main-content">
      <AppNavbar :active-page="activePage" @change-page="activePage = $event" />

      <PageAbout :class="{ active: activePage === 'about' }" />
      <PageResume :class="{ active: activePage === 'resume' }" />
      <PagePortfolio :class="{ active: activePage === 'portfolio' }" />
      <PageCv :class="{ active: activePage === 'cv' }" />
    </div>
  </main>
</template>
