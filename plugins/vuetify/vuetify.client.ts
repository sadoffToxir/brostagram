import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import config from './config'

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify(config)

	nuxtApp.vueApp.use(vuetify)
})
