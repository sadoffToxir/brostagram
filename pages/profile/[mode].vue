<template>
  <div class="profileEdit">
    <v-card width="800">
      <v-card-text class="profileEdit-content">
        <v-row>
          <v-col>
            <h2>Edit Profile</h2>
          </v-col>
        </v-row>
        <div class="profileEdit-imageUpload">
          <v-row>
            <v-col class="d-flex justify-center">
              <BaseImageUploaderWithPreview
                v-model="profileState.profileImage"
                dimensions="300x300"
                image-class="profileEdit-imagePreview"
                height="150"
                width="150"
                :img-size-in-kb="convertMbToKb(2)"
                :errors="errors?.profileImage"
                @update:errors="handleImageUploadErrors"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col />
          </v-row>
        </div>
        <v-row>
          <v-col>
            <BaseInput
              v-model="profileState.username"
              label="Username"
              :error-messages="errors?.username"
              required
            />
          </v-col>
          <v-col>
            <BaseInput
              v-model="profileState.email"
              label="Email"
              type="email"
              :error-messages="errors?.email"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <BaseInput
              :model-value="profileState.bio"
              label="Bio"
              :error-messages="errors?.bio"
              messages="Max 200 characters. If you exceed the limit, the text will be truncated to 200"
              @update:model-value="handleBioChange($event as string)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-end">
            <div>
              <BaseButton class="mt-4" @click="handleSubmit">
                Save changes
              </BaseButton>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
const { $api } = useNuxtApp()
const { setProfile, profile } = useUser()
const { isError, handleInputError, handleErrorSnackbar } = useErrorHandler()
const { setSnackbarError, setSnackbarSuccess } = useSnackbar()

const profileState = ref({
	profileImage: profile.value ? profile.value.profileImage : '',
	username: profile.value ? profile.value.username : '',
	email: profile.value ? profile.value.email : '',
	bio: profile.value ? profile.value.bio : ''
})

const errors = ref<Record<string, string> | null>(null)

const handleBioChange = (value: string) => {
	if (value.length <= 200) {
		profileState.value.bio = value
	}
}

const handleImageUploadErrors = (val: string) => {
	errors.value = { ...errors.value, profileImage: val }
}

const convertMbToKb = (mb: number) => {
	return mb * 1024
}

const handleSubmit = async () => {
	errors.value = null
	const response = await $api.updateProfile(profile.value!.userId, profileState.value)

	if (isError(response)) {
		errors.value = handleInputError(response)
		setSnackbarError({ text: handleErrorSnackbar(response) })
	} else {
		setSnackbarSuccess({ text: 'Profile was updated successfully' })
		navigateTo('/profile')
	}
}

onBeforeMount(async () => {
	const profile = await $api.getProfile()

	profileState.value = {
		profileImage: profile.profileImage,
		username: profile.username,
		email: profile.email,
		bio: profile.bio
	}

	setProfile(profile)
})
</script>

<style scoped lang="scss">
.profileEdit {
  display: flex;
  justify-content: center;

  &-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-imageUpload {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }

  &-image {
    width: fit-content;
    border-radius: 50%;
    overflow: hidden;
  }

  &:deep(.profileEdit-imagePreview) {
    border-radius: 50%;
  }
}
</style>
