<template>
  <BaseAlert
    v-if="adBlockEnabled"
    :data-test="componentTag"
    title="Ad blocker detected!"
    text="It seems like your ad blocker is active. This might cause some features to work unexpectedly. We advise you to turn it off."
    type="warning"
    icon="mdi-alert-octagon"
    closable
  />
</template>

<script setup lang="ts">
interface AdBlockDetectionResponse {
  request?: {
    response?: string
  }
}

interface AdBlockDetectionError {
  response?: any
}

const componentTag = 'CoreAdBlockDetector'
const AD_BLOCK_DETECTION_URL = 'https://securepubads.g.doubleclick.net/pagead/ppub_config'

const adBlockEnabled = ref(false)

const detectAdBlock = async () => {
	const { data, error } = await useFetch<AdBlockDetectionResponse, AdBlockDetectionError>(AD_BLOCK_DETECTION_URL, {
		onResponse ({ request, response, options }) {
			adBlockEnabled.value = response.url !== AD_BLOCK_DETECTION_URL
		}
	})

	if (error.value?.name === 'FetchError') {
		adBlockEnabled.value = true
	}
}

onBeforeMount(async () => await detectAdBlock())
</script>
