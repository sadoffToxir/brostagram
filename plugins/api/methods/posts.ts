const getPath = () => '/posts'

async function getFollowingPosts (...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/following`, {
		method: 'GET',
		...restParams
	})
}
async function getUserPosts (id: string, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/user/${id}`, {
		method: 'GET',
		...restParams
	})
}
async function getPostById (id: string, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/${id}`, {
		method: 'GET',
		...restParams
	})
}

async function createPost (data: object, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(getPath(), {
		method: 'POST',
		body: JSON.stringify(data),
		...restParams
	})
}

export default {
	getFollowingPosts,
	getUserPosts,
	getPostById,
	createPost
}
