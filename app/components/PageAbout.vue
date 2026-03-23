<template>
  <article class="about" data-page="about">
    <header>
      <h2 class="h2 article-title">{{ $t('about.title') }}</h2>
    </header>

    <section class="about-text">
      <p v-html="$t('about.intro1')"></p>
      <p v-html="$t('about.intro2')"></p>
      <p>{{ $t('about.intro3') }}</p>
    </section>

    <section class="service">
      <h3 class="h3 service-title">{{ $t('about.skillsTitle') }}</h3>

      <ul class="service-list">
        <li class="service-item">
          <div class="service-icon-box">
            <img src="/images/backend.png" alt="design icon" width="40" />
          </div>
          <div class="service-content-box">
            <h4 class="h4 service-item-title">{{ $t('about.backend.title') }}</h4>
            <ul class="service-item-list">
              <li v-for="item in $tm('about.backend.items')" :key="$rt(item)">{{ $rt(item) }}</li>
            </ul>
          </div>
        </li>

        <li class="service-item">
          <div class="service-icon-box">
            <img src="/images/frondend.png" alt="Web development icon" width="40" />
          </div>
          <div class="service-content-box">
            <h4 class="h4 service-item-title">{{ $t('about.frontend.title') }}</h4>
            <ul class="service-item-list">
              <li v-for="item in $tm('about.frontend.items')" :key="$rt(item)">{{ $rt(item) }}</li>
            </ul>
          </div>
        </li>

        <li class="service-item">
          <div class="service-icon-box">
            <img src="/images/cloud.png" alt="mobile app icon" width="40" />
          </div>
          <div class="service-content-box">
            <h4 class="h4 service-item-title">{{ $t('about.cloud.title') }}</h4>
            <ul class="service-item-list">
              <li v-for="item in $tm('about.cloud.items')" :key="$rt(item)">{{ $rt(item) }}</li>
            </ul>
          </div>
        </li>

        <li class="service-item">
          <div class="service-icon-box">
            <img src="/images/langchain.png" alt="camera icon" width="40" />
          </div>
          <div class="service-content-box">
            <h4 class="h4 service-item-title">{{ $t('about.llm.title') }}</h4>
            <ul class="service-item-list">
              <li v-for="item in $tm('about.llm.items')" :key="$rt(item)">{{ $rt(item) }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  </article>
</template>
