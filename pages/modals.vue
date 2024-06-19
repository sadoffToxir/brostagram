<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-card-text>
            Modal with title, subtitle and content
          </v-card-text>
          <v-card-actions>
            <BaseModal
              :is-open="isOpen.modal1"
              @cancel="isOpen.modal1 = false"
              @save="isOpen.modal1 = false"
            >
              <template #title>
                Modal title
              </template>
              <template #subtitle>
                Modal subtitle
              </template>
              <template #default>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, similique ad! Asperiores quas similique distinctio est nihil voluptates odit, nostrum iste enim, sequi placeat delectus omnis! Commodi magnam nobis sint!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dignissimos assumenda soluta, nam facere autem magni ut. Aperiam architecto nesciunt impedit perspiciatis provident, maxime, debitis, quidem optio adipisci laudantium at.
              </template>
              <template #activator>
                <v-btn @click="isOpen.modal1 = true">
                  Open
                </v-btn>
              </template>
            </BaseModal>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-text>Modal with toggle fullscreen</v-card-text>
          <v-card-actions>
            <BaseModal
              toggle-full-screen
              :is-open="isOpen.modal2"
              @cancel="isOpen.modal2 = false"
              @save="isOpen.modal2 = false"
            >
              <template #title>
                Modal title
              </template>
              <template #default>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, similique ad! Asperiores quas similique distinctio est nihil voluptates odit, nostrum iste enim, sequi placeat delectus omnis! Commodi magnam nobis sint!
              </template>
              <template #activator>
                <v-btn @click="isOpen.modal2 = true">
                  Open
                </v-btn>
              </template>
            </BaseModal>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-text>Modal without content</v-card-text>
          <v-card-actions>
            <BaseModal
              :is-open="isOpen.modal3"
              @cancel="isOpen.modal3 = false"
              @save="isOpen.modal3 = false"
            >
              <template #title>
                Modal title
              </template>
              <template #activator>
                <v-btn @click="isOpen.modal3 = true">
                  Open
                </v-btn>
              </template>
            </BaseModal>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-text>Modal with custom action names</v-card-text>
          <v-card-actions>
            <BaseModal
              :is-open="isOpen.modal4"
              @cancel="isOpen.modal4 = false"
              @save="isOpen.modal4 = false"
            >
              <template #title>
                Modal title
              </template>
              <template #action-cancel>
                close
              </template>
              <template #action-save>
                ok
              </template>
              <template #activator>
                <v-btn @click="isOpen.modal4 = true">
                  Open
                </v-btn>
              </template>
            </BaseModal>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-text>Modal with prepend action message</v-card-text>
          <v-card-actions>
            <BaseModal
              :is-open="isOpen.modal5"
              @cancel="isOpen.modal5 = false"
              @save="isOpen.modal5 = false"
            >
              <template #title>
                Modal title
              </template>
              <template #prepend-error-message>
                Custom error message
              </template>
              <template #activator>
                <v-btn @click="isOpen.modal5 = true">
                  Open
                </v-btn>
              </template>
            </BaseModal>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-text>Modal with custom height and width</v-card-text>
          <v-card-actions>
            <BaseModal
              max-width="300"
              max-height="200"
              :is-open="isOpen.modal6"
              @cancel="isOpen.modal6 = false"
              @save="isOpen.modal6 = false"
            >
              <template #title>
                Modal title
              </template>
              <template #default>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, similique ad! Asperiores quas similique distinctio est nihil voluptates odit, nostrum iste enim, sequi placeat delectus omnis! Commodi magnam nobis sint!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dignissimos assumenda soluta, nam facere autem magni ut. Aperiam architecto nesciunt impedit perspiciatis provident, maxime, debitis, quidem optio adipisci laudantium at.
              </template>
              <template #activator>
                <v-btn @click="isOpen.modal6 = true">
                  Open
                </v-btn>
              </template>
            </BaseModal>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-text>Modal without persistent</v-card-text>
          <v-card-actions>
            <BaseModal
              :persistent="false"
              :is-open="isOpen.modal7"
              @cancel="isOpen.modal7 = false"
              @save="isOpen.modal7 = false"
            >
              <template #title>
                Modal title
              </template>
              <template #activator>
                <v-btn @click="isOpen.modal7 = true">
                  Open
                </v-btn>
              </template>
            </BaseModal>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-text>Modal without cancel button</v-card-text>
          <v-card-actions>
            <BaseModal
              :show-cancel-btn="false"
              :is-open="isOpen.modal8"
              @save="isOpen.modal8 = false"
            >
              <template #title>
                Modal title
              </template>
              <template #activator>
                <v-btn @click="isOpen.modal8 = true">
                  Open
                </v-btn>
              </template>
            </BaseModal>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-text>Modal without save button</v-card-text>
          <v-card-actions>
            <BaseModal
              :show-save-btn="false"
              :is-open="isOpen.modal9"
              @cancel="isOpen.modal9 = false"
            >
              <template #title>
                Modal title
              </template>
              <template #activator>
                <v-btn @click="isOpen.modal9 = true">
                  Open
                </v-btn>
              </template>
            </BaseModal>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const isOpen = ref({
  modal1: false,
  modal2: false,
  modal3: false,
  modal4: false,
  modal5: false,
  modal6: false,
  modal7: false,
  modal8: false,
  modal9: false
})
</script>
