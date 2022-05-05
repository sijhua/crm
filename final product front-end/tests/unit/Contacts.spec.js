import { shallowMount, createLocalVue } from '@vue/test-utils'
import Contact from '@/views/Contact.vue'
import Vue from 'vue';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('test search', () => {
    it('the initial value should be empty string', () => {
        const wrapper = shallowMount(Contact, {localVue})
        expect(wrapper.vm.search).toBe('')
    })
});