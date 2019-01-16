import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router/router';
import store from '@/store';
import '@/bootstrap/index';
import './permission';
import { loadStyle } from '@/util/util';
import * as urls from '@/config/env';

Object.keys(urls).forEach((key) => {
  Vue.prototype[key] = urls[key];
});
urls.iconfontVersion.forEach((ele) => {
  loadStyle(urls.iconfontUrl.replace('$key', ele));
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
