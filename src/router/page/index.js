import Layout from '@/page/index';
// const _import = require('../_import');

export default [
  {
    path: '/login',
    name: '登录页',
    component: () => import('@/page/login/index'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/lock',
    name: '锁屏页',
    component: () => import('@/page/lock/index'),
  },
  {
    path: '/404',
    component: () => import('@/components/error-page/404'),
    name: '404',
  },
  {
    path: '/403',
    component: () => import('@/components/error-page/403'),
    name: '403',
  },
  {
    path: '/500',
    component: () => import('@/components/error-page/500'),
    name: '500',
  },
  {
    path: '/myiframe',
    component: Layout,
    // redirect: '/myiframe',
    children: [{
      path: ':routerPath',
      name: 'iframe',
      component: () => import('@/components/iframe/main'),
      props: true,
    }],
  },
  {
    path: '/',
    name: '主页',
    redirect: '/home',
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];
