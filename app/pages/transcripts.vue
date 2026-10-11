<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.transcripts.title'),
  ogTitle: () => t('seo.transcripts.title'),
  description: () => t('seo.transcripts.description'),
  ogDescription: () => t('seo.transcripts.description'),
  ogImage: '/images/logo.jpg',
})
</script>

<template>
  <PagePortfolio />
</template>
