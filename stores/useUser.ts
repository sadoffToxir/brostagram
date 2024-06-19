interface UserStore {
    userEmail: string
  }

export default defineStore('user', () => {
  const state = ref<UserStore>({
    userEmail: 'test@mail.com'
  })

  const userEmail = computed(() => state.value.userEmail)

  function setUserEmail (email: string) {
    state.value.userEmail = email
  }

  return {
    userEmail,
    setUserEmail
  }
})
