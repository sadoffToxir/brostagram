interface DrawerNavItems {
  icon: string
  title: string
  value: string
  route: string
  children?: DrawerNavItems[]
}

export const drawerNavItems = <DrawerNavItems[]> [
  { icon: 'mdi-moon-new', title: 'Home', value: 'home', route: '/' },
  { icon: 'mdi-moon-new', title: 'Alerts', value: 'alerts', route: '/alerts' },
  { icon: 'mdi-moon-new', title: 'Modals', value: 'modals', route: '/modals' }
]
