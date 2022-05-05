import { mount } from '@vue/test-utils'
import DashBoard from '../../src/views/Dashboard.vue'

describe('Dashboard.vue', () => {
  it('renders the companent correctly', () => {
    const wrapper = mount(DashBoard);
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
