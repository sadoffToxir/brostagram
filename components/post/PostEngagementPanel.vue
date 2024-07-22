<template>
  <v-card-actions>
    <v-row>
      <v-col>
        <v-btn @click="postLike">
          <span v-if="isPostLiked">
            <v-icon>
              mdi-thumb-up
            </v-icon>
            Unlike
          </span>
          <span v-else>
            <v-icon>
              mdi-thumb-up-outline
            </v-icon>
            Like
          </span>
        </v-btn>
        <PostComments :comments="comments" />
      </v-col>
      <v-col cols="12" class="profileEngagementPanel__comment">
        <BaseProfileImage :image="profile?.profileImage" size="50" />

        <BaseInput
          v-model="commentInput"
        />
        <BaseButton @click="postComment">
          <v-icon>mdi-send</v-icon>
          Send
        </BaseButton>
      </v-col>
    </v-row>
  </v-card-actions>
</template>

<script setup lang="ts">
import type { Post } from '~/types/Post'

interface Emits {
	(e: 'postComment', comment: string): void
	(e: 'postLike'): void
}

interface Props {
	comments: Post['comments']
	likes: Post['likes']
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const { profile } = useUser()

const commentInput = ref('')

const isPostLiked = computed(() => props.likes.includes(profile.value!.userId!))

const postComment = () => {
	emits('postComment', commentInput.value)
}

const postLike = () => {
	emits('postLike')
}
</script>

<style lang="scss" scoped>
.profileEngagementPanel {
	&__comment {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
}
</style>
