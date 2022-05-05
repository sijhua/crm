import Vue from 'vue'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "../../src/api/index";
jest.mock('axios')
export default Vue => {
    element(Vue);
    Vue.prototype.$path = API
    Vue.prototype.$axios = axios
}