<template>
  <div class="registrationForm">
    <BaseInput
      v-model="registerForm.username"
      :error-messages="errors?.username"
      label="Username"
      type="email"
    />
    <BaseInput
      v-model="registerForm.email"
      label="Email"
      :error-messages="errors?.email"
    />
    <BaseInput
      v-model="registerForm.password"
      label="Password"
      :type="showPassword.password ? 'text' : 'password'"
      :error-messages="errors?.password"
      :append-icon="showPassword.password ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
      @click:append="showPassword.password = !showPassword.password"
    />
    <BaseInput
      v-model="registerForm.confirmPassword"
      label="Confirm Password"
      :error-messages="errors?.confirmPassword"
      :type="showPassword.confirmPassword ? 'text' : 'password'"
      :append-icon="showPassword.confirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
      @click:append="showPassword.confirmPassword = !showPassword.confirmPassword"
    />
    <BaseButton @click="handleSubmit">
      Register
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const { isError, handleInputError, handleErrorSnackbar } = useErrorHandler()
const { setSnackbarError, setSnackbarSuccess } = useSnackbar()

const registerForm = ref<Record<string, string>>({
	username: '',
	email: '',
	password: '',
	confirmPassword: ''
})

const showPassword = ref({
	password: false,
	confirmPassword: false
})

const errors = ref<Record<string, string> | null>(null)

const handleSubmit = async () => {
	errors.value = null

	const response = await $api.signUp(registerForm.value)

	if (isError(response)) {
		errors.value = handleInputError(response)
		setSnackbarError({ text: handleErrorSnackbar(response) })
	} else {
		setSnackbarSuccess({ text: response.message })
	}
}
</script>

<style lang="scss" scoped>
.registrationForm {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
