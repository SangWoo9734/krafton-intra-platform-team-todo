import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasicButton from '@/components/common/BasicButton.vue'

describe('BasicButton', () => {
  it('슬롯 내용이 렌더링된다', () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: '클릭',
      },
    })
    expect(wrapper.text()).toBe('클릭')
  })

  it('클릭 시 이벤트가 발생한다', async () => {
    const wrapper = mount(BasicButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('disabled 속성이 적용된다', () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('disabled 상태에서는 클릭 이벤트가 발생하지 않는다', async () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true,
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('type 속성이 올바르게 적용된다', () => {
    const wrapper = mount(BasicButton, {
      props: {
        type: 'submit',
      },
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('fullsize prop이 적용된다', () => {
    const wrapper = mount(BasicButton, {
      props: {
        fullsize: true,
      },
    })
    expect(wrapper.classes()).toContain('fullsize')
  })

  it('기본값은 fullsize가 아니다', () => {
    const wrapper = mount(BasicButton)
    expect(wrapper.classes()).not.toContain('fullsize')
  })

  it('class prop이 적용된다', () => {
    const wrapper = mount(BasicButton, {
      props: {
        class: 'custom-class',
      },
    })
    expect(wrapper.classes()).toContain('custom-class')
  })
})
