<template>
  <v-overlay
    :model-value="storeLoader.isLoading"
    class="align-center justify-center"
    z-index="999"
    persistent
  >
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
      :data-test="componentTag"
    />
  </v-overlay>
</template>

<script setup lang="ts">

const componentTag = 'CoreLoader'
const storeLoader = useLoader()
</script>
