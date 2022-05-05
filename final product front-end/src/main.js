import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from "element-ui/lib/locale/lang/en";
import axios from "./api/index";
Vue.prototype.$axios = axios;
import path from "./api/path.js";
Vue.prototype.$path = path;
Vue.config.productionTip = false
import 'vue-event-calendar/dist/style.css' 
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'en'}) 
Vue.use(ElementUI,{locale})
import moment from 'moment';
Vue.prototype.$moment = moment;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
