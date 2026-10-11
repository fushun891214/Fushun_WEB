<script setup>
const { t } = useI18n()

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
