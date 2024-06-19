<template>
  <div />
</template>

<script setup>
import { DOMAIN } from '~~/plugins/auth/constants'

onBeforeMount(() => {
  window.location.href = getAppUrl('portal', DOMAIN, '3100', true) + '/logout'
})
</script>
