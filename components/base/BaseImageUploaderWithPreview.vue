<template>
  <v-hover>
    <template #default="{ isHovering, props: hoverProps }">
      <div class="BaseImageUploaderWithPreview">
        <div class="d-flex justify-center">
          <span class="position-relative cursor-pointer" v-bind="hoverProps">
            <BaseImageUploader
              ref="imageUploaderRef"
              :image="modelValue"
              class="BaseImageUploaderWithPreview-imageUploader"
              :dimensions="dimensions"
              :image-size-in-kb="imgSizeInKb"
              :error-messages="errors"
              @update:errors="handleErrors"
              @update:image="handleImageChange"
            />
            <div
              :class="['BaseImageUploaderWithPreview-overlay', imageClass]"
              :style="[isHovering ? 'display: block;' : '', `width: ${width}px; height: ${height}px;`]"
              @click="triggerFileUpload"
            />
            <img
              :class="imageClass"
              :src="(modelValue as unknown as string) || userImageFiller"
              :width="width"
              :height="height"
            >
          </span>
          <BaseTooltip :text="`Image dimensions must be ${dimensions}`">
            <v-icon>mdi-information-outline</v-icon>
          </BaseTooltip>
        </div>
        <div v-if="errors" class="text-red">
          {{ errors }}
        </div>
      </div>
    </template>
  </v-hover>
</template>

<script lang="ts" setup>
import userImageFiller from '@/assets/img/user.png'

interface Props {
	modelValue: File
	imgSizeInKb: number
	errors?: string
	width?: string
	height?: string
	dimensions?: string
	imageClass?: string
}

interface Emits {
	(e: 'update:model-value', val: string): void
  (e: 'update:errors', val: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const imageUploaderRef = ref<HTMLInputElement | null>(null)

const triggerFileUpload = () => {
	if (imageUploaderRef.value) {
		imageUploaderRef.value.click()
	}
}

const handleErrors = (val: string) => {
	emits('update:errors', val)
}

const handleImageChange = (val: string) => {
	emits('update:model-value', val)
}

watch(() => props.modelValue, () => {
	handleErrors('')
})
</script>

<style scoped lang="scss">
.BaseImageUploaderWithPreview {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
  }

	&-imageUploader {
		display: none;
	}
}
</style>
