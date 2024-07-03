import type { ApiError } from '~/types/ApiError'

export const useErrorHandler = () => {
	const isError = (data: ApiError) => {
		if (data.errors) {
			return true
		}

		if (data.error) {
			return true
		}

		return false
	}

	const handleInputError = (data: ApiError) => {
		if (data.errors) {
			const result: Record<string, string> = {}

			data.errors.forEach((error) => {
				result[error.path] = error.msg
			})

			return result
		}

		return {}
	}

	const handleErrorSnackbar = (data: ApiError) => {
		if (data.errors) {
			const result: string[] = []

			data.errors.forEach((error) => {
				result.push(`${error.path}: ${error.msg}`)
			})

			return result
		}

		if (data.error) {
			return data.error
		}

		return 'Some error occurred'
	}

	return {
		isError,
		handleInputError,
		handleErrorSnackbar
	}
}
