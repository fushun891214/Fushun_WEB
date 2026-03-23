<script setup>
defineProps(['activePage'])
const emit = defineEmits(['changePage'])

const { locale, setLocale } = useI18n()
const isSettingsOpen = ref(false)

function changeLang(lang) {
  setLocale(lang)
  isSettingsOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-settings]')) {
      isSettingsOpen.value = false
    }
  })
})
</script>

<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li class="navbar-item">
        <button
          class="navbar-link"
          :class="{ active: activePage === 'about' }"
          @click="emit('changePage', 'about')"
        >
          <span>{{ $t('nav.about') }}</span>
        </button>
      </li>

      <li class="navbar-item">
        <button
          class="navbar-link"
          :class="{ active: activePage === 'resume' }"
          @click="emit('changePage', 'resume')"
        >
          <span>{{ $t('nav.resume') }}</span>
        </button>
      </li>

      <li class="navbar-item">
        <button
          class="navbar-link"
          :class="{ active: activePage === 'portfolio' }"
          @click="emit('changePage', 'portfolio')"
        >
          <span>{{ $t('nav.portfolio') }}</span>
        </button>
      </li>

      <li class="navbar-item">
        <button
          class="navbar-link"
          :class="{ active: activePage === 'cv' }"
          @click="emit('changePage', 'cv')"
        >
          <span>{{ $t('nav.cv') }}</span>
        </button>
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
