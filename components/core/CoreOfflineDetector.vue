<template>
  <BaseAlert
    v-if="!isOnline"
    :data-test="componentTag"
    title="No network connection detected!"
    text="It seems like you are offline. Please check your internet connection."
    type="warning"
    icon="mdi-cloud-alert"
    closable
  />
</template>

<script setup lang="ts">
const componentTag = 'CoreOfflineAlert'

const { isOnline } = useNetwork()
</script>
