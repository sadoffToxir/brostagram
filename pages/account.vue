<template>
  Profile
</template>

<script lang="ts" setup>

const { $api } = useNuxtApp()
const { userId } = useUser()

onBeforeMount(async () => {
	const profile = await $api.getProfile(userId.value)

	console.log(profile)
})
</script>
