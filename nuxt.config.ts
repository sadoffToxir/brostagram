import vuetify from 'vite-plugin-vuetify'
import { pinia } from './config/pinia'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  typescript: {
    strict: true,
    shim: false
  },

  css: [
    'vuetify/styles'
  ],

  vite: {
    ssr: {
      noExternal: ['vuetify']
    }
  },

  build: {
    transpile: ['vuetify']
  },

  modules: [
    'nuxt-lodash',
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@vueuse/nuxt'
  ],

  plugins: [
    '~/plugins/vuetify/vuetify.ts',
    '~/plugins/api/api.ts',
    '~/plugins/vuedatepicker.ts'
  ],

  runtimeConfig: {
    public: {
      environment: ''
    }
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Brostagram',
      meta: [
        { name: 'description', content: 'Brostagram' }
      ]
    }
  },

  imports: {
    dirs: ['stores']
  },

  pinia
})
