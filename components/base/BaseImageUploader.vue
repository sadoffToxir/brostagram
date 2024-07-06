<template>
  <BaseFileUploader
    ref="fileUploaderRef"
    :label="label"
    :file-types="fileTypes"
    :error-messages="computedErrorMessages"
    :data-test="componentName"
    :hint="hint"
    :placeholder="placeholder"
    :style-class="styleClass"
    @update:model-value="localImage = ($event as File)"
  />
</template>

<script setup lang="ts">
interface Props {
  image: File | any
  fileTypes?: string
  imageSizeInKb?: number
  dimensions?: string
  label?: string
  hint?: string
  placeholder?: string
  styleClass?: string
  errorMessages?: string | Array<string>
}

const props = withDefaults(defineProps<Props>(), {
	image: () => {},
	fileTypes: 'image/*',
	imageSizeInKb: 50,
	dimensions: '',
	label: '',
	hint: '',
	placeholder: '',
	styleClass: '',
	errorMessages: ''
})

interface Emits {
  (e: 'update:image', val: string): void
	(e: 'update:errors', val: string): void
}

const fileUploaderRef = ref<HTMLElement | null>(null)

const click = () => {
	if (fileUploaderRef.value) {
		fileUploaderRef.value.click()
	}
}

defineExpose({
	fileUploaderRef,
	click
})

const emits = defineEmits<Emits>()

const componentName = getCurrentInstance()?.type.__name
const { $exif } = useNuxtApp()

const computedErrorMessages = ref('')

watch(() => (props.errorMessages), (newValue) => {
	computedErrorMessages.value = '' + newValue
})

const localImage = computed({
	get (): File {
		return props.image
	},
	set (val: File) {
		uploadImage(val)
	}
})
const maxImageSize = computed(() => props.imageSizeInKb * 1024)

const isValidImageSize = (image: File) => {
	return !image || (image.size <= maxImageSize.value)
}

const isValidColorProfile = async (image: File) => {
	const { FileType: fileType, 'Color Space': colorSpace, 'Color Components': colorComponents } = await $exif.load(image)
	if (fileType?.value === 'jpeg') {
		return (
			(colorSpace?.value ?? 'CMYK') !== 'CMYK' ||
      (colorComponents?.value ?? 4) < 4
		)
	}

	return true
}

const fileSizeFormatted = (fileSize: number) => {
	if (fileSize < 1024) {
		return `${fileSize} bytes`
	}

	if (fileSize >= 1024 && fileSize < 1048576) {
		return `${(fileSize / 1024).toFixed(1)} kb`
	}

	return `${(fileSize / 1048576).toFixed(1)} mb`
}

const convertToBase64 = (data: File) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()

		reader.onloadend = () => {
			resolve(reader.result as string)
		}

		reader.onerror = reject

		reader.readAsDataURL(data)
	})
}

const checkImageDimensions = (imageData: string) => {
	return new Promise<string[]>((resolve, reject) => {
		const img = new Image()

		img.onload = function () {
			resolve(['' + img.width, '' + img.height])
		}

		img.onerror = reject

		img.src = imageData
	})
}

const uploadImage = async (image: File) => {
	computedErrorMessages.value = ''
	if (!image) { return }

	if (!isValidImageSize(image)) {
		computedErrorMessages.value = `Max size for image is ${fileSizeFormatted(maxImageSize.value)}` as string

		return
	}

	if (!await isValidColorProfile(image)) {
		computedErrorMessages.value = 'Image must be in RGB color space and have at least 4 color components'

		return
	}

	const imageData: string = await convertToBase64(image)
	if (props.dimensions?.length) {
		const dimensions = await checkImageDimensions(imageData)
		if (!useIsEqual(props.dimensions.split('x'), dimensions)) {
			computedErrorMessages.value = `Image dimensions must be ${props.dimensions}, but are ${dimensions.join('x')}`

			return
		}
	}

	if (imageData) {
		emits('update:image', imageData)
	}
}

watch(() => computedErrorMessages.value, (newValue) => {
	if (newValue !== props.errorMessages) {
		emits('update:errors', newValue)
	}
})
</script>
