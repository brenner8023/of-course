import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'chrome/scripts/background.ts',
    'chrome/scripts/content.ts',
    'chrome/scripts/inject-page.ts',
  ],
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: 'dist/scripts',
})
