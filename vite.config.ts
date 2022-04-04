import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const pathSrc = path.resolve(__dirname, 'src')

export default ({ mode }) => {
  const __DEV__ = mode === 'development'

  return defineConfig({
    base: __DEV__ ? '/' : './',
    define: {
      'process.platform': null,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: path.resolve(`${pathSrc}/types/dts`, 'components.d.ts'),
      }),
    ],
    server: {
      open: true,
      port: 2022,
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1024,
      sourcemap: false,
    },
  })
}
