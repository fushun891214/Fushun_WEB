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
</script>
