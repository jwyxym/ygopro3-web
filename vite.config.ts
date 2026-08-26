import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { viteSingleFile } from 'vite-plugin-singlefile'

const root = process.cwd()

function stripHtmlWhiteSpace(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\r\n?/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export default defineConfig({
  plugins: [
    viteSingleFile(),
    {
      name: 'rename-index-html-to-htm',
      apply: 'build',
      closeBundle() {
        const htmlPath = resolve(root, 'dist', 'index.html')
        if (existsSync(htmlPath)) {
          const raw = readFileSync(htmlPath, 'utf8')
          const compact = stripHtmlWhiteSpace(raw)
          writeFileSync(htmlPath, compact)
        }
      },
    },
  ],
  build: {
    outDir: 'dist',
    minify: 'oxc',
    sourcemap: false,
    rollupOptions: {
      input: resolve(root, 'index.html'),
    },
  },
})