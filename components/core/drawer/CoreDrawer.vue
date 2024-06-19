<template>
  <v-navigation-drawer :rail="mini" permanent color="primary">
    <v-list
      v-model:opened="open"
      v-click-outside="onClickOutside"
      base-color="white"
    >
      <v-list-item @click="mini = !mini">
        <CoreDrawerClose :open="!mini" />
      </v-list-item>
      <v-list-item v-if="mini" class="text-center">
        <BaseTooltip :text="accountStore.account.accountId">
          <v-avatar color="white" size="23">
            <span class="text-primary text-caption">
              {{ toAvatar(accountStore.account.accountId) }}
            </span>
          </v-avatar>
        </BaseTooltip>
      </v-list-item>
      <v-list-group v-else fluid :value="accountStore.account.accountId">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="accountStore.account.accountId"
            :subtitle="userStore.userEmail"
          />
        </template>
        <v-list-item
          v-for="account in accountStore.accounts"
          :key="account.accountId"
          :title="account.accountId"
          :value="account.accountId"
          :disabled="account.accountId === accountStore.account.accountId"
          @click="accountStore.setAccount(account)"
        >
          <template #prepend>
            <v-avatar color="white" size="23">
              <span class="text-primary text-caption">
                {{ toAvatar(account.accountId) }}
              </span>
            </v-avatar>
          </template>
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-divider />

    <v-list density="compact" base-color="white">
      <template v-for="navItem in drawerNavItems">
        <v-list-item
          v-if="!navItem.children"
          :key="navItem.value"
          class="mt-4"
          :title="navItem.title"
          :value="navItem.value"
          :to="navItem.route"
          :active="route.path === navItem.route"
        >
          <template v-if="mini" #prepend>
            <BaseTooltip :text="navItem.title">
              <v-icon :icon="navItem.icon" />
            </BaseTooltip>
          </template>
          <template v-else #prepend>
            <v-icon :icon="navItem.icon" class="mr-4" />
          </template>
        </v-list-item>

        <v-list-group
          v-else
          :key="navItem.value + '-group'"
          :value="navItem.value"
          fluid
          class="mt-4"
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="navItem.icon"
              :title="navItem.title"
            >
              <template v-if="mini" #prepend>
                <BaseTooltip :text="navItem.title">
                  <v-icon :icon="navItem.icon" />
                </BaseTooltip>
              </template>
              <template v-else #prepend>
                <v-icon :icon="navItem.icon" class="mr-4" />
              </template>
            </v-list-item>
          </template>

          <v-list-item
            v-for="navSubItem in navItem.children"
            :key="navSubItem.value"
            :title="navSubItem.title"
            :prepend-icon="navSubItem.icon"
            :value="navSubItem.value"
            :to="navItem.route + navSubItem.route"
            :active="route.path === navItem.route + navSubItem.route"
            class="mt-4"
          >
            <template v-if="mini" #prepend>
              <BaseTooltip :text="navSubItem.title">
                <v-icon :icon="navSubItem.icon" />
              </BaseTooltip>
            </template>
            <template v-else #prepend>
              <v-icon :icon="navSubItem.icon" class="mr-4" />
            </template>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { drawerNavItems } from './drawerNavigation'

const route = useRoute()
const accountStore = useAccount()
const userStore = useUser()

const mini = ref(false)
const open = ref([])

const onClickOutside = () => {
  open.value = []
}

const toAvatar = (input: string) => input.split('-')[2]
</script>
