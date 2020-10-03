import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import moment from "moment";
require('moment/locale/ru');
moment.locale('ru');
Vue.prototype.moment = moment;

Vue.config.productionTip = false;

Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
