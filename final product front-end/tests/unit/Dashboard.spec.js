import { shallowMount, createLocalVue } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard.vue'
import Vue from 'vue';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('test open add event dialog', () => {
    it('click the add event button, the dialog should be opened', () => {
        const wrapper = shallowMount(Dashboard, {localVue})

        expect(wrapper.vm.dialogFormVisible).toBe(false)
        wrapper.find('.addEvent-button').trigger('click')
        expect(wrapper.vm.dialogFormVisible).toBe(true)
    })
});