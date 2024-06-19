<template>
  <v-app-bar color="primary">
    <v-icon :icon="icon" color="white" class="ml-6" />
    <v-app-bar-title class="text-white">
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
  </v-app-bar>
</template>

<script setup lang="ts">
import appBarSchema from './appBarSchema'

const { title, icon, menuItems } = appBarSchema
</script>
