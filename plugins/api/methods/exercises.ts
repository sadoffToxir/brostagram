const getPath = () => '/exercises'

async function getExercises (search: string, ...restParams: Array<object>): Promise<unknown> {
	return await useApi(`${getPath()}/?name=${search}`, {
		method: 'GET',
		...restParams
	})
}

export default {
	getExercises
}
