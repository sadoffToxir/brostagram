<template>
  <div class="pr-2">
    <img
      :src="image || userImageFiller"
      :width="size"
      :height="size"
      class="profile-image"
    >
  </div>
</template>

<script setup lang="ts">
import userImageFiller from '@/assets/img/user.png'

interface Props {
	image?: string | undefined
	size: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.profile-image {
	border-radius: 50%;
}
</style>
