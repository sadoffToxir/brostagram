<template>
  <div class="profile">
    <v-card width="800">
      <v-card-text class="d-flex justify-space-between">
        <div class="profile-content">
          <div>
            <img
              v-if="profile?.profileImage"
              :src="profile?.profileImage"
              width="150"
              height="150"
              class="profile-image"
            >
            <BaseEmptyAvatar v-else size="150" />
          </div>
          <div class="mt-4">
            <h2>{{ profile?.username }}</h2>
            <p class="pt-1">
              Email: <b>{{ profile?.email }}</b>
            </p>
            <div>
              <p class="pt-1">
                Followers: <b>{{ profile?.followersCount }}</b>
              </p>
              <p class="pt-1">
                Following: <b>{{ profile?.followingCount }}</b>
              </p>
            </div>
          </div>
        </div>
        <div>
          <BaseButton class="mt-4" @click="editProfile">
            Edit Profile
          </BaseButton>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
const { $api } = useNuxtApp()
const { setProfile, profile } = useUser()

const editProfile = () => {
	navigateTo('/profile/edit')
}

onBeforeMount(async () => {
	const profile = await $api.getProfile()

	setProfile(profile)
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

  &-image {
    border-radius: 50%;
  }
}
</style>
