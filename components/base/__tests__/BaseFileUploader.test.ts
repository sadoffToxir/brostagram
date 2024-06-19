import { describe, it, expect } from 'vitest'
import BaseFileUploader from '../BaseFileUploader.vue'
import { renderWithVuetify, screen } from '@/tests/vueTestingLibrary/utils'

const componentName = BaseFileUploader.__name as string

describe(componentName, () => {
  const setup = (options?: Record<string, object>) => renderWithVuetify(BaseFileUploader, options)

  it('renders BaseFileUploader', () => {
    setup()

    const uploader = screen.getByTestId(`${componentName}`)
    expect(uploader).toBeVisible()
  })
})
