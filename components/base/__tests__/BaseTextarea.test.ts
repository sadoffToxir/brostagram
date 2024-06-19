import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTextarea from '../BaseTextarea.vue'

// autogrow of vuetify uses this and it's needed
class ResizeObserver {
  observe () {}
  unobserve () {}
  disconnect () {}
}

describe('BaseTextarea', () => {
  window.ResizeObserver = ResizeObserver
  it('renders component with default props', () => {
    const wrapper = mount(BaseTextarea, {
      modelValue: ''
    })

    expect(wrapper.isVisible()).toBeTruthy()
  })

  it('renders component with custom props', () => {
    const autogrowClasses = ['v-textarea--auto-grow', 'v-textarea--no-resize']
    const props = {
      modelValue: 'test value',
      label: 'lableline',
      disabled: true,
      hint: 'test hint',
      tabindex: '1',
      styleClass: 'test-class',
      autoGrow: true,
      rows: '5'
    }

    const wrapper = mount(BaseTextarea, { props })

    const textarea = wrapper.find('textarea')

    expect(textarea.element.value).toEqual(props.modelValue) // checking if value is equal to props value
    expect(textarea.attributes('tabindex')).toEqual(props.tabindex)// checking tabindex
    expect(textarea.attributes('rows')).toEqual(props.rows)// checking rows
    expect(textarea.attributes('disabled')).toBe('') // checking if disabled
    expect(wrapper.find('label').text()).toEqual(props.label) // checking label
    expect(wrapper.find('.v-messages__message').text()).toEqual(props.hint) // checking hint
    expect(wrapper.classes()).toContain(props.styleClass) // checking classes
    // checking if autogrow was applied
    expect(wrapper.classes()).toContain(autogrowClasses[0])
    expect(wrapper.classes()).toContain(autogrowClasses[1])
  })

  it('renders component with error message', () => {
    const errorClass = 'v-input--error'
    const props = {
      error: true,
      'error-messages': 'test error messages',
      hint: 'some hint'
    }

    const wrapper = mount(BaseTextarea, { props })

    expect(wrapper.classes()).toContain(errorClass) // checking error classes
    expect(wrapper.find('.v-messages__message').text()).toEqual(props['error-messages']) // checking error message
  })

  it('handles change and clear', async () => {
    const inputValue = 'inputting value'
    const clearIconAriaLabel = 'Clear '
    const clearIconClass = 'mdi-close-circle'
    const props = {
      placeholder: 'test placeholder',
      clearable: true
    }

    const wrapper = mount(BaseTextarea, { props })

    const textarea = wrapper.find('textarea')
    const clearIcon = wrapper.find('[role="button"]')

    expect(textarea.attributes('placeholder')).toEqual(props.placeholder) // checking placeholder

    await textarea.setValue(inputValue) // typing text into textarea

    expect(textarea.element.value).toBe(inputValue) // checking value
    // checking icon
    expect(clearIcon.attributes('aria-label')).toBe(clearIconAriaLabel)
    expect(clearIcon.classes()).toContain(clearIconClass)

    await clearIcon.trigger('click') // clicking on clear icon

    expect(textarea.element.value).toBe('') // check if textarea was cleared
  })
})
