const getPath = () => '/posts'

async function likePost (postId: string, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/${postId}/like`, {
		method: 'POST',
		...restParams
	})
}

async function unlikePost (postId: string, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/${postId}/unlike`, {
		method: 'DELETE',
		...restParams
	})
}

async function commentPost (postId: string, comment: string, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/${postId}/comment`, {
		method: 'POST',
		body: {
			comment
		},
		...restParams
	})
}

export default {
	likePost,
	unlikePost,
	commentPost
}
