# Route-Based Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render About, Resume, Transcripts, and CV through individual Nuxt routes so refreshes cannot paint an inactive page and each section has an indexable URL.

**Architecture:** A default Nuxt layout will own the sidebar, navigation, and main-content shell. Each route page will SSR exactly one existing page-content component, while the navbar uses `NuxtLink` and route state instead of `activePage` events. Localized metadata will be supplied per route.

**Tech Stack:** Nuxt 4, Vue 3, `@nuxtjs/i18n`, Node test runner.

**Spec:** `docs/superpowers/specs/2026-10-11-route-based-pages-design.md`

## Global Constraints

- Keep the current component content and visual styling; do not rewrite `PageAbout.vue`, `PageResume.vue`, `PagePortfolio.vue`, or `PageCv.vue`.
- Use exactly `/`, `/resume`, `/transcripts`, and `/cv` as public route paths.
- Keep the existing no-prefix locale strategy.
- The initial server-rendered page must not animate from transparent.
- Preserve the user's unrelated `.claude/settings.local.json` and `.vscode/` changes.

## Review Focus

- Direct loading or refreshing `/resume`, `/transcripts`, and `/cv` must not render any other `data-page` article.
- The static homepage must not contain Resume project text, including iTalkuTalk or HomeEasy.
- Route navigation must produce crawlable `<a href>` links rather than JavaScript-only buttons.
- The active navbar item must be correct for `/`, including the exact-root path.
- Both Chinese and English locale files must have every metadata key used by the new route pages.

---

### Task 1: Replace the single-page visibility test with route-output coverage

**Files:**
- Delete: `tests/page-visibility.test.mjs`
- Create: `tests/routes-rendering.test.mjs`

**Interfaces:**
- Consumes: generated static route files under `.output/public/`.
- Produces: regression coverage that defines the SSR boundary for every public route.

- [ ] **Step 1: Write the failing route-output test**

Create `tests/routes-rendering.test.mjs` with this test structure:

```js
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const execFileAsync = promisify(execFile)

async function generateStaticSite() {
  await execFileAsync('npm', ['run', 'generate'], {
    cwd: projectRoot,
    maxBuffer: 10 * 1024 * 1024,
  })
}

async function readGeneratedRoute(relativePath) {
  return readFile(path.join(projectRoot, '.output/public', relativePath), 'utf8')
}

function hasPageArticle(html, pageName) {
  return new RegExp(`<article\\b[^>]*\\bdata-page="${pageName}"`, 'u').test(html)
}

test('each generated route renders only its own page article and exposes route links', async () => {
  await generateStaticSite()

  const routes = [
    ['index.html', 'about'],
    ['resume/index.html', 'resume'],
    ['transcripts/index.html', 'portfolio'],
    ['cv/index.html', 'cv'],
  ]

  for (const [file, expectedPage] of routes) {
    const html = await readGeneratedRoute(file)
    for (const pageName of ['about', 'resume', 'portfolio', 'cv']) {
      assert.equal(hasPageArticle(html, pageName), pageName === expectedPage)
    }
    for (const href of ['/', '/resume', '/transcripts', '/cv']) {
      assert.match(html, new RegExp(`<a[^>]+href="${href}"`, 'u'))
    }
  }
})
```

- [ ] **Step 2: Run the isolated test to verify it fails**

Run: `node --test tests/routes-rendering.test.mjs`

Expected: FAIL because only `index.html` exists and it currently contains all four page articles.

- [ ] **Step 3: Remove the superseded visibility test**

Delete `tests/page-visibility.test.mjs`; it asserts the old architecture in which every page was present in homepage HTML.

- [ ] **Step 4: Commit the test boundary**

```bash
git add tests/routes-rendering.test.mjs tests/page-visibility.test.mjs
git commit -m "test: define SSR boundaries for portfolio routes"
```

### Task 2: Build the route shell and render one content component per route

**Files:**
- Modify: `app/app.vue`
- Create: `app/layouts/default.vue`
- Modify: `app/pages/index.vue`
- Create: `app/pages/resume.vue`
- Create: `app/pages/transcripts.vue`
- Create: `app/pages/cv.vue`
- Modify: `i18n/locales/zh.json`
- Modify: `i18n/locales/en.json`

**Interfaces:**
- Consumes: existing `PageAbout`, `PageResume`, `PagePortfolio`, `PageCv`, and i18n locale access through `useI18n()`.
- Produces: one SSR page article per route and localized route-level title/description metadata.

- [ ] **Step 1: Add per-route localized SEO strings**

Restructure the existing `seo` object in both locale files as `home`, `resume`, `transcripts`, and `cv`. Preserve the existing title and description as `seo.home`.

Add these Chinese values:

```json
"resume": {
  "title": "張富順履歷｜AI工程師・全端開發",
  "description": "張富順的工作經歷、RAG 著作與 iTalkuTalk、HomeEasy 專案開發經驗。"
},
"transcripts": {
  "title": "張富順學業成績｜AI工程師・全端開發",
  "description": "張富順的東吳大學與臺北科技大學學業成績紀錄。"
},
"cv": {
  "title": "張富順簡歷｜AI工程師・全端開發",
  "description": "張富順的個人簡歷與專業經歷摘要。"
}
```

Add equivalent English strings under the same keys.

- [ ] **Step 2: Move the global language attribute to `app/app.vue`**

