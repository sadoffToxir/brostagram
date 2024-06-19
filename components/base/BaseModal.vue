<template>
  <v-dialog
    :model-value="isOpen"
    persistent
    scrollable
    :data-test="componentName"
    :fullscreen="isFullScreen"
    :max-width="isFullScreen ? '' : maxWidth"
  >
    <v-card>
      <v-card-title
        v-if="$slots['title']"
        class="pr-12"
        :data-test="componentName + '-title'"
        style="word-break: break-word;"
      >
        <slot name="title" />
      </v-card-title>
      <v-card-subtitle v-if="$slots['subtitle']" :data-test="componentName + '-subtitle'">
        <slot name="subtitle" />
      </v-card-subtitle>
      <v-card-text v-if="$slots['default']" :data-test="componentName + '-text'">
        <slot name="default" />
      </v-card-text>
      <v-card-actions>
        <span v-if="$slots['prepend-error-message']" class="pl-2 text-red font-italic">
          <slot name="prepend-error-message" />
        </span>
        <v-spacer />
        <v-btn
          v-if="showCancelBtn"
          :data-test="componentName + '-action-cancel'"
          variant="text"
          @click="$emit('cancel')"
        >
          <slot name="action-cancel">
            cancel
          </slot>
        </v-btn>

        <v-btn
          v-if="showSaveBtn"
          :disabled="saveBtnDisabled"
          :data-test="componentName + '-action-save'"
          variant="text"
          color="success"
          @click="$emit('save')"
        >
          <slot name="action-save">
            save
          </slot>
        </v-btn>
      </v-card-actions>
      <v-btn
        v-if="toggleFullScreen"
        :data-test="componentName + '-toggleFullScreen'"
        icon
        position="absolute"
        variant="text"
        style="right: 0;"
        @click="isFullScreen = !isFullScreen"
      >
        <v-icon size="large">
          mdi-{{ isFullScreen ? 'fullscreen-exit' : 'fullscreen' }}
        </v-icon>
      </v-btn>
    </v-card>
    <template #activator="slotProps">
      <slot name="activator" :slot-props="slotProps" />
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { DialogWidth } from '@/types/Layout'

interface Props {
  toggleFullScreen?: boolean
  showCancelBtn?: boolean
  showSaveBtn?: boolean
  maxWidth?: DialogWidth
  saveBtnDisabled?: boolean
  isOpen: boolean
}

withDefaults(defineProps<Props>(), {
  showCancelBtn: true,
  showSaveBtn: true,
  saveBtnDisabled: false,
  maxWidth: DialogWidth.large
})

interface Emits {
  (e: 'save'): void
  (e: 'cancel'): void
}

defineEmits<Emits>()

const componentName = getCurrentInstance()?.type.__name
const isFullScreen = ref(false)
</script>
