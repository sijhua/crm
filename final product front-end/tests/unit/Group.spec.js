import { mount} from '@vue/test-utils'
import Vue from 'vue'
import element from 'element-ui'
import VueRouter from 'vue-router'
import Group from '../../src/views/Tem.vue'
Vue.use(element);
Vue.use(VueRouter);

describe('Group.vue', () => {
  it('renders the companent correctly', () => {
    const wrapper = mount(Group);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
