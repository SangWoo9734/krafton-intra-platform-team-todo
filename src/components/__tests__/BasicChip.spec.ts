import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasicChip from '../BasicChip.vue'

describe('BasicChip', () => {
  it('텍스트가 대문자로 렌더링된다', () => {
    const wrapper = mount(BasicChip, {
      props: {
        text: 'Test Chip',
      },
    })
    expect(wrapper.text()).toBe('TEST CHIP')
  })

  it('variant가 없으면 기본값(medium)이 적용된다', () => {
    const wrapper = mount(BasicChip, {
      props: {
        text: 'Test',
      },
    })
    expect(wrapper.classes()).toContain('bg-gray')
  })

  it('variant가 high일 때 빨간색이 적용된다', () => {
    const wrapper = mount(BasicChip, {
      props: {
        text: 'Test',
        variant: 'high',
      },
    })
    expect(wrapper.classes()).toContain('bg-red')
  })

  it('variant가 medium일 때 회색이 적용된다', () => {
    const wrapper = mount(BasicChip, {
      props: {
        text: 'Test',
        variant: 'medium',
      },
    })
    expect(wrapper.classes()).toContain('bg-gray')
  })

  it('variant가 low일 때 파란색이 적용된다', () => {
    const wrapper = mount(BasicChip, {
      props: {
        text: 'Test',
        variant: 'low',
      },
    })
    expect(wrapper.classes()).toContain('bg-blue')
  })

  it('class prop이 적용된다', () => {
    const wrapper = mount(BasicChip, {
      props: {
        text: 'Test',
        class: 'custom-class',
      },
    })
    expect(wrapper.classes()).toContain('custom-class')
  })
})
