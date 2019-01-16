import NProgress from 'nprogress'; // progress bar
import router from './router/router';
import store from './store';
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({
  showSpinner: false,
});

function ADD_BREADCRUMB_HANDLE(from, to) {
  const firstCrumbList = {
    path: '/',
    name: '首页',
  };
  let secondCrumbList = {};
  if (to.path.search('/mgEnterpriseManage') !== -1) {
    secondCrumbList = {
      path: '/mgEnterpriseManage',
      name: '企业管理',
    };
  }
  const tempCrumbList = [];
  tempCrumbList.push(firstCrumbList);
  tempCrumbList.push(secondCrumbList);

  let tempBreadcrumbList = to.meta.preCrumb !== undefined ? [
    ...tempCrumbList,
    {
      path: to.meta.preCrumb.path,
      name: to.meta.preCrumb.name,
    },
    {
      name: to.name,
    },
  ] : [
    ...tempCrumbList,
    {
      name: to.name,
    },
  ];
  if (['/', '/home/index'].includes(to.path)) {
    tempBreadcrumbList = [];
  }
  store.commit('ADD_BREADCRUMB', tempBreadcrumbList);
}

let flag;
router.beforeEach((to, from, next) => {
  NProgress.start();

  flag = true;
  const {
    whiteList,
  } = store.getters.website;
  for (let i = 0; i < whiteList.length; i++) {
    if (new RegExp(`^${whiteList[i].toString()}.*`, 'g').test(to.path)) {
      flag = false;
      break;
    }
  }
  if (flag) {
    store.commit('ADD_TAG', {
      label: to.name,
      value: to.path,
      query: to.query,
    });

    ADD_BREADCRUMB_HANDLE(from, to);
  }

  next();
});
router.afterEach(() => {
  NProgress.done();
});
