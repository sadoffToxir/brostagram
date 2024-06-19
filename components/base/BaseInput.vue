<template>
  <v-text-field
    :data-test="componentTag"
    :clearable="!readonly && clearable"
    :hide-details="hideDetails"
    :readonly="readonly"
    :max-errors="maxErrors"
    @update:model-value="handleUpdate"
  />
</template>

<script setup lang="ts">
interface Props {
  hideDetails?: boolean | 'auto'
  clearable?: boolean
  maxErrors?: string | number
  type?: string
  readonly?: boolean
}

interface Emits {
  (e: 'update:model-value', val: number | string): void
}

const props = withDefaults(defineProps<Props>(), {
  hideDetails: 'auto',
  clearable: true,
  maxErrors: 5,
  type: 'text'
})

const emits = defineEmits<Emits>()

const componentTag = 'BaseInput'

const handleUpdate = (input: string | number | null): void => {
  const value = input === null
    ? props.type === 'number' ? 0 : ''
    : input
  emits('update:model-value', value)
}
</script>

<style lang="scss" scoped>
.v-input--readonly {
  opacity: 0.3;
}
</style>
