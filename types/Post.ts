import type { PostExercise } from './Exercise'

type ShortUserInfo = {
	username: string;
	profileImage: string;
};

export interface Post {
	createdAt: string;
	title: string;
	userId: string;
	_id: string;
	likes: string[]
	comments: (ShortUserInfo & {userId: string, comment: string})[]
	user: (ShortUserInfo & {_id: string})
	exercises: Array<PostExercise>;
}
