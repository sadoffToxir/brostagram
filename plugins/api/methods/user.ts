const getPath = () => '/user'

async function signUp (form: Record<string, string>, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/register`, {
		method: 'POST',
		body: form,
		...restParams
	})
}

async function signIn (form: Record<string, string>, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/login`, {
		method: 'POST',
		body: form,
		...restParams
	})
}

async function getAccessToken (refreshToken: string, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/access-token`, {
		method: 'POST',
		body: { refreshToken },
		...restParams
	})
}

async function getProfile (userId: string = '', ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/${userId}`, {
		...restParams
	})
}

async function updateProfile (userId: string, form: Record<string, string>, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/${userId}`, {
		method: 'PUT',
		body: form,
		...restParams
	})
}

export default {
	signUp,
	signIn,
	getAccessToken,
	getProfile,
	updateProfile
}
