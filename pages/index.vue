<template>
  <div class="d-flex justify-center">
    <v-card width="800">
      <v-card-text>
        <v-row>
          <v-col cols="auto">
            <PostCreate @refetch-posts="refetchPosts" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <PostFeed :posts="posts" @refetch-posts="refetchPosts" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/Post'

const { $api } = useNuxtApp()
const { setProfile, profile } = useUser()
const { isError } = useErrorHandler()

const posts = ref<Post[]>([])

const refetchPosts = useDebounce(async () => {
	const postsResponse = await $api.getFollowingPosts(profile.value!.userId)

	if (!isError(postsResponse)) {
		posts.value = postsResponse
	}
}, 500)

onBeforeMount(async () => {
	if (!profile.value) {
		const profileResponse = await $api.getProfile()

		setProfile(profileResponse)
	}

	const postsResponse = await $api.getFollowingPosts(profile.value!.userId)

	if (!isError(postsResponse)) {
		posts.value = postsResponse
	}
})
</script>
