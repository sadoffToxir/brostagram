<template>
  <div class="d-flex justify-center">
    <v-card flat>
      <v-card-text class="d-flex justify-space-between">
        <PostCardDetailed :post="post!" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/Post'

const { $api } = useNuxtApp()
const route = useRoute()
const { setProfile, profile } = useUser()

const post = ref<Post | null>(null)

onBeforeMount(async () => {
	if (!profile.value) {
		const profileResponse = await $api.getProfile()

		setProfile(profileResponse)
	}

	const id = route.params.id

	const postResponse = await $api.getPostById(id)
	post.value = postResponse
})
</script>
