<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="2" class="d-flex align-center">
          <div class="pr-2">
            <img
              v-if="post.user.profileImage"
              :src="post.user.profileImage"
              class="post__profile-image"
            >
            <BaseEmptyAvatar v-else size="75" />
          </div>
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
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { MeasurementTypes } from '~/types/Exercise'
import type { Post } from '~/types/Post'

interface Props {
	post: Post
}

defineProps<Props>()

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

<style lang="scss" setup>
.post {
	&__profile-image {
		border-radius: 50%;
		height: 75px;
		width: 75px;
	}
}
</style>
