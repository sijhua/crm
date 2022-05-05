import { mount} from '@vue/test-utils'
import Vue from 'vue'
import element from 'element-ui'
import VueRouter from 'vue-router'
import Contact from '../../src/views/Tem.vue'
Vue.use(element);
Vue.use(VueRouter);

describe('Contact.vue', () => {
  it('renders the companent correctly', () => {
    const wrapper = mount(Contact);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
