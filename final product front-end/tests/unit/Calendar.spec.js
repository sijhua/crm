import { mount} from '@vue/test-utils'
import Vue from 'vue'
import element, { Calendar } from 'element-ui'
import VueRouter from 'vue-router'
import Calendar from '../../src/views/Tem.vue'
Vue.use(element);
Vue.use(VueRouter);

describe('Calendar.vue', () => {
  it('renders the companent correctly', () => {
    const wrapper = mount(Calendar);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
