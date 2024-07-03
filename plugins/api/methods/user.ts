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

export default {
	signUp,
	signIn
}
