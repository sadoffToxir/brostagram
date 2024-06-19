<template>
  <v-container>
    <v-alert
      :data-test="componentTag"
      :type="type"
      :variant="variant"
      :title="title"
      :text="text"
      :icon="icon"
      :closable="closable"
      :close-label="closeLabel"
    />
  </v-container>
</template>

<script setup lang="ts">

interface Props {
  type?: 'error' | 'success' | 'warning' | 'info'
  variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  icon?: string | false | undefined
  title: string
  text: string
  closable?: boolean
  closeLabel?: string
}

withDefaults(defineProps<Props>(), {
  type: 'info',
  variant: 'flat',
  icon: undefined,
  closable: false,
  closeLabel: 'Close'
})

const componentTag = 'BaseAlert'

</script>
