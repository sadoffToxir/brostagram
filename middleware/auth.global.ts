import { AUTH_ACCESS_COOKIE } from '~/config/const'
import type { Cookie } from '~/types/Cookie'

export default defineNuxtRouteMiddleware((context) => {
	const accessCookie = useCookie<Cookie>(AUTH_ACCESS_COOKIE)

	if (!accessCookie.value && context.path !== '/' && context.path !== '/authentication') {
		window.location.href = '/authentication'
	}
})
