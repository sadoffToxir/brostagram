import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { render } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { Suspense } from 'vue'

const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout

export function flushPromises (): Promise<void> {
  return new Promise((resolve) => {
    scheduler(resolve, 0)
  })
}

export function wrapInSuspense (
  component: ReturnType<typeof defineComponent>,
  { props }: { props: object }
): ReturnType<typeof defineComponent> {
  return defineComponent({
    render () {
      return h(
        'div',
        { id: 'root' },
        h(Suspense, null, {
          default () {
            return h(component, props)
          },
          fallback: h('div', 'fallback')
        })
      )
    }
  })
}

export function renderWithVuetify (component: any, args: any = {}) {
  args = args || {}
  args.global = args.global || {}
  args.global.plugins = args.global.plugins || []
  args.global.plugins.push(createVuetify({ components, directives }))
  args.global.plugins.push(createTestingPinia())

  return render(
    component,
    args
  )
}

export function calcSumEvents () {
  let numOfEvents = 0

  return function (eventNum: number) {
    numOfEvents += eventNum

    return numOfEvents
  }
}

export function createFetchResponse (data: any) {
  return new Promise(resolve => resolve(data))
}

export * from '@testing-library/vue'
