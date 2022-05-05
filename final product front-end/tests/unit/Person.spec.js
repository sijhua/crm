import { mount} from '@vue/test-utils'
import Vue from 'vue'
import element from 'element-ui'
import VueRouter from 'vue-router'
import Person from '../../src/views/Tem.vue'
Vue.use(element);
Vue.use(VueRouter);

describe('Person.vue', () => {
  it('renders the companent correctly', () => {
    const wrapper = mount(Person);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
