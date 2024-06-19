import { describe, it, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import CoreSnackbar from '../CoreSnackbar.vue'
import { renderWithVuetify, screen } from '@/tests/vueTestingLibrary/utils'

const componentTag = 'CoreSnackbar'

describe('CoreSnackbar', () => {
  const setup = (snackbarValues = {}) => renderWithVuetify(CoreSnackbar, {
    global: {
      plugins: [createTestingPinia()],
      mocks: {
        storeSnackbar: {
          snackbar: {
            show: true,
            ...snackbarValues
          }
        }
      }
    }
  })

  it('should render with show: true', () => {
    setup()
    const element = screen.getByTestId(componentTag)

    expect(element).toBeInTheDocument()
    expect(element).toMatchSnapshot()
  })

  it('should not render with show: false', () => {
    setup({ show: false })

    const element = screen.queryByTestId(componentTag)
    expect(element).not.toBeInTheDocument()
  })

  it('should have props', () => {
    const text = 'text'
    const icon = 'icon'
    const color = 'color'

    setup({ text, icon, color })

    // text
    screen.getByText(text)

    // icon
    const elementWithIcon = screen.getByTestId(`${componentTag}-icon`)
    expect(elementWithIcon).toHaveClass(icon)

    // color
    const element = screen.queryByTestId(componentTag)
    expect(element?.outerHTML).contains(color)
  })
})
