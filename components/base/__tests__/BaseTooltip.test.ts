import { describe, it, expect } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import BaseTooltip from '../BaseTooltip.vue'
import { renderWithVuetify, screen } from '@/tests/vueTestingLibrary/utils'

const componentName = BaseTooltip.__name as string

describe(componentName, () => {
  const setup = (options?: Record<string, object>) => renderWithVuetify(BaseTooltip, options)
  const setupWithUserEvent = (options?: Record<string, object>) => ({
    user: userEvent.setup(),
    ...setup(options)
  })

  it('renders with custom props', async () => {
    const props = {
      text: 'BaseTooltip test',
      theme: 'dark',
      location: 'right'
    }

    const { user } = setupWithUserEvent({ props })

    const tooltip = screen.getByTestId(componentName)

    await user.hover(tooltip)
    const hoverText = screen.getByText(props.text)

    expect(hoverText).toHaveTextContent(props.text)
    expect(tooltip).toHaveClass('v-theme--dark')
  })

  it('renders with custom slots', () => {
    const slots = {
      default: '<div>BaseToolTip test</div>'
    }

    setup({ slots })

    const slot = screen.getByTestId(`${componentName}-activator`)

    expect(slot.innerHTML).toBe(slots.default)
  })
})
