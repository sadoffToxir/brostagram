<template>
  <v-btn
    :color="color"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
interface Props {
  color?: string
}

withDefaults(defineProps<Props>(), {
	color: 'primary'
})
</script>
