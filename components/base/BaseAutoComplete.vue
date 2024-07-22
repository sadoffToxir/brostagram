<template>
  <v-autocomplete
    hide-details="auto"
    clearable
    :variant="variant"
    :error-messages="errorMessages"
    @update:search="searchInput = $event"
  >
    <template v-if="$slots['item']" #item="{ item }">
      <slot name="item" :item="item" />
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
interface Props {
	errorMessages?: string | string[]
	variant?: 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled' | undefined
}

withDefaults(defineProps<Props>(), {
	variant: 'outlined'
})

const searchInput = ref('')
</script>
