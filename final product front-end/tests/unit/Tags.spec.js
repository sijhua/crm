import { mount} from '@vue/test-utils'
import Vue from 'vue'
import element from 'element-ui'
import VueRouter from 'vue-router'
import Tags from '../../src/views/Tem.vue'
Vue.use(element);
Vue.use(VueRouter);

describe('Tags.vue', () => {
  it('renders the companent correctly', () => {
    const wrapper = mount(Tags);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
