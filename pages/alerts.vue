<template>
  <v-container>
    <h1>Alerts</h1>
    <v-row>
      <v-col>
        <BaseAlert
          title="Info alert"
          :text="text"
        />
      </v-col>
      <v-col>
        <BaseAlert
          title="Outlined success alert"
          :text="text"
          variant="outlined"
          type="success"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <BaseAlert
          title="Alert without icon"
          :text="text"
          type="warning"
          :icon="false"
        />
      </v-col>
      <v-col>
        <BaseAlert
          title="Alert with custom icon"
          :text="text"
          type="error"
          icon="mdi-cloud-alert"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <BaseAlert
          title="Closable alert"
          :text="text"
          closable
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!'
</script>
