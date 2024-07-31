<template>
  <div class="profile">
    <v-card width="800">
      <v-card-text class="d-flex justify-space-between">
        <div class="profile__content">
          <BaseProfileImage :image="currentProfile?.profileImage" size="150" />
          <div class="mt-4">
            <div class="d-flex">
              <h2 class="py-1">
                {{ currentProfile?.username }}
              </h2>
              <v-btn v-if="!isProfileOwner" variant="text" class="text-blue" @click="handleFollowing">
                {{ currentProfile?.isFollowed ? 'Unfollow' : 'Follow' }}
              </v-btn>
            </div>
            <p class="pt-1">
              Email: <b>{{ currentProfile?.email }}</b>
            </p>
            <div>
              <p class="pt-1">
                Followers: <b>{{ currentProfile?.followersCount }}</b>
              </p>
              <p class="pt-1">
                Following: <b>{{ currentProfile?.followingCount }}</b>
              </p>
            </div>
            <div>
              <p><b>Bio:</b></p>
              <p>{{ currentProfile?.bio }}</p>
            </div>
          </div>
        </div>
        <div v-if="isProfileOwner">
          <BaseButton class="mt-4" @click="editProfile">
            Edit Profile
          </BaseButton>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="mt-4" width="600">
      <v-card-text>
        <PostFeed v-if="posts.length > 0" :posts="posts" @refetch-posts="fetchPosts" />
        <v-alert v-else>
          No posts published yet
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '~/types/User'

const { $api } = useNuxtApp()
const { setProfile, profile } = useUser()
const route = useRoute()
const { isError, handleErrorSnackbar } = useErrorHandler()
const { setSnackbarError } = useSnackbar()

const currentProfile = ref<User | null>(null)
const posts = ref([])

const isProfileOwner = computed(() => {
	return profile.value?.userId && currentProfile.value?.userId && profile.value.userId === currentProfile.value?.userId
})

const editProfile = () => {
	navigateTo('/profile/edit')
}

const fetchProfile = async (id:string) => {
	if (id) {
		const response = await $api.getProfile(id)

		if (isError(response)) {
			setSnackbarError({ text: handleErrorSnackbar(response) })
		} else {
			currentProfile.value = response
		}
	} else {
		currentProfile.value = profile.value
	}
}

const handleFollowing = () => {
	if (currentProfile.value?.isFollowed) {
		unfollowUser()
	} else {
		followUser()
	}
}

const followUser = async () => {
	const response = await $api.followUser(currentProfile.value?.userId)

	if (isError(response)) {
		setSnackbarError({ text: handleErrorSnackbar(response) })
	} else {
		currentProfile.value = { ...currentProfile.value, isFollowed: true } as User
	}
}

const unfollowUser = async () => {
	const response = await $api.unfollowUser(currentProfile.value?.userId)

	if (isError(response)) {
		setSnackbarError({ text: handleErrorSnackbar(response) })
	} else {
		currentProfile.value = { ...currentProfile.value, isFollowed: false } as User
	}
}

const fetchPosts = async () => {
	const response = await $api.getUserPosts(currentProfile.value?.userId)

	if (isError(response)) {
		setSnackbarError({ text: handleErrorSnackbar(response) })
	} else {
		posts.value = response
	}
}

watch(() => route.query.id, async (id) => {
	await fetchProfile(id as string)
	await fetchPosts()
})

onBeforeMount(async () => {
	const profile = await $api.getProfile()
	setProfile(profile)

	const id = route.query.id
	await fetchProfile(id as string)
	await fetchPosts()
})
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__content {
    display: flex;
    gap: 20px;
  }

}
</style>
