import Layout from '@/page/index';
import adminRouter from './admin';

const extendRouter = [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () => import('@/page/home'),
    }],
  },
].concat(adminRouter);

export default extendRouter;
