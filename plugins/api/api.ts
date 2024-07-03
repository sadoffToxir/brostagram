import methods from './methods'

declare module '#app' {
	interface NuxtApp {
		$api: any
	}
}

export default defineNuxtPlugin((nuxtApp) => {
	// use as const { $api } = useNuxtApp()
	nuxtApp.provide('api', methods)
})
