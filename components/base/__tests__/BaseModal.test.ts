import { describe, it, expect } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import BaseModal from '../BaseModal.vue'
import { renderWithVuetify, screen } from '@/tests/vueTestingLibrary/utils'

const componentName = BaseModal.__name as string

describe(componentName, () => {
  const setup = (options: any) => renderWithVuetify(BaseModal, { ...options })
  const setupWithUserEvent = (options?: Record<string, object>) => ({
    user: userEvent.setup(),
    ...setup(options)
  })

  it('test rendering of dialog', () => {
    setup({ props: { isOpen: false } })

    const hiddenDialog = screen.queryByTestId(componentName)

    expect(hiddenDialog).not.toBeInTheDocument()

    setup({ props: { isOpen: true } })

    const visibleDialog = screen.getByTestId(componentName)
    expect(visibleDialog).toBeVisible()
  })

  it('test custom props', async () => {
    const props = {
      toggleFullScreen: true,
      showCancelBtn: true,
      showSaveBtn: true,
      isOpen: true
    }

    const { user } = setupWithUserEvent({ props })

    const dialog = screen.queryByTestId(componentName)
    const toggleFullScreen = screen.getByTestId(`${componentName}-toggleFullScreen`)
    const cancelButton = screen.queryByTestId(`${componentName}-action-cancel`)
    const saveButton = screen.queryByTestId(`${componentName}-action-save`)

    await user.click(toggleFullScreen)
    expect(dialog).toHaveClass('v-dialog--fullscreen')

    await user.click(toggleFullScreen)
    expect(dialog).not.toHaveClass('v-dialog--fullscreen')

    expect(cancelButton).toBeVisible()
    expect(saveButton).toBeVisible()
  })

  it('test show save and cancel button', () => {
    const props = {
      showCancelBtn: false,
      showSaveBtn: false,
      isOpen: true
    }

    setup({ props })

    const cancelButton = screen.queryByTestId(`${componentName}-action-cancel`)
    const saveButton = screen.queryByTestId(`${componentName}-action-save`)

    expect(cancelButton).not.toBeInTheDocument()
    expect(saveButton).not.toBeInTheDocument()
  })

  it('test custom slots', () => {
    const slotProps = {
      title: 'title',
      subtitle: 'subtitle',
      default: 'default',
      'prepend-error-message': 'prepend-error-message',
      'action-cancel': 'action-cancel',
      'action-save': 'action-save'
    }
    const props = { isOpen: true }
    const slots = {
      title: `<div>${slotProps.title}</div>`,
      subtitle: `<div>${slotProps.subtitle}</div>`,
      default: `<div>${slotProps.default}</div>`,
      'prepend-error-message': `<div>${slotProps['prepend-error-message']}</div>`,
      'action-cancel': `<div>${slotProps['action-cancel']}</div>`,
      'action-save': `<div>${slotProps['action-save']}</div>`
    }

    setup({ props, slots })

    const title = screen.getByText(slotProps.title)
    const subtitle = screen.getByText(slotProps.subtitle)
    const def = screen.getByText(slotProps.default)
    const errorMsg = screen.getByText(slotProps['prepend-error-message'])
    const cancel = screen.getByText(slotProps['action-cancel'])
    const save = screen.getByText(slotProps['action-save'])

    expect(title).toHaveTextContent(slotProps.title)
    expect(subtitle).toHaveTextContent(slotProps.subtitle)
    expect(def).toHaveTextContent(slotProps.default)
    expect(errorMsg).toHaveTextContent(slotProps['prepend-error-message'])
    expect(cancel).toHaveTextContent(slotProps['action-cancel'])
    expect(save).toHaveTextContent(slotProps['action-save'])
  })

  it('test events', async () => {
    const { emitted, user } = setupWithUserEvent({ props: { isOpen: true } })

    const save = screen.getByTestId(`${componentName}-action-save`)
    const cancel = screen.getByTestId(`${componentName}-action-cancel`)

    await user.click(save)
    await user.click(cancel)

    expect(emitted('save')).toBeTruthy()
    expect(emitted('cancel')).toBeTruthy()
  })
})
