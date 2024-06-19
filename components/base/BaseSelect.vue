<template>
  <v-select
    :data-test="componentName"
    hide-details="auto"
  >
    <template
      v-if="$slots['item']"
      #item="slotProps"
    >
      <slot name="item" :slot-props="slotProps" />
    </template>
    <template
      v-if="$slots['selection']"
      #selection="slotProps"
    >
      <slot name="selection" :slot-props="slotProps" />
    </template>
  </v-select>
</template>

<script setup lang="ts">
const componentName = getCurrentInstance()?.type.__name
</script>