Replace the current template-only `app/app.vue` with:

```vue
<script setup>
const { locale } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value === 'zh' ? 'zh-TW' : 'en-US' },
}))
</script>

<template>
  <NuxtPage />
</template>
```

- [ ] **Step 3: Add the shared default layout**

Create `app/layouts/default.vue`:

```vue
<template>
  <main>
    <AppSidebar />

    <div class="main-content">
      <AppNavbar />
      <slot />
    </div>
  </main>
</template>
```

- [ ] **Step 4: Convert the homepage to About-only SSR**

Replace `app/pages/index.vue` with page-level metadata and `PageAbout` only:

```vue
<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  ogTitle: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogDescription: () => t('seo.home.description'),
  ogImage: '/images/logo.jpg',
})
</script>

<template>
  <PageAbout />
</template>
```

- [ ] **Step 5: Create the three route pages**

Create `app/pages/resume.vue`, `app/pages/transcripts.vue`, and `app/pages/cv.vue`. Each file must use the same `useSeoMeta` structure as the homepage, reference its own `seo.<page>` key, and render exactly one component:

```vue
<!-- app/pages/transcripts.vue -->
<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.transcripts.title'),
  ogTitle: () => t('seo.transcripts.title'),
  description: () => t('seo.transcripts.description'),
  ogDescription: () => t('seo.transcripts.description'),
  ogImage: '/images/logo.jpg',
})
</script>

<template>
  <PagePortfolio />
</template>
```

Use `PageResume` with `seo.resume` in `resume.vue`, and `PageCv` with `seo.cv` in `cv.vue`.

- [ ] **Step 6: Run the route-output test to verify the expected partial pass**

Run: `node --test tests/routes-rendering.test.mjs`

Expected: page-isolation assertions pass; navigation-link assertions still fail until Task 3 replaces the buttons.

### Task 3: Make navigation route-aware and move animation to page transitions

**Files:**
- Modify: `app/components/AppNavbar.vue`
- Modify: `app/assets/css/common.css`
- Modify: `app/pages/index.vue`
- Modify: `app/pages/resume.vue`
- Modify: `app/pages/transcripts.vue`
- Modify: `app/pages/cv.vue`

**Interfaces:**
- Consumes: public route paths from Task 2.
- Produces: crawlable route navigation and no initial opacity animation.

- [ ] **Step 1: Replace page-switching events with route links**

In `AppNavbar.vue`, remove `defineProps(['activePage'])` and `defineEmits(['changePage'])`. Add this route data:

```js
const route = useRoute()
const navigationItems = [
  { to: '/', label: 'nav.about' },
  { to: '/resume', label: 'nav.resume' },
  { to: '/transcripts', label: 'nav.portfolio' },
  { to: '/cv', label: 'nav.cv' },
]
```

Replace the four repeated page buttons with a `v-for` that renders `NuxtLink`:

```vue
<li v-for="item in navigationItems" :key="item.to" class="navbar-item">
  <NuxtLink
    :to="item.to"
    class="navbar-link"
    :class="{ active: route.path === item.to }"
  >
    <span>{{ $t(item.label) }}</span>
  </NuxtLink>
</li>
```

Keep the settings menu unchanged.

- [ ] **Step 2: Replace the generic active-article animation**

In `app/assets/css/common.css`, replace:

```css
article.active {
  animation: fade 0.5s ease backwards;
}
```

with:

```css
.page-enter-active {
  animation: fade 0.25s ease backwards;
}
```

Keep the existing `@keyframes fade` declaration.

- [ ] **Step 3: Enable the same page transition on all four routes**

At the top of each `app/pages/*.vue` route file, add:

```js
definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
})
```

Do not set `appear`; direct loads and refreshes must remain fully opaque.

- [ ] **Step 4: Run focused verification**

Run:

```bash
node --test tests/routes-rendering.test.mjs
npm run generate
```

Expected: the route-output test passes and generation completes successfully.

- [ ] **Step 5: Perform browser verification**

At a desktop viewport, verify:

1. Direct loading and repeated refreshes of `/` never show Resume text.
2. Direct loading `/resume`, `/transcripts`, and `/cv` renders the matching page.
3. Navbar selection matches the current route.
4. Browser back/forward follows route history.
5. Switching language retains the current route and updates its title/description.

- [ ] **Step 6: Run the full regression suite and record baseline failures separately**

Run: `npm test`

Expected: route and locale tests pass. If the three existing Resume presentation tests still fail due to their stale expectations, report them as pre-existing and do not modify unrelated Resume content in this change.

- [ ] **Step 7: Commit the implementation**

```bash
git add app/app.vue app/layouts/default.vue app/pages app/components/AppNavbar.vue app/assets/css/common.css i18n/locales tests
git commit -m "feat: serve portfolio sections from Nuxt routes"
```

## Plan Self-Review

- Spec coverage: all required routes, SSR isolation, shared UI, localized metadata, initial-animation removal, and verification have mapped tasks.
- Placeholder scan: no TBD or deferred implementation steps remain.
- Interface consistency: route paths are consistently `/`, `/resume`, `/transcripts`, and `/cv`; `PagePortfolio` remains the transcript component.
- Review focus coverage: Task 1 tests SSR isolation and links; Task 3 tests direct route loads, refreshes, active state, history, and locale retention.
