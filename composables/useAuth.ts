import { AUTH_ACCESS_COOKIE, AUTH_REFRESH_COOKIE } from '~/config/const'
import type { Cookie, AuthLoginResponse } from '~/types/Cookie'

export const useAuth = () => {
	const interval = ref<ReturnType<typeof setInterval> | null>(null)

	const handleLogin = (data: AuthLoginResponse, remember: boolean = false) => {
		const refreshToken = useCookie<Cookie>(AUTH_REFRESH_COOKIE).value || data.refreshToken

		if (data.accessToken && refreshToken) {
			const { setUserId } = useUser()

			useCookie<Cookie>(AUTH_ACCESS_COOKIE).value = {
				token: data.accessToken,
				expiryDate: new Date(data.accessTokenExpiresIn)
			}

			setUserId(data.userId)

			if (remember) {
				useCookie<Cookie>(AUTH_REFRESH_COOKIE).value = {
					token: data.refreshToken,
					expiryDate: new Date(data.refreshTokenExpiresIn)
				}
			}

			navigateTo('/account')
		}
	}

	const handleLogout = () => {
		useCookie<Cookie | null>(AUTH_ACCESS_COOKIE).value = null
		useCookie<Cookie | null>(AUTH_REFRESH_COOKIE).value = null

		navigateTo('/authentication')
	}

	const handleRefreshToken = async () => {
		const { $api } = useNuxtApp()

		const accessCookie = useCookie<Cookie>(AUTH_ACCESS_COOKIE)
		const refreshCookie = useCookie<Cookie>(AUTH_REFRESH_COOKIE)

		if (!accessCookie.value) {
			if (refreshCookie.value) {
				const response = await $api.getAccessToken(refreshCookie.value.token)

				if (response) {
					handleLogin(response, false)
				}
			} else {
				handleLogout()
			}
		}
	}

	const onInterval = () => {
		const intervalTime = 1000 * 60 * 30 // 5 minutes

		handleRefreshToken()

		interval.value = setInterval(async () => {
			await handleRefreshToken()
		}, intervalTime)
	}

	const removeInterval = () => {
		if (interval.value) {
			clearInterval(interval.value)
		}
	}

	return {
		handleLogin,
		handleLogout,
		onInterval,
		removeInterval
	}
}
