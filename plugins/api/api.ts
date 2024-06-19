import methods from './methods'

export default defineNuxtPlugin((nuxtApp) => {
  // use as const { $api } = useNuxtApp()
  nuxtApp.provide('api', methods)
})
