import type { Cookie } from '~/types/Cookie'
import { AUTH_ACCESS_COOKIE } from '~/config/const'

type FetchOptions = any // improve type

export const useApi = async (url: string, options?: FetchOptions) => {
	const { handleLogout } = useAuth()
	const { apiUrl } = useRuntimeConfig().public
	const { headers, ...opts } = options

	const apiHeaders = {
		...opts.headers,
		Authorization: `Bearer ${useCookie<Cookie>(AUTH_ACCESS_COOKIE).value?.token}`
	}

	try {
		return await $fetch(url, {
			baseURL: apiUrl,
			headers: apiHeaders,
			server: !!opts.server,
			...opts
		})
	} catch (error: any) {
		if (error.response) {
			if (error.response.status === 401) {
				handleLogout()
			}

			return error.response._data
		}

		return error
	}
}
