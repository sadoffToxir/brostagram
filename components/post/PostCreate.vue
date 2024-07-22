<template>
  <BaseModal
    :is-open="isOpen"
    :save-btn-disabled="false"
    :max-width="DialogWidth.medium"
    @save="createItem"
    @cancel="resetForm"
  >
    <template #activator>
      <span>
        <BaseButton
          height="56px"
          @click="isOpen = true"
        >
          Add Workout
        </BaseButton>
      </span>
    </template>
    <template #title>
      Create Workout
    </template>
    <template #action-save>
      Post workout
    </template>

    <v-row>
      <v-col cols="12">
        <BaseInput
          v-model="postForm.title"
          label="Title"
          :error-messages="errors?.title"
          placeholder="Enter workout title"
        />
      </v-col>
    </v-row>
    <v-row v-for="(exercise, index) in postForm.exercises" :key="index">
      <v-col cols="12">
        <h2>{{ exercise.name }}</h2>
      </v-col>
      <v-col>
        <v-row
          v-for="(_, setIndex) in exercise.sets"
          :key="`${exercise.type}-${setIndex}`"
          class="d-flex justify-start"
        >
          <v-col
            v-for="countFieldKey in getKeys(postExerciseValues[exercise.type])"
            :key="`${exercise.type}-${countFieldKey}`"
          >
            <BaseInput
              :model-value="exercise.sets[setIndex][countFieldKey]"
              :label="countFieldKey"
              type="number"
              hide-spin-buttons
              :error-messages="errors?.[`exercises[${index}].sets[${setIndex}]`]"
              max-length
              :placeholder="getInputPlaceHolder(countFieldKey)"
              @update:model-value="handleUpdate(index, setIndex, countFieldKey, $event as number)"
            >
              <template #append-inner>
                {{ getInputPlaceHolder(countFieldKey) }}
              </template>
            </BaseInput>
          </v-col>
          <v-col cols="2">
            <div>
              <v-btn icon="mdi-delete" color="red" @click="removeSet(index, setIndex)" />
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <v-btn
            variant="outlined"
            icon="mdi-plus"
            color="green"
            @click="addSet(index)"
          />
        </div>
        <v-divider class="mt-3" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <BaseAutoComplete
          v-model="newExercise"
          item-title="name"
          item-value="id"
          :items="exercisesList"
          label="Exercise"
          placeholder="Enter exercise title"
          @update:search="searchExercises"
        />
      </v-col>
      <v-col>
        <BaseButton
          @click="addExercise"
        >
          Add exercise
        </BaseButton>
      </v-col>
    </v-row>
  </BaseModal>
</template>

<script setup lang="ts">
import { postExerciseValues } from './content'
import { DialogWidth } from '~/types/Layout'
import { type PostExercise, type Exercise, MeasurementTypes, type AllExerciseTypes } from '~/types/Exercise'

interface Emits {
  (e: 'refetchPosts'): void
}

const emits = defineEmits<Emits>()

const { $api } = useNuxtApp()
const { isError, handleInputError, handleErrorSnackbar } = useErrorHandler()
const { setSnackbarError, setSnackbarSuccess } = useSnackbar()

const postForm = ref({
	title: '',
	exercises: [] as PostExercise[]
})
const errors = ref<Record<string, string> | null>(null)
const newExercise = ref('')
const isOpen = ref(false)
const exercisesList = ref<Exercise[]>([])

const searchExercises = async (value: string) => {
	await fetchExercisesDebounced(value)
}

const fetchExercisesDebounced = useDebounce(async (value) => {
	const response = await $api.getExercises(value)
	exercisesList.value = response
}, 1000)

const createItem = async () => {
	errors.value = null
	const response = await $api.createPost(postForm.value)
	if (isError(response)) {
		errors.value = handleInputError(response)
		setSnackbarError({ text: handleErrorSnackbar(response) })
	} else {
		setSnackbarSuccess({ text: 'Workout posted successfully!' })
		resetForm()
		emits('refetchPosts')
		isOpen.value = false
	}
}

const resetForm = () => {
	isOpen.value = false
	postForm.value = {
		title: '',
		exercises: []
	}
}

const handleUpdate = (exerciseIndex: number, setIndex: number, key: keyof AllExerciseTypes, value: number) => {
	if (Number.isInteger(+value)) {
		postForm.value.exercises[exerciseIndex].sets[setIndex][key] = (+(String(value).slice(0, 6))) as never
	} else {
		postForm.value.exercises[exerciseIndex].sets[setIndex][key] = (+(String(value).slice(0, 8))).toFixed(2) as never
	}
}

const addExercise = () => {
	const exercise = exercisesList.value.find((item: Record<string, string>) => item.id === newExercise.value)

	if (exercise) {
		postForm.value.exercises.push({
			...exercise,
			sets: [{ ...postExerciseValues[exercise.type] }]
		})

		newExercise.value = ''
	}
}

const addSet = (exerciseIndex: number) => {
	const exercise = postForm.value.exercises[exerciseIndex]
	exercise.sets.push({ ...postExerciseValues[exercise.type] })
}

const removeSet = (exerciseIndex: number, setIndex: number) => {
	if (postForm.value.exercises[exerciseIndex].sets.length === 1) {
		postForm.value.exercises.splice(exerciseIndex, 1)
		return
	}
	postForm.value.exercises[exerciseIndex].sets.splice(setIndex, 1)
}

const getInputPlaceHolder = (type: MeasurementTypes) => {
	switch (type) {
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

const getKeys = <T extends object>(obj: T): (keyof T)[] => {
	return Object.keys(obj) as (keyof T)[]
}

</script>
