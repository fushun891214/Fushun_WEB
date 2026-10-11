<script setup>
definePageMeta({
  pageTransition: { name: 'page', mode: 'out-in' },
})

const { t } = useI18n()

useHead({
  link: [{ rel: 'canonical', href: 'https://fushun181.com/cv' }],
})

useSeoMeta({
  title: () => t('seo.cv.title'),
  ogTitle: () => t('seo.cv.title'),
  description: () => t('seo.cv.description'),
  ogDescription: () => t('seo.cv.description'),
  ogImage: '/images/logo.jpg',
})
</script>

<template>
  <PageCv />
</template>
