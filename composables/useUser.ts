export default function useUser () {
	const state = useState('userState', () => ({
		userId: '',
		profile: {}
	}))

	const profile = computed(()	=> state.value.profile)
	const userId = computed(()	=> state.value.userId)

	const setProfile = (profile: Record<string, string>) => {
		state.value.profile = profile
	}

	const setUserId = (userId: string) => {
		state.value.userId = userId
	}

	return {
		profile,
		userId,
		setProfile,
		setUserId
	}
}
