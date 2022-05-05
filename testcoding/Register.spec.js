import { mount} from '@vue/test-utils'
import Vue from 'vue'
import element from 'element-ui'
import VueRouter from 'vue-router'
import Register from '../../src/views/Tem.vue'
Vue.use(element);
Vue.use(VueRouter);

describe('Register.vue', () => {
  it('renders the companent correctly', () => {
    const wrapper = mount(Register);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
