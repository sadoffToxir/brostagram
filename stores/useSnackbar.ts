interface SnackBar {
  show?: boolean
  text?: string
  color?: string
  icon?: string
}

export default defineStore('snackbar', () => {
  const state = ref<SnackBar>({
    show: false,
    text: 'Action completed',
    color: 'success',
    icon: 'mdi-check'
  })

  const snackbar = computed(() => state.value)

  function setSnackbar (data: SnackBar) {
    Object.assign(state.value, data)
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
