import { shallowMount, createLocalVue } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard.vue'
import Vue from 'vue';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);


describe('test the count after adding a event', () => {
    it('click the add event button, the count should be increased', () => {
        const wrapper = shallowMount(Dashboard, {localVue})

        expect(wrapper.vm.count).toBe(0)
        wrapper.find('#add-event').trigger('click')
        expect(wrapper.vm.count).toBe(1)
    })
});