import { mount} from '@vue/test-utils'
import Vue from 'vue'
import element from 'element-ui'
import VueRouter from 'vue-router'
import Manager from '../../src/views/Tem.vue'
Vue.use(element);
Vue.use(VueRouter);

describe('Manager.vue', () => {
  it('renders the companent correctly', () => {
    const wrapper = mount(Manager);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
