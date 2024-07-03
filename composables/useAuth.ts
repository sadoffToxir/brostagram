import { AUTH_ACCESS_COOKIE, AUTH_REFRESH_COOKIE } from '~/config/const'
import type { Cookie, AuthLoginResponse } from '~/types/Cookie'

export const useAuth = () => {
	const handleLogin = (data: AuthLoginResponse) => {
		if (data.accessToken && data.refreshToken) {
			useCookie<Cookie>(AUTH_ACCESS_COOKIE).value = {
				token: data.accessToken,
				expiryDate: new Date(data.accessTokenExpiresIn)
			}
			useCookie<Cookie>(AUTH_REFRESH_COOKIE).value = {
				token: data.refreshToken,
				expiryDate: new Date(data.refreshTokenExpiresIn)
			}

			navigateTo('/account')
		}
	}

	const handleLogout = () => {
		useCookie<Cookie | null>(AUTH_ACCESS_COOKIE).value = null
		useCookie<Cookie | null>(AUTH_REFRESH_COOKIE).value = null

		navigateTo('/authentication')
	}

	return {
		handleLogin,
		handleLogout
	}
}
