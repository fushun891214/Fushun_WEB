<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { locale } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value === 'zh' ? 'zh-TW' : 'en-US' },
}))

useSeoMeta({
  ogSiteName: '張富順｜AI 工程師・全端開發',
})
</script>
