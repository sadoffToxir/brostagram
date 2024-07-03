<template>
  <div class="d-flex justify-center">
    <v-card width="400">
      <v-card-text>
        <v-tabs
          v-model="authFlowTab"
          align-tabs="center"
          grow
          class="mb-4"
        >
          <v-tab value="login">
            Login
          </v-tab>
          <v-tab value="register">
            Register
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="authFlowTab">
          <v-tabs-window-item value="login">
            <LoginForm />
          </v-tabs-window-item>
          <v-tabs-window-item value="register">
            <RegistrationForm />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { AUTH_ACCESS_COOKIE } from '~/config/const'
import type { Cookie } from '~/types/Cookie'

const authFlowTab = ref('login')

onBeforeMount(() => {
	const accessCookie = useCookie<Cookie>(AUTH_ACCESS_COOKIE)

	if (accessCookie.value) {
		navigateTo('/account')
	}
})
</script>
