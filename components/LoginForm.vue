<template>
  <div class="loginForm">
    <BaseInput
      v-model="loginForm.email"
      label="Email"
      :error-messages="errors?.email"
      type="email"
    />
    <BaseInput
      v-model="
        loginForm.password"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      :error-messages="errors?.password"
      :append-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
      @click:append="showPassword = !showPassword"
    />
    <v-checkbox
      v-model="loginForm.remember"
      label="Remember me"
    />
    <BaseButton @click="handleSubmit">
      Login
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const { isError, handleInputError, handleErrorSnackbar } = useErrorHandler()
const { setSnackbarError, setSnackbarSuccess } = useSnackbar()
const { handleLogin } = useAuth()

const loginForm = ref<Record<string, string | boolean>>({
	email: '',
	password: '',
	remember: true
})

const showPassword = ref(false)

const errors = ref<Record<string, string> | null>(null)

const handleSubmit = async () => {
	errors.value = null
	const { remember, ...loginData } = loginForm.value
	const response = await $api.signIn(loginData)

	if (isError(response)) {
		errors.value = handleInputError(response)
		setSnackbarError({ text: handleErrorSnackbar(response) })
	} else {
		handleLogin(response, remember as boolean)
		setSnackbarSuccess({ text: response.message })
	}
}
</script>

<style lang="scss" scoped>
.loginForm {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
