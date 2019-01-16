import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { baseUrl, cas, unLoading } from '@/config/env';
import store from '@/store';
import { Notification } from 'element-ui';

const httpFailHandle = (msg) => {
  Notification.error({
    title: '错误',
    message: msg,
  });

  // if (code === 401) {
  //   store.dispatch("LogOut").then(() => {
  //     router.push({ path: "/login" });
  //   });
  // }
};
const httpErrorHandle = (msg) => {
  Notification.error({
    title: '错误',
    message: msg,
  });

  // store.dispatch("LogOut").then(() => {
  //   router.push({ path: "/login" });
  // });
};

axios.defaults.timeout = 20000;
// axios.defaults.withCredentials = true; // 跨域允许带凭证
// axios.defaults.headers[ 'Authorization' ] = _CONST.AUTH_TOKEN;
// axios.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded';

const $http = axios.create({
  baseURL: baseUrl,
});
// $http.defaults.headers.common[ 'Authorization' ] = AUTH_TOKEN;

$http.interceptors.request.use((config) => {
  if (!unLoading.includes(config.url)) {
    store.dispatch('changeIndexRequestStatus', true);
  }
  // if (getStore({ name: 'token' })) {
  //   config.headers = _.merge(config.headers, {
  //     'Authorization': 'Bearer ' + getStore({ name: 'token' })
  //   });
  // }
  return config;
}, (error) => {
  store.dispatch('changeIndexRequestStatus', false);
  return Promise.reject(error);
});

$http.interceptors.response.use((response) => {
  const resCode = (response.data && response.data.code) || 0;
  const resMsg = (response.data && response.data.msg) || '服务异常';
  if (resCode >= 400) {
    if (resCode === 403) {
      window.location.href = `${cas.loginUrl}?service=${cas.home}/cas?client_name=CasClient`;
    } else {
      store.dispatch('changeIndexRequestStatus', false);
      httpFailHandle(resMsg, resCode);
    }
  } else {
    if (resCode === 1) {
      httpFailHandle(resMsg, resCode);
    }
    store.dispatch('changeIndexRequestStatus', false);
  }
  return response.data;
}, (error) => {
  const resCode = (error.response && error.response.status) || 0;
  // const resMsg = (error.response && error.response.data) || '服务异常';
  if (resCode >= 400) {
    httpErrorHandle('服务异常', resCode);
  }
  store.dispatch('changeIndexRequestStatus', false);
  return Promise.reject(error);
});
Vue.use(VueAxios, $http);

export default $http;
