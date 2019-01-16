import Layout from '@/page/index';

export default [
  {
    path: '/mgEnterpriseManage',
    component: Layout,
    redirect: '/mgEnterpriseManage/enterpriseList',
    children: [
      {
        path: 'enterpriseList',
        name: '企业列表',
        component: () => import('@/views/mgEnterpriseManage/enterpriseList/index'),
      },
      {
        path: 'enterpriseEdit',
        name: '企业信息录入',
        component: () => import('@/views/mgEnterpriseManage/enterpriseList/edit'),
        meta: {
          preCrumb: {
            path: '/mgEnterpriseManage/enterpriseList',
            name: '企业列表',
          },
        },
      },
    ],
  },
];
