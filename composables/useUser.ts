import type { User } from '~/types/User'

export default function useUser () {
	const state = useState<User | null>('userState', () => null)

	const profile = computed(()	=> state.value)

	const setProfile = (profile: User | null) => {
		state.value = profile
	}

	return {
		profile,
		setProfile
	}
}
