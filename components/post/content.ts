import { ExerciseTypes } from '../../types/Exercise'

export const postExerciseValues = {
	[ExerciseTypes.WEIGHT_REPS]: {
		weight: 0,
		reps: 0
	},
	[ExerciseTypes.REPS_ONLY]: {
		reps: 0
	},
	[ExerciseTypes.DURATION]: {
		duration: 0
	},
	[ExerciseTypes.ASSISTED_BODYWEIGHT]: {
		assistedWeight: 0,
		reps: 0
	},
	[ExerciseTypes.WEIGHTED_BODYWEIGHT]: {
		weight: 0,
		reps: 0
	},
	[ExerciseTypes.WEIGHT_DISTANCE]: {
		weight: 0,
		distance: 0
	},
	[ExerciseTypes.DISTANCE_DURATION]: {
		distance: 0,
		duration: 0
	},
	[ExerciseTypes.WEIGHT_DURATION]: {
		weight: 0,
		duration: 0
	}
}
