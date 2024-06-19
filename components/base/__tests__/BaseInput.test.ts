import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from '../BaseInput.vue'

describe('BaseInput', () => {
  it('renders component with default props', () => {
    const wrapper = mount(BaseInput)

    const input = wrapper.find('input')

    expect(wrapper.isVisible()).toBeTruthy()
    expect(input.element.value).toBe('')
    expect(input.attributes('type')).toBe('text')
  })
})
