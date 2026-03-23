<script setup>
const isExpanded = ref(false)
</script>

<template>
  <aside class="sidebar" :class="{ active: isExpanded }" data-sidebar>
    <div class="sidebar-info">
      <figure class="avatar-box">
        <img src="/images/my-avatar.jpg" alt="FU-SHUN ZHANG" width="80" />
      </figure>

      <div class="info-content">
        <h1 class="name">{{ $t('sidebar.name') }}</h1>
        <p class="title">{{ $t('sidebar.title') }}</p>
      </div>

      <button class="info_more-btn" @click="isExpanded = !isExpanded">
        <span>{{ $t('sidebar.showContacts') }}</span>
        <ion-icon name="chevron-down"></ion-icon>
      </button>
    </div>

    <div class="sidebar-info_more">
      <div class="separator"></div>

      <ul class="contacts-list">
        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="mail-outline"></ion-icon>
          </div>
          <div class="contact-info">
            <p class="contact-title">{{ $t('sidebar.email') }}</p>
            <a href="mailto:fushun891214@gmail.com" class="contact-link">fushun891214@gmail.com</a>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="phone-portrait-outline"></ion-icon>
          </div>
          <div class="contact-info">
            <p class="contact-title">{{ $t('sidebar.phone') }}</p>
            <a href="tel:+886968733583" class="contact-link">0968733583</a>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="calendar-outline"></ion-icon>
          </div>
          <div class="contact-info">
            <p class="contact-title">{{ $t('sidebar.birthday') }}</p>
            <time datetime="2000-12-14">2000-12-14</time>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="location-outline"></ion-icon>
          </div>
          <div class="contact-info">
            <p class="contact-title">{{ $t('sidebar.location') }}</p>
            <address>{{ $t('sidebar.locationValue') }}</address>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>
