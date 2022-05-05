import { mount } from '@vue/test-utils'
import Manager from '../../src/views/Manager.vue'

describe('Manager.vue', () => {
  it('renders the companent correctly', () => {
    const wrapper = mount(Manager);
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
