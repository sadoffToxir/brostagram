<!-- eslint-disable vue/no-v-html -->
<template>
  <v-tooltip
    :location="location"
    :theme="theme"
    content-class="base_tooltip_content"
    :data-test="componentName"
  >
    <template #activator="{ props }">
      <span v-bind="props" :data-test="componentName + '-activator'">
        <slot />
      </span>
    </template>
    <span :class="{'base_tooltip_content_persist': persist }" v-html="text" />
  </v-tooltip>
</template>

<script setup lang="ts">
interface Props {
  theme?: string
  text?: string
  persist?: boolean
  location?: 'top' | 'bottom' | 'right' | 'left'
}

withDefaults(defineProps<Props>(), {
  theme: 'light',
  text: '',
  location: 'top'
})

const componentName = getCurrentInstance()?.type.__name
</script>

<style lang="scss">
  .base_tooltip_content {
    max-width: 400px !important;
    word-break: break-word;
    background-color: rgba(var(--v-theme-surface-variant), 1) !important;

    &_persist {
      pointer-events: auto;
    }
  }
</style>
