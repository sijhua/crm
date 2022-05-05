import { mount} from '@vue/test-utils'
import Vue from 'vue'
import element from 'element-ui'
import VueRouter from 'vue-router'
import GroupDetail from '../../src/views/Tem.vue'
Vue.use(element);
Vue.use(VueRouter);

describe('GroupDetail.vue', () => {
  it('renders the companent correctly', () => {
    const wrapper = mount(GroupDetail);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
