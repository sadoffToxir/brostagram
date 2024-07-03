interface SnackBar {
  show?: boolean
  text?: string | string[]
  color?: string
  icon?: string
  timeout?: number
}

const timeout = 4000
let cancelTimeout: ReturnType<typeof setTimeout>

export default defineStore('snackbar', () => {
	const state = ref<SnackBar>({
		show: false,
		text: 'Action completed',
		color: 'success',
		icon: 'mdi-check',
		timeout
	})

	const snackbar = computed(() => state.value)

	function setSnackbar (data: SnackBar) {
		clearTimeout(cancelTimeout)

		Object.assign(state.value, {
			...data,
			// the following fixes EUADS-4169 - see also: https://vuetifyjs.com/en/api/v-snackbar/#props-timeout
			timeout: state.value.show && state.value.timeout === timeout ? state.value.timeout + 1 : timeout
		})

		cancelTimeout = setTimeout(() => {
			setSnackbar({ show: false })
		}, state.value.timeout)
	}

	function setSnackbarSaved (data: SnackBar = {}) {
		setSnackbar({ show: true, text: 'Saved', color: 'success', icon: 'mdi-check', ...data })
	}

	function setSnackbarSuccess (data: SnackBar = {}) {
		setSnackbar({ show: true, color: 'success', icon: 'mdi-check', ...data })
	}

	function setSnackbarError (data: SnackBar = {}) {
		setSnackbar({ show: true, color: 'red', icon: 'mdi-alert-circle', ...data })
	}

	function setSnackbarInfo (data: SnackBar = {}) {
		setSnackbar({ show: true, color: 'orange', icon: 'mdi-information', ...data })
	}

	return {
		snackbar,
		setSnackbar,
		setSnackbarSaved,
		setSnackbarSuccess,
		setSnackbarError,
		setSnackbarInfo
	}
})
