import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { config, DOMWrapper, createWrapperError, VueWrapper } from '@vue/test-utils'

const DataTestIdPlugin = (wrapper: VueWrapper) => {
  function findByTestId (selector: string): DOMWrapper<HTMLElement> {
    const dataSelector = `[data-test='${selector}']`
    const element = wrapper.element.querySelector(dataSelector) as HTMLElement
    if (element) {
      return new DOMWrapper(element)
    }

    return createWrapperError('DOMWrapper')
  }

  function findAllByTestId (selector: string): DOMWrapper<HTMLElement>[] {
    const dataSelector = `[data-test='${selector}']`
    const elements = Array.from(wrapper.element.querySelectorAll(dataSelector))
    if (elements.length) {
      return Array.from(elements).map(element => new DOMWrapper(element as HTMLElement))
    }

    return createWrapperError('DOMWrapper')
  }

  return {
    findByTestId,
    findAllByTestId
  }
}

config.plugins.VueWrapper.install(DataTestIdPlugin)

// add vuetify globally
config.global.plugins.push(createVuetify())
config.global.plugins.push(createPinia())
