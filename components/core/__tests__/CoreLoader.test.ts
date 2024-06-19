import { describe, it, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import CoreLoader from '../CoreLoader.vue'
import { renderWithVuetify, screen } from '@/tests/vueTestingLibrary/utils'

const componentTag = 'CoreLoader'

describe('CoreLoader', () => {
  const setup = (isLoading = true) => renderWithVuetify(CoreLoader, {
    global: {
      plugins: [createTestingPinia()],
      mocks: {
        storeLoader: {
          isLoading
        }
      }
    }
  })

  it('should render with isLoading: true', () => {
    setup()

    const element = screen.getByTestId(componentTag)

    expect(element).toBeInTheDocument()
    expect(element).toMatchSnapshot()
  })

  it('should not render with isLoading: false', () => {
    setup(false)

    const element = screen.queryByTestId(componentTag)

    expect(element).not.toBeInTheDocument()
  })
})
