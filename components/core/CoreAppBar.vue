<template>
  <v-app-bar color="primary" class="d-flex justify-center">
    <div class="coreAppBar-wrapper">
      <v-icon :icon="icon" color="white cursor-pointer" class="ml-6" @click="goToHomePage" />
      <v-app-bar-title class="text-white cursor-pointer" @click="goToHomePage">
        {{ title }}
      </v-app-bar-title>

      <v-spacer />
      <v-toolbar-items>
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

const goToHomePage = () => {
	navigateTo('/')
}

const { title, icon, menuItems } = appBarSchema
</script>

<style scoped lang="scss">
.coreAppBar-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 85%;
}
</style>
