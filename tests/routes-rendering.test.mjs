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

async function readProjectFile(relativePath) {
  return readFile(path.join(projectRoot, relativePath), 'utf8')
}

function hasPageArticle(html, pageName) {
  return new RegExp(`<article\\b[^>]*\\bdata-page="${pageName}"`, 'u').test(html)
}

test('each generated route renders only its own page article and exposes route links', async () => {
  await generateStaticSite()

  const routes = [
    ['index.html', 'about', '張富順｜AI工程師・全端開發'],
    ['resume/index.html', 'resume', '張富順履歷｜AI工程師・全端開發'],
    ['transcripts/index.html', 'portfolio', '張富順學業成績｜AI工程師・全端開發'],
    ['cv/index.html', 'cv', '張富順簡歷｜AI工程師・全端開發'],
  ]

  for (const [file, expectedPage, expectedTitle] of routes) {
    const html = await readGeneratedRoute(file)
    assert.ok(html.includes(`<title>${expectedTitle}</title>`))
    for (const pageName of ['about', 'resume', 'portfolio', 'cv']) {
      assert.equal(hasPageArticle(html, pageName), pageName === expectedPage)
    }
    for (const href of ['/', '/resume', '/transcripts', '/cv']) {
      assert.match(html, new RegExp(`<a[^>]+href="${href}"`, 'u'))
    }
  }
})

test('navbar uses the transcripts translation key for the transcripts route', async () => {
  const [zh, en, navbar] = await Promise.all([
    readProjectFile('i18n/locales/zh.json').then(JSON.parse),
    readProjectFile('i18n/locales/en.json').then(JSON.parse),
    readProjectFile('app/components/AppNavbar.vue'),
  ])

  assert.equal(zh.nav.transcripts, '成績')
  assert.equal(en.nav.transcripts, 'Transcripts')
  assert.match(navbar, /\{ key: 'transcripts', to: '\/transcripts' \}/)
})
