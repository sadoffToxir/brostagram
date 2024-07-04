<template>
  <NuxtLayout name="default">
    <v-app>
      <CoreAdBlockDetector />
      <CoreOfflineDetector />
      <CoreAppBar />
      <v-main>
        <v-container fluid class="mt-4">
          <NuxtPage />
        </v-container>
      </v-main>
      <CoreSnackbar />
      <CoreLoader />
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
	titleTemplate: (titleChunk) => {
		if (!titleChunk) {
			return 'Brostagram'
		}

		const env = useRuntimeConfig().public.environment

		if (env === 'production') {
			return titleChunk
		}

		return `${titleChunk} - ${env[0].toUpperCase() + env.slice(1)}`
	}
})
const { onInterval, removeInterval } = useAuth()

onBeforeMount(() => {
	onInterval()
})

onUnmounted(() => {
	removeInterval()
})
</script>
