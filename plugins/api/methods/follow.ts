const getPath = () => '/user'

async function followUser (userId: string, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/${userId}/follow`, {
		method: 'POST',
		...restParams
	})
}
async function unfollowUser (userId: string, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/${userId}/unfollow`, {
		method: 'POST',
		...restParams
	})
}
async function getFollowersList (userId: string, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/${userId}/followers`, {
		method: 'GET',

		...restParams
	})
}
async function getFollowingList (userId: string, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/${userId}/following`, {
		method: 'GET',

		...restParams
	})
}

export default {
	followUser,
	unfollowUser,
	getFollowersList,
	getFollowingList
}
