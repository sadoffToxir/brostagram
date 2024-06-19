<template>
  <div :data-test="componentName">
    <v-text-field
      :model-value="date"
      variant="underlined"
      prepend-inner-icon="mdi-calendar-range"
      readonly
      :label="label"
      :hide-details="hideDetails"
      :disabled="disabled"
      :error="error"
      :data-test="componentName + '-input'"
      :error-messages="errorMessages"
      class="baseDatePicker-trigger"
      @click="(baseDatePicker as any).openMenu()"
    />
    <VueDatePicker
      ref="baseDatePicker"
      uid="baseDatePicker"
      :min-date="min"
      :model-value="date"
      :enable-time-picker="false"
      :month-change-on-scroll="false"
      :max-date="max"
      :data-test="componentName + '-datePicker'"
      auto-apply
      :teleport="true"
      @update:model-value="handleChange"
    >
      <template #trigger />
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
interface Props {
  date: string
  min?: string | Date
  label?: string
  max?: string | Date
  disabled?: boolean
  hideDetails?: boolean | 'auto'
  error?: boolean
  errorMessages?: string | Array<string>
}

withDefaults(defineProps<Props>(), {
  label: 'Date',
  min: '',
  max: '',
  hideDetails: 'auto',
  error: false,
  errorMessages: '',
  disabled: false
})

interface Emits {
  (e: 'update:date', value: string): void
}

const emits = defineEmits<Emits>()

const baseDatePicker = ref(null)
const componentName = getCurrentInstance()?.type.__name

const handleChange = (value: Date) => {
  emits('update:date', formatToIsoDate(value))
}
</script>

<style lang="scss">
.baseDatePicker-trigger {
  .v-field__prepend-inner {
    align-items: center;
  }
}
</style>
