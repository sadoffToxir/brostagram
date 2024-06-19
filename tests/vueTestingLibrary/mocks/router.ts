import { type RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { drawerNavItems } from '@/components/core/drawer/drawerNavigation'

const createRoutes = () => {
  const routes: RouteRecordRaw[] = []
  for (const item of drawerNavItems) {
    if (item.children) {
      for (const child of item.children) {
        routes.push({ path: item.route + child.route, redirect: child.route })
      }
    }
    routes.push({ path: item.route, redirect: item.route })
  }

  return routes
}

export const testRouter = createRouter({
  history: createWebHistory(),
  routes: createRoutes()
})
