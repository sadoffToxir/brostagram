<template>
  <v-snackbar
    :model-value="snackbarStore.snackbar.show"
    right
    :color="snackbarStore.snackbar.color"
    position="sticky"
    location="bottom right"
    :timeout="snackbarStore.snackbar.timeout"
    :data-test="componentName"
  >
    <div
      class="d-flex align-center"
      style="cursor: pointer;"
    >
      <v-icon class="pl-3 mr-5" size="18" :data-test="`${componentName}-icon`">
        {{ snackbarStore.snackbar.icon }}
      </v-icon>
      <div v-if="Array.isArray(snackbarStore.snackbar.text)">
        <ul class="px-4">
          <li v-for="text in snackbarStore.snackbar.text" :key="text">
            {{ text }}
          </li>
        </ul>
      </div>
      <div v-else>
        {{ snackbarStore.snackbar.text }}
      </div>
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
const componentName = getCurrentInstance()?.type.__name
const snackbarStore = useSnackbar()
</script>
