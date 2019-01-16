import { validatePhone, validateEmail } from '@hnrfqj/hm-helper/form';

export default {
  labelWidth: 140,
  params: [
    [
      {
        type: 'select',
        name: 'fenpei',
        label: '分配类型',
        disabled: false,
        require: true,
        placeholder: '请选择分配类型',
        options: [ {
          value: 1,
          label: '已分配',
        }, {
          value: 2,
          label: '未分配',
        } ],
      },
      {
        type: 'radio',
        name: 'sex',
        label: '性别',
        disabled: false,
        require: true,
        options: [
          {
            label: '男',
            value: 1,
          },
          {
            label: '女',
            value: 2,
          },
        ],
      },
    ],
    [
      {
        type: 'date-picker',
        name: 'date',
        label: '日期',
        disabled: false,
        require: false,
      },
      {
        type: 'input',
        name: 'name',
        label: '纳税识别号',
        disabled: false,
        require: false,
        placeholder: '企业名称查询',
      },
    ],
    {
      custom: 'add',
      list: [
        [
          {
            type: 'input',
            name: 'name',
            label: '客户名称客户名称',
            disabled: false,
            require: true,
            placeholder: '请输入客户姓名',
          },
          {
            type: 'input',
            name: 'taxCode',
            label: '纳税识别号',
            disabled: false,
            require: false,
            placeholder: '请输入纳税识别号',
          },
        ],
      ],
    },
  ],
  custom: {
    add: {
      key: 'devices',
    },
  },
  titles: ['标题1', '标题2', '标题3'],
  validates: {
    mobile: {
      validator: validatePhone,
      message: '客户手机号码格式错误',
    },
    email: {
      validator: validateEmail,
      message: '客户邮箱格式错误',
    },
  },
};
