<template>
  <v-textarea
    :model-value="modelValue"
    :class="`${styleClass} base_input`"
    :label="label"
    :data-test="componentTag"
    :placeholder="placeholder"
    :disabled="disabled"
    :hint="hint"
    :persistent-hint="!!hint"
    :error="error"
    :error-messages="errorMessages"
    :auto-grow="autoGrow"
    :rows="rows"
    :hide-details="hideDetails"
    :clearable="clearable"
    :tabindex="tabindex"
    outlined
    @update:model-value="handleInput"
    @click:clear="$emit('update:modelValue', '')"
  />
</template>

<script setup lang="ts">

interface Props {
  modelValue?: string | number
  label?: string
  styleClass?: string
  placeholder?: string
  hint?: string
  hideDetails?: boolean | 'auto'
  disabled?: boolean
  error?: boolean
  errorMessages?: string | []
  autoGrow?: boolean
  rows?: string
  clearable?: boolean
  tabindex?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  hint: '',
  hideDetails: 'auto',
  styleClass: '',
  errorMessages: '',
  rows: '5',
  tabindex: '0'
})

interface Emits {
  (e: 'update:modelValue', val: number | string): void
}

const emits = defineEmits<Emits>()

const componentTag = 'BaseTextarea'

const handleInput = (value: any): void => {
  emits('update:modelValue', value)
}
</script>
