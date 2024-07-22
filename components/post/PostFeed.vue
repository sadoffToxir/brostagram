<template>
  <div class="postFeed">
    <v-row v-for="(post, index) in posts" :key="index">
      <v-col>
        <PostCard :post="post" @refetch-post="$emit('refetchPosts')" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import type { Post } from '~/types/Post'

interface Props {
  posts: Post[]
}
interface Emits {
  (e: 'refetchPosts'): void
}

defineProps<Props>()
defineEmits<Emits>()

</script>
