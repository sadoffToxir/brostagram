import { describe, it, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import Example from '../Example.vue'
import { renderWithVuetify, screen } from '@/tests/vueTestingLibrary/utils'

const componentTag = 'Example'

describe('Example', () => {
  const setup = (data: any) => renderWithVuetify(Example, {
    global: {
      plugins: [createTestingPinia()],
      mocks: {
        storeLoader: {
          setLoader: vitest.fn
        },
        storeSnackbar: {
          setSnackbarInfo: vitest.fn,
          setSnackbarSuccess: vitest.fn
        }
      }
    },
    ...data
  })

  it('should render title', async () => {
    const title = 'title'
    const items = 1

    setup({
      props: {
        title,
        items
      }
    })

    const element = await screen.findByTestId(`${componentTag}-title`)

    expect(element).toHaveTextContent(title)
  })

  it('should render items', async () => {
    const title = 'title'
    const items = 2

    setup({
      props: {
        title,
        items
      }
    })

    const elements = await screen.findAllByTestId(`${componentTag}-item`)

    expect(elements.length).toBe(items)
  })

  it('should render slot', async () => {
    const title = 'title'
    const items = 1
    const slot = `<div data-test="${componentTag}-slot">Slot</div>`

    setup({
      props: {
        title,
        items
      },
      slots: {
        default: slot
      }
    })

    const element = await screen.findByTestId(`${componentTag}-slot`)

    expect(element.outerHTML).toBe(slot)
  })
})
