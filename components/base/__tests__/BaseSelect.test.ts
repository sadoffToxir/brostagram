import { describe, it, expect } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import BaseSelect from '../BaseSelect.vue'
import { renderWithVuetify, screen, fireEvent } from '@/tests/vueTestingLibrary/utils'

const componentName = BaseSelect.__name as string

describe(componentName, () => {
  const setup = (options?: Record<string, object>) => renderWithVuetify(BaseSelect, options)
  const setupWithUserEvent = (options?: Record<string, object>) => ({
    user: userEvent.setup(),
    ...setup(options)
  })

  it('renders BaseSelect', () => {
    setup()

    const element = screen.getByTestId(componentName)
    expect(element).toBeVisible()
  })

  it('renders BaseSelect with given input', async () => {
    const props = {
      items: [
        'option-1',
        'option-2',
        'option-3'
      ]
    }

    const { user } = setupWithUserEvent({ props })

    const inputVal = props.items[0]

    const selectInput = screen.getByTestId(componentName).querySelector('input') as Element

    await user.click(selectInput)
    expect(screen.getByRole('listbox')).toBeVisible()

    await fireEvent.select(selectInput, { target: { value: inputVal } })
    expect(selectInput).toHaveDisplayValue(inputVal)
  })
})
