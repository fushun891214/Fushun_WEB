<script setup>
const { locale, setLocale } = useI18n()
const route = useRoute()
const isSettingsOpen = ref(false)
const navigationItems = [
  { key: 'about', to: '/' },
  { key: 'resume', to: '/resume' },
  { key: 'portfolio', to: '/transcripts' },
  { key: 'cv', to: '/cv' },
]

function changeLang(lang) {
  setLocale(lang)
  isSettingsOpen.value = false
}

function closeSettings(event) {
  if (!event.target.closest('[data-settings]')) {
    isSettingsOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeSettings))
onUnmounted(() => document.removeEventListener('click', closeSettings))
</script>

<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li v-for="item in navigationItems" :key="item.to" class="navbar-item">
        <NuxtLink class="navbar-link" :class="{ active: route.path === item.to }" :to="item.to">
          <span>{{ $t(`nav.${item.key}`) }}</span>
        </NuxtLink>
      </li>

      <li class="navbar-item settings-item">
        <div class="settings-dropdown" :class="{ active: isSettingsOpen }" data-settings>
          <button class="settings-btn" title="Settings" @click.stop="isSettingsOpen = !isSettingsOpen">
            <ion-icon name="settings-outline"></ion-icon>
          </button>
          <div class="settings-menu">
            <button class="settings-menu-item" @click="changeLang('zh')">
              <span>繁體中文</span>
              <ion-icon v-if="locale === 'zh'" name="checkmark" class="lang-check active"></ion-icon>
              <ion-icon v-else name="checkmark" class="lang-check"></ion-icon>
            </button>
            <button class="settings-menu-item" @click="changeLang('en')">
              <span>English</span>
              <ion-icon v-if="locale === 'en'" name="checkmark" class="lang-check active"></ion-icon>
              <ion-icon v-else name="checkmark" class="lang-check"></ion-icon>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>
