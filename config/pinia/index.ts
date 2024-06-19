import { ModuleOptions as ModuleOptionsPinia } from '@pinia/nuxt'

export const pinia: ModuleOptionsPinia = {
  autoImports: [
    'defineStore',
    'acceptHMRUpdate'
  ]
}
