<template>
  <v-container :data-test="componentTag">
    <v-row>
      <v-col>
        <div class="d-flex justify-space-around align-center flex-column flex-sm-row fill-height">
          <template v-for="color in Object.keys(colors)" :key="color">
            <v-btn variant="flat" :color="color">
              {{ color }}
            </v-btn>
          </template>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in items" :key="item" align="center" :data-test="`${componentTag}-item`">
        <v-card>
          <v-card-title :data-test="`${componentTag}-title`">
            {{ title }}
          </v-card-title>
          <v-card-text>
            <slot :item="item" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              variant="text"
              color="info"
            >
              Action 1
            </v-btn>
            <v-btn
              variant="text"
              color="success"
            >
              Action 2
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import colors from '@/assets/scss/vuetify/colors'

interface Props {
  title: string
  items: number
}

defineProps<Props>()

const componentTag = 'Example'
</script>
