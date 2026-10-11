<script setup>
definePageMeta({
  pageTransition: { name: 'page', mode: 'out-in' },
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.resume.title'),
  ogTitle: () => t('seo.resume.title'),
  description: () => t('seo.resume.description'),
  ogDescription: () => t('seo.resume.description'),
  ogImage: '/images/logo.jpg',
})
</script>

<template>
  <PageResume />
</template>
