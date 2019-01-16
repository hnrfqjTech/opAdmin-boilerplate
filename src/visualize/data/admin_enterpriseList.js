export default {
  filter: [
    {
      key: 'name',
      placeholder: '企业名称',
    },
    {
      key: 'taxCode',
      placeholder: '企业税号',
    },
    {
      key: 'taxAreaName',
      placeholder: '地区名称',
    },
    {
      key: 'taxOrgName',
      placeholder: '税局名称',
    },
    {
      key: 'deviceNo',
      placeholder: '盒子编码',
    },
    {
      key: 'deviceCode',
      placeholder: '税控盘编码',
    },
  ],
  list: {
    api: '/service/companyinfo/adminPage',
    method: 'POST',
    params: {
      status: 1000,
    },
  },
};
