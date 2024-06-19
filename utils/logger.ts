import { WritableComputedRef, Ref } from 'vue'

export default function logger (consoleText: string, observed: WritableComputedRef<any> | Ref<any>) {
  const config = useRuntimeConfig()

  if (config.public.environment !== 'production') {
    watch(observed, useDebounce(() => {
    // eslint-disable-next-line no-console
      console.log(`${consoleText}:`, useCloneDeep(observed.value))
    }, 500), { deep: true })
  }
}
