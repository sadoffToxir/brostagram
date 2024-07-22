<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="2" class="d-flex align-center">
          <BaseProfileImage :image="post.user.profileImage" size="50" />
          <h3>{{ post.user.username }}</h3>
        </v-col>
        <v-col cols="12">
          {{ post.title }}
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-card flat color="#e9e9e9">
        <v-card-text>
          <v-row>
            <v-col v-for="(exercise, exerciseIndex) in post.exercises" :key="exerciseIndex" cols="12">
              <b>{{ exercise.name }}</b> - {{ exercise.sets.length }} set{{ exercise.sets.length === 1 ? '': 's' }}
            </v-col>
            <v-col class="d-flex justify-center">
              <BaseButton color="primary" variant="text" :to="`/post/${post._id}`">
                View
              </BaseButton>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
    <PostEngagementPanel
      :likes="post.likes"
      :comments="post.comments"
      @post-comment="postComment"
      @post-like="postLike"
    />
  </v-card>
</template>

<script lang="ts" setup>
import type { Post } from '~/types/Post'

interface Props {
	post: Post
}
interface Emits {
  (e: 'refetchPost'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const { profile } = useUser()
const { $api } = useNuxtApp()
const { setSnackbarError } = useSnackbar()
const { isError, handleErrorSnackbar } = useErrorHandler()

const postComment = async (comment: string) => {
	const response = await $api.commentPost(props.post._id, comment)

	if (isError(response)) {
		setSnackbarError({ text: handleErrorSnackbar(response) })
	} else {
		emits('refetchPost')
	}
}

const postLike = async () => {
	let response

	if (props.post.likes.includes(profile.value!.userId!)) {
		response = await $api.unlikePost(props.post._id)
	} else {
		response = await $api.likePost(props.post._id)
	}

	if (isError(response)) {
		setSnackbarError({ text: handleErrorSnackbar(response) })
	} else {
		emits('refetchPost')
	}
}

</script>
