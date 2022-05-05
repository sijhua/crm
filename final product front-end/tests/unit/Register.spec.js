import { shallowMount, createLocalVue } from '@vue/test-utils'
import Register from '@/views/Register.vue'
import Vue from 'vue';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('test register', () => {
    it('the initial value should be empty string', () => {
        const wrapper = shallowMount(Register, {localVue})
        expect(wrapper.vm.signForm.email).toBe('')
        expect(wrapper.vm.signForm.firstName).toBe('')
        expect(wrapper.vm.signForm.lastName).toBe('')
        expect(wrapper.vm.signForm.password).toBe('')
    })
});
