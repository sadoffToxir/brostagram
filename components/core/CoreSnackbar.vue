<template>
  <v-snackbar
    :model-value="storeSnackbar.snackbar.show"
    right
    :color="storeSnackbar.snackbar.color"
    position="sticky"
    location="bottom right"
    timeout="4000"
    close-on-content-click
    :data-test="componentTag"
  >
    <div
      class="d-flex align-center"
      style="cursor: pointer;"
    >
      {{ storeSnackbar.snackbar.text }}
      <v-icon class="pl-3" size="18" :data-test="`${componentTag}-icon`">
        {{ storeSnackbar.snackbar.icon }}
      </v-icon>
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">

const componentTag = 'CoreSnackbar'
const storeSnackbar = useSnackbar()
</script>
