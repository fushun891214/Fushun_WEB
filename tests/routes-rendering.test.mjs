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
