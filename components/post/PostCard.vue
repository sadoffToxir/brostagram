<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col
          cols="2"
          class="d-flex align-center cursor-pointer"
          @click="navigateTo(`/profile?id=${post.user._id}`)"
        >
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
          <template v-if="detailed">
            <v-row v-for="(exercise, exerciseIndex) in post.exercises" :key="exerciseIndex">
              <v-col cols="12">
                <h4>{{ exercise.name }}</h4>
              </v-col>
              <v-col cols="12">
                <v-row v-for="(set, setIndex) in exercise.sets" :key="setIndex">
                  <v-col class="d-flex">
                    <div class="px-1">
                      {{ setIndex + 1 }}.
                    </div>
                    <template v-for="(measurementType, measurementTypeIndex) in Object.keys(set)" :key="measurementTypeIndex">
                      <div v-if="measurementType !== '_id'" class="px-1">
                        {{ set[measurementType as keyof typeof set] }} {{ getMeasurement(measurementType) }}
                      </div>
                      <div class="px-1">
                        {{ measurementTypeIndex === 0 ? ' x ' : '' }}
                      </div>
                    </template>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </template>
          <v-row v-else>
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
import { MeasurementTypes } from '~/types/Exercise'
import type { Post } from '~/types/Post'

interface Props {
	post: Post
  detailed?: boolean
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

const getMeasurement = (measurementType: string) => {
	switch (measurementType) {
		case MeasurementTypes.ASSISTED_WEIGHT:
		case MeasurementTypes.WEIGHT:
			return 'kg'
		case MeasurementTypes.DURATION:
			return 'minutes'
		case MeasurementTypes.REPS:
			return 'reps'
		case MeasurementTypes.DISTANCE:
			return 'km'
		default:
			break
	}
}

</script>
