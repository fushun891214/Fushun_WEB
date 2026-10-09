import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
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
