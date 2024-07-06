<template>
  <v-file-input
    ref="fileInputRef"
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
  prependIcon?: string
  hideDetails?: boolean | 'auto'
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
	fileTypes: '*',
	hideDetails: 'auto',
	prependIcon: '',
	placeholder: ''
})

interface Emits {
  (e: 'update:modelValue', data: File | File[]): void
}

defineEmits<Emits>()
const fileInputRef = ref<HTMLElement | null>(null)

const click = () => {
	if (fileInputRef.value) {
		fileInputRef.value.click()
	}
}
defineExpose({
	fileInputRef,
	click
})

const componentName = getCurrentInstance()?.type.__name
</script>
