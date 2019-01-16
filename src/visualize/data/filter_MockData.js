export default [
  {
    key: 'condition',
    placeholder: '请输入查询条件',
  },
  {
    type: 'radio',
    key: 'city',
    options: [
      {
        label: '上海',
      },
      {
        label: '深圳',
      },
    ],
  },
  {
    type: 'select',
    key: 'goods',
    placeholder: '请选择商品',
    options: [
      {
        value: '选项1',
        label: '黄金糕',
      },
      {
        value: '选项2',
        label: '双皮奶',
      },
    ],
  },
  {
    type: 'date-picker',
    keys: ['startDate', 'endDate'],
  },
  {
    type: 'date',
    key: 'dateTime',
  },
];
