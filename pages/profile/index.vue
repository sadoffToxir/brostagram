<template>
  <div class="profile">
    <v-card width="800">
      <v-card-text class="d-flex justify-space-between">
        <div class="profile-content">
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
	console.log('userId', currentProfile.value?.userId)
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

watch(() => route.query.id, async (id) => {
	await fetchProfile(id as string)
})

onBeforeMount(async () => {
	const profile = await $api.getProfile()
	setProfile(profile)

	const id = route.query.id
	await fetchProfile(id as string)
})
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  justify-content: center;

  .profile-content {
    display: flex;
    gap: 20px;
  }

}
</style>
