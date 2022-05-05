import { shallowMount, createLocalVue } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard.vue'
import Vue from 'vue';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

// in order to test successfully, the <el-input> is changed to <input>, so the style may have some difference
describe('test the input of event', () => {
    it('entering some input text of the subject', () => {
        const wrapper = shallowMount(Dashboard, {localVue})

        const input = wrapper.find('#subject-input');
        input.element.value = "Testing";
        input.trigger("input");
        expect(wrapper.vm.form.subject).toBe("Testing");
    })
});