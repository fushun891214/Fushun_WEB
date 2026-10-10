<template>
  <article class="resume" data-page="resume">
    <header>
      <h2 class="h2 article-title">{{ $t("resume.title") }}</h2>
    </header>

    <section class="timeline">
      <div class="title-wrapper">
        <div class="icon-box">
          <ion-icon name="briefcase-outline" aria-hidden="true"></ion-icon>
        </div>
        <h3 class="h3">{{ $t("resume.work") }}</h3>
      </div>

      <ol class="timeline-list">
        <li class="timeline-item timeline-item-with-logo">
          <div class="timeline-logo-frame timeline-logo-frame--pegatron">
            <img
              src="/images/company-logos/pegatron-logo.jpg"
              alt=""
              class="timeline-logo"
              loading="lazy"
            />
          </div>
          <div class="timeline-content">
            <h4 class="h4 timeline-item-title">{{ $t("resume.job.title") }}</h4>
            <span>{{ $t("resume.job.period") }}</span>
          </div>
        </li>
      </ol>
    </section>

    <section class="timeline publication-section">
      <div class="title-wrapper">
        <div class="icon-box">
          <ion-icon name="library-outline" aria-hidden="true"></ion-icon>
        </div>
        <h3 class="h3">{{ $t("resume.publications.title") }}</h3>
      </div>

      <ol class="timeline-list">
        <li class="timeline-item publication-entry">
          <figure class="publication-cover">
            <img
              src="/images/book-covers/rag-implementation-book-cover.jpg"
              :alt="$t('resume.publications.ragBook.coverAlt')"
              loading="lazy"
            />
          </figure>

          <h4 class="h4 publication-title">
            {{ $t("resume.publications.ragBook.title") }}
          </h4>
          <p class="publication-meta">
            <span>{{ $t("resume.publications.ragBook.authors") }}</span>
            <span aria-hidden="true">｜</span>
            <span>{{ $t("resume.publications.ragBook.publisher") }}</span>
            <span aria-hidden="true">｜</span>
            <time datetime="2026-10">{{
              $t("resume.publications.ragBook.publishedAt")
            }}</time>
          </p>
          <div class="publication-description">
            <p>{{ $t("resume.publications.ragBook.description.overview") }}</p>
          </div>

          <div class="publication-links">
            <a
              class="publication-link"
              href="https://www.eslite.com/product/10012011762683231759008?attr=xgHwxQoMCP-mqtYGEMz9lPUCEAEaJDZhZDJhMmY3LTAwMDAtMjc5ZS1hMzhiLTEwZDlhMjJiNGEyMypAMTkxNTE0OTE0MmIxNGM1ZWM5YzgzYjA4OTkxYjk4MzI5NTA2MjhlMDcwNzVjM2JhNDMyMDg3OWZhMzkwYWQ4NzIwqOWqLY6-nRXsz504wvCeFcmW8DCb1rctiN-pONLu7TjUsp0Vx5bwMJjWty2Q97IwOg5kZWZhdWx0X3NlYXJjaEABSAFYAWgBegJ0cA"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ $t("resume.publications.ragBook.stores.eslite") }}
              <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
            </a>
            <a
              class="publication-link"
              href="https://www.books.com.tw/products/0011063512?sloc=main"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ $t("resume.publications.ragBook.stores.books") }}
              <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
            </a>
            <a
              class="publication-link"
              href="https://www.tenlong.com.tw/products/9786264146333?list_name=b-r7-zh_tw"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ $t("resume.publications.ragBook.stores.tenlong") }}
              <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
            </a>
          </div>
        </li>
      </ol>
    </section>

    <section class="timeline">
      <div class="title-wrapper">
        <div class="icon-box">
          <ion-icon name="book-outline" aria-hidden="true"></ion-icon>
        </div>
        <h3 class="h3">{{ $t("resume.education") }}</h3>
      </div>

      <ol class="timeline-list">
        <li class="timeline-item timeline-item-with-logo">
          <div class="timeline-logo-frame timeline-logo-frame--ntut">
            <img
              src="/images/school-logos/ntut-logo.png"
              alt=""
              class="timeline-logo"
            />
          </div>
          <div class="timeline-content">
            <h4 class="h4 timeline-item-title">{{ $t("resume.ntut") }}</h4>
            <span>{{ $t("resume.ntutYear") }}</span>
          </div>
        </li>
        <li class="timeline-item timeline-item-with-logo">
          <div class="timeline-logo-frame timeline-logo-frame--scu">
            <img
              src="/images/school-logos/scu-logo.gif"
              alt=""
              class="timeline-logo"
            />
          </div>
          <div class="timeline-content">
            <h4 class="h4 timeline-item-title">{{ $t("resume.scu") }}</h4>
            <span>{{ $t("resume.scuYear") }}</span>
          </div>
        </li>
      </ol>
    </section>

    <section class="timeline">
      <div class="title-wrapper">
        <div class="icon-box">
          <ion-icon name="book-outline" aria-hidden="true"></ion-icon>
        </div>
        <h3 class="h3">{{ $t("resume.portfolio") }}</h3>
      </div>

      <ol class="timeline-list">
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">
            {{ $t("resume.ntutPeriod.title") }}
          </h4>
          <span>{{ $t("resume.ntutPeriod.desc") }}</span>
          <div class="timeline-text">
            <strong>{{ $t("resume.projects.vfs.title") }}</strong>
            <ul>
              <li>
                <a
                  href="https://github.com/fushun891214/Advance_C_Final_Project"
                  class="publication-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ $t("common.githubRepo") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
              <li>{{ $t("resume.projects.vfs.desc") }}</li>
              <li>{{ $t("resume.projects.vfs.arch") }}</li>
              <li v-html="$t('resume.projects.vfs.core')"></li>
              <li v-html="$t('resume.projects.vfs.cmd')"></li>
              <li v-html="$t('resume.projects.vfs.editor')"></li>
              <li>{{ $t("resume.projects.vfs.summary") }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <div class="timeline-text">
            <strong>{{ $t("resume.projects.payoffbar.title") }}</strong>
            <strong>
              <li>
                <a
                  href="https://youtu.be/O5BIyIPJP1Q?si=yKiBYVI9u3izC_13"
                  class="publication-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ $t("common.demoVideo") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
            </strong>
            <ul>
              <li>
                <a
                  href="https://github.com/fushun891214/payOffBarServer"
                  class="publication-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ $t("common.githubRepo") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
              <li>
                {{ $t("resume.projects.payoffbar.desc") }}
                <ul>
                  <li>{{ $t("resume.projects.payoffbar.features") }}</li>
                </ul>
                <ul>
                  <li v-html="$t('resume.projects.payoffbar.group')"></li>
                  <li v-html="$t('resume.projects.payoffbar.friend')"></li>
                  <li v-html="$t('resume.projects.payoffbar.reminder')"></li>
                  <li v-html="$t('resume.projects.payoffbar.status')"></li>
                </ul>
              </li>
              <li>{{ $t("resume.projects.payoffbar.role") }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <div class="timeline-text">
            <strong>{{ $t("resume.projects.italkutalk.title") }}</strong>
            <ul>
              <li>
                <a
                  href="https://www.italkutalk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="publication-link"
                >
                  {{ $t("common.projectLink") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
              <li>
                <a
                  href="https://apps.apple.com/tw/app/italkutalk/id1263409577"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="publication-link"
                >
                  {{ $t("common.appStore") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=lab.italkutalk&hl=zh_TW"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="publication-link"
                >
                  {{ $t("common.googlePlay") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
              <li>{{ $t("resume.projects.italkutalk.desc") }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <div class="timeline-text">
            <strong>{{ $t("resume.projects.homeeasy.title") }}</strong>
            <ul>
              <li>
                <a
                  href="https://www.homeeasy.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="publication-link"
                >
                  {{ $t("common.projectLink") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
              <li>
                <a
                  href="https://apps.apple.com/us/app/家易-home-easy-裝潢施工比價平台/id6477271187"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="publication-link"
                >
                  {{ $t("common.appStore") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=lab.homeeasy"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="publication-link"
                >
                  {{ $t("common.googlePlay") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
              <li>{{ $t("resume.projects.homeeasy.desc") }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">
            {{ $t("resume.scuPeriod.title") }}
          </h4>
          <span>{{ $t("resume.scuPeriod.desc") }}</span>
          <div class="timeline-text">
            <strong>{{ $t("resume.projects.stock.title") }}</strong>
            <ul>
              <li>
                <a
                  href="https://github.com/fushun891214/Stock_Crawler"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="publication-link"
                >
                  {{ $t("common.githubRepo") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
              <li>{{ $t("resume.projects.stock.desc") }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <div class="timeline-text">
            <strong>{{ $t("resume.projects.travel.title") }}</strong>
            <ul>
              <li>
                <a
                  href="https://github.com/fushun891214/Travel-Website"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="publication-link"
                >
                  {{ $t("common.githubRepo") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
              <li>{{ $t("resume.projects.travel.desc") }}</li>
            </ul>
          </div>
        </li>

        <li class="timeline-item">
          <div class="timeline-text">
            <strong>{{ $t("resume.projects.skin.title") }}</strong>
            <ul>
              <li>
                <a
                  href="https://github.com/fushun891214/Skin_Identification_"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="publication-link"
                >
                  {{ $t("common.githubRepo") }}
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                </a>
              </li>
              <li>{{ $t("resume.projects.skin.desc") }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </section>
  </article>
</template>
