import { validatePhone, validateEmail, validateIdCard, validateNumber, validateInt } from '@hnrfqj/hm-helper/form';

export default {
  labelWidth: 140,
  params: [
    [
      {
        type: 'input',
        name: 'name',
        label: '企业名称',
        disabled: false,
        require: true,
        placeholder: '请输入企业名称',
      },
      {
        type: 'input',
        name: 'taxCode',
        label: '企业纳税识别号',
        disabled: false,
        require: true,
        placeholder: '请输入企业纳税识别号',
      },
      {
        type: 'input',
        name: 'address',
        label: '企业地址',
        disabled: false,
        require: true,
        placeholder: '请输入企业地址',
      },
      {
        type: 'input',
        name: 'email',
        label: '企业邮箱',
        disabled: false,
        require: false,
        placeholder: '请输入企业邮箱',
      },
      {
        type: 'input',
        name: 'contactName',
        label: '联系人姓名',
        disabled: false,
        require: true,
        placeholder: '请输入联系人姓名',
      },
      {
        type: 'input',
        name: 'contactPhone',
        label: '联系人手机号',
        disabled: false,
        require: true,
        placeholder: '请输入联系人手机号',
      },
      {
        type: 'input',
        name: 'legalPersonName',
        label: '法人姓名',
        disabled: false,
        require: true,
        placeholder: '请输入法人姓名',
      },
      {
        type: 'input',
        name: 'legalPersonPhone',
        label: '法人手机号',
        disabled: false,
        require: true,
        placeholder: '请输入法人手机号',
      },
      {
        type: 'input',
        name: 'legalPersonCertNo',
        label: '法人身份证号码',
        disabled: false,
        require: true,
        placeholder: '请输入法人身份证号码',
      },
    ],
    [
      {
        type: 'select',
        name: 'taxOrgName',
        label: '税局名称',
        disabled: false,
        require: true,
        placeholder: '请选择税局名称',
        options: [],
      },
      {
        type: 'input',
        name: 'taxOrgCode',
        label: '税局编码',
        disabled: true,
        require: true,
        placeholder: '请输入税局编码',
        // options: [],
      },
      {
        type: 'input',
        name: 'taxAreaName',
        label: '地区名称',
        disabled: false,
        require: true,
        placeholder: '请输入地区名称',
      },
      {
        type: 'input',
        name: 'taxAreaCode',
        label: '地区编码',
        disabled: false,
        require: true,
        placeholder: '请输入地区编码',
      },
    ],
    {
      custom: 'add',
      list: [
        [
          {
            type: 'input',
            name: 'deviceNo',
            label: '盒子机器编号',
            disabled: false,
            require: true,
            placeholder: '请输入盒子机器编号',
          },
          {
            type: 'input',
            name: 'price',
            label: '销售价格',
            disabled: false,
            require: true,
            placeholder: '请输入销售价格',
          },
          {
            type: 'input',
            name: 'deviceCode',
            label: '税控盘机器编号',
            disabled: false,
            require: true,
            placeholder: '请输入税控盘机器编号',
          },
          {
            type: 'input',
            name: 'extNo',
            label: '分机号',
            disabled: false,
            require: true,
            placeholder: '请输入分机号',
            append: '按企业从0开始往后排',
          },
          {
            type: 'input',
            name: 'grantExpiryDays',
            label: '服务时长',
            disabled: false,
            require: true,
            placeholder: '请输入服务时长',
            append: '天',
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
  titles: ['企业基础信息', '税务信息', '盒子登记'],
  validates: {
    contactPhone: {
      validator: validatePhone,
      message: '手机号码格式错误',
    },
    legalPersonPhone: {
      validator: validatePhone,
      message: '手机号码格式错误',
    },
    email: {
      validator: validateEmail,
      message: '邮箱格式错误',
    },
    legalPersonCertNo: {
      validator: validateIdCard,
      message: '身份证格式错误',
    },
    price: {
      validator: validateNumber,
      message: '销售价格金额格式错误',
    },
    grantExpiryDays: {
      validator: validateInt,
      message: '服务时长天数格式错误',
    },
  },
};
