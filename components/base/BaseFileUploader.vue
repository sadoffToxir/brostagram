<template>
  <v-file-input
    :accept="fileTypes"
    prepend-inner-icon="mdi-paperclip"
    :prepend-icon="prependIcon"
    :hide-details="hideDetails"
    persistent-hint
    show-size
    :data-test="`${componentName}`"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
interface Props {
  fileTypes?: string
  prependIcon?: string,
  hideDetails?: boolean | 'auto'
}

withDefaults(defineProps<Props>(), {
  fileTypes: '*',
  hideDetails: 'auto',
  prependIcon: ''
})

interface Emits {
  (e: 'update:modelValue', data: File[]): void
}

defineEmits<Emits>()

const componentName = getCurrentInstance()?.type.__name
</script>
