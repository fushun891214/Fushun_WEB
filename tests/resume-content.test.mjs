import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function readProjectFile(relativePath) {
  return readFile(path.join(projectRoot, relativePath), 'utf8')
}

test('localized resume data includes the current job and education format', async () => {
  const [zh, en] = await Promise.all([
    readProjectFile('i18n/locales/zh.json').then(JSON.parse),
    readProjectFile('i18n/locales/en.json').then(JSON.parse),
  ])

  assert.equal(zh.resume.work, '工作')
  assert.deepEqual(zh.resume.job, {
    title: '和碩聯合科技-AI工程師',
    role: 'AI工程師',
    company: '和碩聯合科技',
    period: '2026/09 — 至今',
  })
  assert.match(zh.resume.ntut, /-/)
  assert.match(zh.resume.scu, /-/)

  assert.equal(en.resume.work, 'Work')
  assert.deepEqual(en.resume.job, {
    title: 'Pegatron Corporation - AI Engineer',
    role: 'AI Engineer',
    company: 'Pegatron Corporation',
    period: '2026/09 — Present',
  })
  assert.match(en.resume.ntut, / - /)
  assert.match(en.resume.scu, / - /)
})

test('localized sidebar data includes both professional tags', async () => {
  const [zh, en] = await Promise.all([
    readProjectFile('i18n/locales/zh.json').then(JSON.parse),
    readProjectFile('i18n/locales/en.json').then(JSON.parse),
  ])

  assert.equal(zh.sidebar.title, '全端工程師')
  assert.equal(zh.sidebar.aiTitle, 'AI工程師')
  assert.equal(en.sidebar.title, 'Full Stack Developer')
  assert.equal(en.sidebar.aiTitle, 'AI Engineer')

  const sidebarSource = await readProjectFile('app/components/AppSidebar.vue')
  assert.match(sidebarSource, /\$t\('sidebar\.title'\)/)
  assert.match(sidebarSource, /\$t\('sidebar\.aiTitle'\)/)
})

test('resume renders work before education with local decorative assets', async () => {
  const source = await readProjectFile('app/components/PageResume.vue')

  assert.ok(source.indexOf("$t('resume.work')") < source.indexOf("$t('resume.education')"))
  assert.match(source, /src="\/images\/company-logos\/pegatron-logo\.jpg"/)
  assert.match(source, /<ion-icon name="briefcase-outline" aria-hidden="true"><\/ion-icon>/)
  assert.match(source, /<img\s+src="\/images\/company-logos\/pegatron-logo\.jpg"\s+alt=""/s)
})

test('resume presents a concise RAG publication after work with both purchase options', async () => {
  const [zh, en, source] = await Promise.all([
    readProjectFile('i18n/locales/zh.json').then(JSON.parse),
    readProjectFile('i18n/locales/en.json').then(JSON.parse),
    readProjectFile('app/components/PageResume.vue'),
  ])

  assert.deepEqual(zh.resume.publications, {
    title: '著作',
    ragBook: {
      title: '輕鬆學會 RAG 實作開發：在 NVIDIA 微服務打造零幻覺的 LLM 與生成式 AI',
      authors: '黃士嘉、張富順',
      publisher: '博碩文化',
      publishedAt: '2026 年 10 月',
      description: {
        overview: '在生成式AI的浪潮下，檢索增強生成（Retrieval-Augmented Generation，RAG）已成為大型語言模型（LLM）的關鍵技術。由於LLM受限於訓練資料的時效性與涵蓋範圍，面對即時議題時容易引用過時知識，而在處理企業內部問題時，也常因缺乏私有數據而產生幻覺現象（Hallucination），為了改善上述問題，RAG技術應運而生，透過在生成答案前先從外部資料庫檢索相關資料，並提供給LLM作為回答依據，成為目前業界最主流的解決方案。',
      },
      coverAlt: '《輕鬆學會 RAG 實作開發》書封',
      stores: {
        books: '博客來購買',
        tenlong: '天瓏書局購買',
      },
    },
  })
  assert.equal(en.resume.publications.title, 'Publications')
  assert.equal(en.resume.publications.ragBook.stores.books, 'Buy on Books.com.tw')
  assert.equal(en.resume.publications.ragBook.stores.tenlong, 'Buy at Tenlong Bookstore')
  assert.equal(en.resume.publications.ragBook.description.chapters, undefined)

  const workIndex = source.indexOf("$t('resume.work')")
  const publicationsIndex = source.indexOf("$t('resume.publications.title')")
  const educationIndex = source.indexOf("$t('resume.education')")

  assert.ok(workIndex < publicationsIndex)
  assert.ok(publicationsIndex < educationIndex)
  assert.match(source, /<li class="timeline-item publication-entry">/)
  assert.doesNotMatch(source, /publication-card/)
  assert.match(source, /src="\/images\/book-covers\/rag-implementation-book-cover\.jpg"/)
  assert.match(source, /href="https:\/\/www\.books\.com\.tw\/products\/0011063512\?sloc=main"/)
  assert.match(source, /href="https:\/\/www\.tenlong\.com\.tw\/products\/9786264146333\?list_name=b-r7-zh_tw"/)
  assert.match(source, /target="_blank" rel="noopener noreferrer"/)
  assert.match(source, /\$t\('resume\.publications\.ragBook\.description\.overview'\)/)
  assert.doesNotMatch(source, /resume\.publications\.ragBook\.description\.chapters/)

  await access(path.join(projectRoot, 'public/images/book-covers/rag-implementation-book-cover.jpg'))
})

test('resume aligns work, publication, and education artwork in a shared media column', async () => {
  const [source, resumeCss, responsiveCss] = await Promise.all([
    readProjectFile('app/components/PageResume.vue'),
    readProjectFile('app/assets/css/resume.css'),
    readProjectFile('app/assets/css/responsive.css'),
  ])

  assert.match(source, /class="timeline-logo-frame timeline-logo-frame--pegatron"/)
  assert.match(source, /class="timeline-logo-frame timeline-logo-frame--ntut"/)
  assert.match(source, /class="timeline-logo-frame timeline-logo-frame--scu"/)
  assert.match(resumeCss, /\.timeline-logo-frame\s*\{[^}]*width:\s*72px;[^}]*height:\s*72px;/s)
  assert.match(resumeCss, /\.publication-cover\s*\{[^}]*width:\s*72px;/s)
  assert.match(resumeCss, /\.publication-cover\s*\{[^}]*justify-self:\s*start;/s)
  assert.match(
    responsiveCss,
    /\.publication-entry\s*\{[^}]*grid-template-columns:\s*72px minmax\(0,\s*1fr\);[^}]*column-gap:\s*16px;/s,
  )
})

test('publication keeps its mobile metadata below the title beside the cover', async () => {
  const [source, resumeCss, responsiveCss] = await Promise.all([
    readProjectFile('app/components/PageResume.vue'),
    readProjectFile('app/assets/css/resume.css'),
    readProjectFile('app/assets/css/responsive.css'),
  ])

  assert.match(
    source,
    /<figure class="publication-cover">[\s\S]*?<\/figure>\s*<h4 class="h4 publication-title">/s,
  )
  assert.doesNotMatch(source, /class="publication-content"/)
  assert.match(
    resumeCss,
    /grid-template-areas:\s*"cover title"\s*"cover meta"\s*"description description"\s*"links links";/s,
  )
  assert.match(
    responsiveCss,
    /grid-template-areas:\s*"cover title"\s*"cover meta"\s*"cover description"\s*"cover links";/s,
  )
})
