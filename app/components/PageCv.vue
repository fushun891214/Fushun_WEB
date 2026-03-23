<script setup>
const { locale } = useI18n()
const cvSrc = computed(() =>
  locale.value === 'zh'
    ? 'https://cv.fushun181.com/fushun_resume_zh.pdf'
    : 'https://cv.fushun181.com/fushun_resume.pdf'
)
</script>

<template>
  <article class="cv" data-page="cv">
    <header>
      <h2 class="h2 article-title">{{ $t('cv.title') }}</h2>
    </header>

    <section class="cv-content">
      <embed :src="cvSrc" type="application/pdf" />
    </section>
  </article>
</template>
