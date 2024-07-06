import { load } from 'exifreader'

interface Exif {
  load: Function
}

declare module '#app' {
  interface NuxtApp {
    $exif: Exif
  }
}

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide('exif', { load })
})
