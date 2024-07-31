export default {
	title: 'Brostagram',
	pageName: '',
	icon: 'mdi-dumbbell',
	menuItems: [
		{
			isAuth: true,
			title: 'Profile',
			icon: 'mdi-account',
			id: 'profile',
			to: '/profile'
		},
		{
			isAuth: true,
			title: 'Logout',
			icon: 'mdi-logout',
			id: 'logout',
			to: '/logout'
		}
	]
}
