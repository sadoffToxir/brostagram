import VueDatePicker from '@vuepic/vue-datepicker'
import { describe, it, expect } from 'vitest'
import { fireEvent } from '@testing-library/vue'
import BaseDatePicker from '../BaseDatePicker.vue'
import { renderWithVuetify, screen } from '@/tests/vueTestingLibrary/utils'
import { formatToIsoDate } from '@/utils/date'

const componentName = BaseDatePicker.__name as string

describe(componentName, () => {
  const globalOptions = {
    global: {
      components: {
        VueDatePicker
      }
    }
  }

  const setup = (options?: Record<string, object>) => renderWithVuetify(BaseDatePicker, {
    global: {
      ...globalOptions.global,
      ...options?.global
    },
    ...options
  })

  it('renders with props', () => {
    const props = {
      label: 'label',
      date: formatToIsoDate(new Date())
    }

    setup({ props })

    const element = screen.getByTestId(componentName)
    const label = screen.getByLabelText(props.label)
    const date = screen.getByDisplayValue(props.date)

    expect(element).toBeVisible()
    expect(date).toBeVisible()
    expect(label).toBeVisible()
  })

  it('triggers calendar modal on input click', async () => {
    const props = {
      date: formatToIsoDate(new Date())
    }

    setup({ props })

    const input = screen.getByTestId(`${componentName}-input`).querySelector('input') as Element
    await fireEvent.click(input)
    const dialog = document.body.querySelector('#dp-menu-baseDatePicker')

    expect(dialog).toBeVisible()
  })

  it('can select date', async () => {
    const date = formatToIsoDate('2023-08-16')
    const activeDate = new Date(date).getDate()
    const props = {
      date
    }

    const { emitted } = setup({ props })

    // check if dialog opens and date from input is active date in the dialog
    const input = screen.getByTestId(`${componentName}-input`).querySelector('input') as Element
    await fireEvent.click(input)
    const dialog = document.body.querySelector('#dp-menu-baseDatePicker')
    expect(dialog).toBeInTheDocument()
    const active = dialog!.querySelector('.dp__active_date')
    expect(active).toHaveTextContent(String(activeDate))

    // select day before active date and check if dialog closes + value is updated
    const previous = screen.getByText(String(activeDate - 1))
    await fireEvent.click(previous)
    expect(document.body.querySelector('#dp-menu-baseDatePicker')).not.toBeInTheDocument()
    expect(emitted('update:date')).toMatchSnapshot()
  })
})
