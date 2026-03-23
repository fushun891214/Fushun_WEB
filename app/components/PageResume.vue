<template>
  <article class="resume" data-page="resume">
    <header>
      <h2 class="h2 article-title">{{ $t('resume.title') }}</h2>
    </header>

    <section class="timeline">
      <div class="title-wrapper">
        <div class="icon-box">
          <ion-icon name="book-outline"></ion-icon>
        </div>
        <h3 class="h3">{{ $t('resume.education') }}</h3>
      </div>

      <ol class="timeline-list">
        <li class="timeline-item timeline-item-with-logo">
          <img src="/images/school-logos/ntut-logo.png" alt="國立臺北科技大學" class="timeline-logo" />
          <div class="timeline-content">
            <h4 class="h4 timeline-item-title">{{ $t('resume.ntut') }}</h4>
            <span>{{ $t('resume.ntutYear') }}</span>
          </div>
        </li>
        <li class="timeline-item timeline-item-with-logo">
          <img src="/images/school-logos/scu-logo.gif" alt="東吳大學" class="timeline-logo" />
          <div class="timeline-content">
            <h4 class="h4 timeline-item-title">{{ $t('resume.scu') }}</h4>
            <span>{{ $t('resume.scuYear') }}</span>
          </div>
        </li>
      </ol>
    </section>

    <section class="timeline">
      <div class="title-wrapper">
        <div class="icon-box">
          <ion-icon name="book-outline"></ion-icon>
        </div>
        <h3 class="h3">{{ $t('resume.portfolio') }}</h3>
      </div>

      <ol class="timeline-list">
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">{{ $t('resume.ntutPeriod.title') }}</h4>
          <span>{{ $t('resume.ntutPeriod.desc') }}</span>
          <div class="timeline-text">
            <strong>{{ $t('resume.projects.vfs.title') }}</strong>
            <ul>
              <li>
                <a href="https://github.com/fushun891214/Advance_C_Final_Project" target="_blank" rel="noopener noreferrer">
                  {{ $t('common.githubRepo') }}
                </a>
              </li>
              <li>{{ $t('resume.projects.vfs.desc') }}</li>
              <li>{{ $t('resume.projects.vfs.arch') }}</li>
              <li v-html="$t('resume.projects.vfs.core')"></li>
              <li v-html="$t('resume.projects.vfs.cmd')"></li>
              <li v-html="$t('resume.projects.vfs.editor')"></li>
              <li>{{ $t('resume.projects.vfs.summary') }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <div class="timeline-text">
            <strong>{{ $t('resume.projects.payoffbar.title') }}</strong>
            <strong>
              <a href="https://youtu.be/O5BIyIPJP1Q?si=yKiBYVI9u3izC_13">{{ $t('common.demoVideo') }}</a>
            </strong>
            <ul>
              <li>
                <a href="https://github.com/fushun891214/payOffBarServer" target="_blank" rel="noopener noreferrer">
                  {{ $t('common.githubRepo') }}
                </a>
              </li>
              <li>
                {{ $t('resume.projects.payoffbar.desc') }}
                <ul>
                  <li>{{ $t('resume.projects.payoffbar.features') }}</li>
                </ul>
                <ul>
                  <li v-html="$t('resume.projects.payoffbar.group')"></li>
                  <li v-html="$t('resume.projects.payoffbar.friend')"></li>
                  <li v-html="$t('resume.projects.payoffbar.reminder')"></li>
                  <li v-html="$t('resume.projects.payoffbar.status')"></li>
                </ul>
              </li>
              <li>{{ $t('resume.projects.payoffbar.role') }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <div class="timeline-text">
            <strong>{{ $t('resume.projects.italkutalk.title') }}</strong>
            <ul>
              <li>
                <a href="https://www.italkutalk.com/" target="_blank" rel="noopener noreferrer">
                  {{ $t('common.projectLink') }}
                </a>
              </li>
              <li>
                <a href="https://apps.apple.com/tw/app/italkutalk/id1263409577" target="_blank" rel="noopener noreferrer">
                  {{ $t('common.appStore') }}
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store/apps/details?id=lab.italkutalk&hl=zh_TW" target="_blank" rel="noopener noreferrer">
                  {{ $t('common.googlePlay') }}
                </a>
              </li>
              <li>{{ $t('resume.projects.italkutalk.desc') }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <div class="timeline-text">
            <strong>{{ $t('resume.projects.homeeasy.title') }}</strong>
            <ul>
              <li>
                <a href="https://www.homeeasy.app/" target="_blank" rel="noopener noreferrer">
                  {{ $t('common.projectLink') }}
                </a>
              </li>
              <li>
                <a href="https://apps.apple.com/us/app/家易-home-easy-裝潢施工比價平台/id6477271187" target="_blank" rel="noopener noreferrer">
                  {{ $t('common.appStore') }}
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store/apps/details?id=lab.homeeasy" target="_blank" rel="noopener noreferrer">
                  {{ $t('common.googlePlay') }}
                </a>
              </li>
              <li>{{ $t('resume.projects.homeeasy.desc') }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">{{ $t('resume.scuPeriod.title') }}</h4>
          <span>{{ $t('resume.scuPeriod.desc') }}</span>
          <div class="timeline-text">
            <strong>{{ $t('resume.projects.stock.title') }}</strong>
            <ul>
              <li>
                <a href="https://github.com/fushun891214/Stock_Crawler" target="_blank" rel="noopener noreferrer">
                  {{ $t('common.githubRepo') }}
                </a>
              </li>
              <li>{{ $t('resume.projects.stock.desc') }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <div class="timeline-text">
            <strong>{{ $t('resume.projects.travel.title') }}</strong>
            <ul>
              <li>
                <a href="https://github.com/fushun891214/Travel-Website" target="_blank" rel="noopener noreferrer">
                  {{ $t('common.githubRepo') }}
                </a>
              </li>
              <li>{{ $t('resume.projects.travel.desc') }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <div class="timeline-text">
            <strong>{{ $t('resume.projects.skin.title') }}</strong>
            <ul>
              <li>
                <a href="https://github.com/fushun891214/Skin_Identification_" target="_blank" rel="noopener noreferrer">
                  {{ $t('common.githubRepo') }}
                </a>
              </li>
              <li>{{ $t('resume.projects.skin.desc') }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </section>
  </article>
</template>
