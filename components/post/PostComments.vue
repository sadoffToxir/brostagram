<template>
  <BaseModal
    :is-open="isOpen"
    :show-save-btn="false"
    :max-width="DialogWidth.medium"
    @cancel="isOpen = false"
  >
    <template #activator>
      <span>
        <v-btn
          height="56px"
          @click="isOpen = true"
        >
          <v-icon>mdi-comment</v-icon>
          Comments
        </v-btn>
      </span>
    </template>
    <template #title>
      Comments
    </template>
    <v-row>
      <v-col v-for="(comment, index) in comments" :key="index" cols="12">
        <v-card>
          <v-card-title class="d-flex">
            <BaseProfileImage
              :image="comment.profileImage"
              size="25"
            />
            <span>{{ comment.username }}</span>
          </v-card-title>
          <v-card-text>
            {{ comment.comment }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </BaseModal>
</template>

<script setup lang="ts">
import type { Post } from '~/types/Post'
import { DialogWidth } from '~/types/Layout'

interface Props {
	comments: Post['comments']
}

defineProps<Props>()

const isOpen = ref(false)
</script>
