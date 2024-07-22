export enum ExerciseTypes {
	WEIGHT_REPS = 'Weight & Reps',
	REPS_ONLY = 'Reps Only',
	DURATION = 'Duration',
	ASSISTED_BODYWEIGHT = 'Assisted Bodyweight',
	WEIGHTED_BODYWEIGHT = 'Weighted Bodyweight',
	WEIGHT_DISTANCE = 'Weight & Distance',
	DISTANCE_DURATION = 'Distance Duration',
	WEIGHT_DURATION = 'Weight & Duration'
}

export interface Exercise {
	name: string;
	id: string
	type: `${ExerciseTypes}`;
	category: string;
}

export enum MeasurementTypes {
	WEIGHT = 'weight',
	REPS = 'reps',
	DISTANCE = 'distance',
	DURATION = 'duration',
	ASSISTED_WEIGHT = 'assistedWeight',
}

export interface WeightRepsExercise {
	[MeasurementTypes.WEIGHT]: number;
	[MeasurementTypes.REPS]: number;
}

export interface RepsOnlyExercise {
	[MeasurementTypes.REPS]: number;
}

export interface DurationExercise {
	[MeasurementTypes.DURATION]: number;
}

export interface AssistedBodyWeightExercise {
	[MeasurementTypes.ASSISTED_WEIGHT]: number;
	[MeasurementTypes.REPS]: number;
}

export interface WeightedBodyWeightExercise {
	[MeasurementTypes.WEIGHT]: number;
	[MeasurementTypes.REPS]: number;
}

export interface WeightDistanceExercise {
	[MeasurementTypes.WEIGHT]: number;
	[MeasurementTypes.DISTANCE]: number;
}

export interface DistanceDurationExercise {
	distance: number;
	[MeasurementTypes.DURATION]: number;
}

export interface WeightDurationExercise {
	[MeasurementTypes.WEIGHT]: number;
	[MeasurementTypes.DURATION]: number;
}

export interface PostExercise extends Exercise {
	sets: Array<WeightRepsExercise | RepsOnlyExercise | DurationExercise | AssistedBodyWeightExercise | WeightedBodyWeightExercise | WeightDistanceExercise | DistanceDurationExercise | WeightDurationExercise>;
}

export type AllExerciseTypes = WeightRepsExercise | RepsOnlyExercise | DurationExercise | AssistedBodyWeightExercise | WeightedBodyWeightExercise | WeightDistanceExercise | DistanceDurationExercise | WeightDurationExercise;
