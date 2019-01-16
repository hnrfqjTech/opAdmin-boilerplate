import {
  tableData,
} from '@/mock/user';
import {
  menu,
} from '@/mock/menu';
import $http from '@/bootstrap/loadhttp';

export const loginByUsername = (username, password, code) => {
  // const grant_type = 'password';
  // const scope = 'server';
  const captcha = code;
  return $http.request({
    url: '/sys/login',
    method: 'post',
    params: {
      username,
      password,
      captcha,
    },
  });
};

export const getUserInfo = () => $http.request({
  url: 'sys/user/info',
  method: 'get',
});
export const RefeshToken = () => new Promise((resolve) => {
  resolve({
    data: new Date().getTime(),
  });
});

export const getMenu = parentId => new Promise((resolve) => {
  if (parentId !== 1) parentId = 0;
  resolve({
    data: menu[parentId],
  });
});
export const getMenuAll = () => $http.request({
  url: '/sys/menu/user',
  method: 'get',
});
export const getMessage = () => $http.request({
  url: '/msg/pullPoolMsg?__notUpdateSession=true',
  method: 'get',
});

export const getTableData = () => new Promise((resolve) => {
  resolve({
    data: tableData,
  });
});
export const logout = () => new Promise((resolve) => {
  resolve();
});
