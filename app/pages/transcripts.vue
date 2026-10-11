<script setup>
definePageMeta({
  pageTransition: { name: 'page', mode: 'out-in' },
})

const { t } = useI18n()

useHead({
  link: [{ rel: 'canonical', href: 'https://fushun181.com/transcripts' }],
})

useSeoMeta({
  title: () => t('seo.transcripts.title'),
  ogTitle: () => t('seo.transcripts.title'),
  description: () => t('seo.transcripts.description'),
  ogDescription: () => t('seo.transcripts.description'),
  ogImage: '/images/logo.jpg',
})
</script>

<template>
  <PageTranscripts />
</template>
