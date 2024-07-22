interface Loader {
  loader: boolean
}

export default defineStore('loader', () => {
	const state = ref<Loader>({
		loader: false
	})

	const isLoading = computed(() => state.value.loader)

	function setLoader (value: boolean) {
		state.value.loader = value
	}

	return {
		isLoading,
		setLoader
	}
})
