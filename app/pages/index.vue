<script setup>
definePageMeta({
  pageTransition: { name: 'page', mode: 'out-in' },
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  ogTitle: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogDescription: () => t('seo.home.description'),
  ogImage: '/images/logo.jpg',
})
</script>

<template>
  <PageAbout />
</template>
