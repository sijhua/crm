import { mount} from '@vue/test-utils'
import Vue from 'vue'
import element from 'element-ui'
import VueRouter from 'vue-router'
import Information from '../../src/views/Tem.vue'
Vue.use(element);
Vue.use(VueRouter);

describe('Information.vue', () => {
  it('renders the companent correctly', () => {
    const wrapper = mount(Information);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
