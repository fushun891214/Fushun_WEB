<script setup>
const activePage = ref('about')

useSeoMeta({
  title: '張富順 | 全端工程師',
  ogTitle: '張富順 | 全端工程師',
  description: '張富順的個人作品集，全端工程師，熟悉後端開發、雲端服務與 LLM 應用。',
  ogDescription: '張富順的個人作品集，全端工程師，熟悉 .NET、Vue、Nuxt、AWS 等技術。',
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
