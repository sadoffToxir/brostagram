<template>
  <div />
</template>

<script setup>
const { handleLogout } = useAuth()

onBeforeMount(() => {
	handleLogout()
})
</script>
