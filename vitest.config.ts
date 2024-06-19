/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true
    }),
    Components({
      dirs: ['./components']
    }),
    AutoImport({
      imports: [
        'vue',
        'vitest',
        'pinia'
      ],
      dirs: ['./composables/', './stores', './utils/'],
      dts: true
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom', // alternatively we can use jsdom
    setupFiles: [
      './tests/vueTestUtils/setup.ts',
      './tests/vueTestingLibrary/setup.ts',
      './tests/vuetify/setup.ts',
      './tests/vitest/setup.ts'
    ],
    server: {
      deps: {
        inline: ['vuetify']
      }
    },
    coverage: {
      reportsDirectory: './tests/vitest/coverage'
    },
    exclude: [...configDefaults.exclude, './tests/e2e']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './')
    }
  }
})
