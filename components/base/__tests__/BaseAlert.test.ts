import { describe, it, expect } from 'vitest'
import BaseAlert from '../BaseAlert.vue'
import { renderWithVuetify, screen } from '@/tests/vueTestingLibrary/utils'

const componentTag = 'BaseAlert'

describe('BaseAlert', () => {
  const setup = (props?: any) => renderWithVuetify(BaseAlert, {
    props: {
      title: 'Test title',
      text: 'Test text',
      ...props
    }
  })

  it('should render with default props', () => {
    setup()

    const element = screen.getByTestId(componentTag)

    expect(element).toBeInTheDocument()
    expect(element).toMatchSnapshot()
  })

  it('should render with custom props', () => {
    const title = 'Custom title'
    const text = 'Custom text'
    const classes = [
      'text-success',
      'v-alert--variant-outlined'
    ]
    const props = {
      title,
      text,
      variant: 'outlined',
      type: 'success'
    }
    setup(props)

    const element = screen.queryByTestId(componentTag)

    expect(element).toHaveTextContent(title)
    expect(element).toHaveTextContent(text)
    expect(element).toHaveClass(...classes)
  })
})
