import Vue from 'vue';
import VueRouter from 'vue-router';
import PageRouter from './page';
import ViewsRouter from './views';

Vue.use(VueRouter);

export const asyncRouterMap = [].concat(PageRouter, ViewsRouter);
export default new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (from.meta.keepAlive) {
      from.meta.savedPosition = document.body.scrollTop;
    }
    return {
      x: 0,
      y: to.meta.savedPosition || 0,
    };
  },
  base: process.env.BASE_URL,
  routes: asyncRouterMap,
});
