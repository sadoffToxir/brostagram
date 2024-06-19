import { Cookie } from '@/types/Cookie'
import { getBaxterAuthCookies } from '@/plugins/auth/helper'

type FetchRequest = string | Request | Ref<string | Request> | (() => string) | Request
type FetchOptions = any // improve type

export const useApi = <T>(url: FetchRequest, opts?: FetchOptions) => {
  const { apiBase, environment } = useRuntimeConfig().public

  const { BAXTER_AUTH_ACCESS_COOKIE, BAXTER_AUTH_ID_COOKIE } = getBaxterAuthCookies(environment)

  return useFetch<T>(url, {
    baseURL: apiBase,
    headers: {
      Authorization: `Bearer ${useCookie<Cookie>(BAXTER_AUTH_ACCESS_COOKIE).value?.token}`,
      Identity: useCookie<Cookie>(BAXTER_AUTH_ID_COOKIE).value?.token
    },
    ...opts
  })
}
