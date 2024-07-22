<template>
  <v-app-bar color="primary" class="d-flex justify-center">
    <div class="coreAppBar__wrapper">
      <v-icon :icon="icon" color="white cursor-pointer" class="ml-6" @click="goToHomePage" />
      <v-app-bar-title class="text-white cursor-pointer" @click="goToHomePage">
        {{ title }}
      </v-app-bar-title>

      <v-spacer />
      <v-toolbar-items class="coreAppBar__list">
        <BaseAutoComplete
          v-model="searchInput"
          item-title="username"
          item-value="id"
          width="300"
          density="compact"
          variant="underlined"
          :items="searchUserList"
          label="User"
          placeholder="Enter username"
          @update:search="searchUser"
        >
          <template #item="{ item }">
            <v-list-item-title @click="navigateTo(`/profile/?id=${item.raw._id}`)">
              <div class="coreAppBar__searchList">
                <BaseProfileImage
                  :image="item.raw.profileImage"
                  size="30"
                />
                {{ item.raw.username }}
              </div>
              <v-divider />
            </v-list-item-title>
          </template>
        </BaseAutoComplete>
        <v-btn
          v-for="item in menuItems"
          :id="item.id"
          :key="item.id"
          :title="item.title"
          :to="item.to"
          icon
          color="white"
        >
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-btn>
      </v-toolbar-items>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import appBarSchema from './appBarSchema'

const { $api } = useNuxtApp()

const { title, icon, menuItems } = appBarSchema
const searchInput = ref('')
const searchUserList = ref([])
const { isError } = useErrorHandler()

const searchUser = async (value: string) => {
	await fetchUsersDebounced(value)
}

const fetchUsersDebounced = useDebounce(async (value) => {
	const response = await $api.getUsers(value)

	if (!isError(response)) {
		searchUserList.value = response
	}
}, 1000)

const goToHomePage = () => {
	navigateTo('/')
}

</script>

<style scoped lang="scss">
.coreAppBar{
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 85%;
  }

  &__list {
    display: flex;
    gap: 10px;
  }
  &__searchList {
    display: flex;
    cursor: pointer;
    padding: 10px;

    &:hover {
      background-color: #dfdfdf;
    }
  }
}
</style>
