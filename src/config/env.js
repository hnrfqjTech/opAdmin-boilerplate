/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 老项目域名地址
 * khglUrl: 客户管理域名地址
 * dicUrl : 字典服务器地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 */

let baseUrl = '';
let cas;
const iconfontVersion = [ '929856_j8itze96m9o' ];
const iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
const { NODE_ENV, VUE_APP_C } = process.env;
const CLIENT_ENV = VUE_APP_C || NODE_ENV;
console.info(VUE_APP_C, NODE_ENV, CLIENT_ENV, process.env);

if (CLIENT_ENV === 'development') {
  // 开发
  baseUrl = '/admin';
  cas = {
    loginUrl: 'https://cloud-cas.majunwei.com:8443/cas/login',
    home: 'http://fp.dev.hnrfqj.com:8888',
  };
} else if (CLIENT_ENV === 'test') {
  // 测试
  baseUrl = '/admin';
  cas = {
    loginUrl: 'https://cas.test.hnrfqj.com/cas',
    home: 'https://fp.test.hnrfqj.com',
  };
} else {
  // 生产
  baseUrl = '/admin';
  cas = {
    loginUrl: 'https://cas.hnrfqj.com/cas',
    home: 'https://fp.hnrfqj.com',
  };
}
const codeUrl = `${baseUrl}/captcha.jpg`;

const unLoading = [
  '/msg/pullPoolMsg?__notUpdateSession=true',
  '/msg/pullPoolMsg',
];

export {
  baseUrl,
  codeUrl,
  iconfontUrl,
  iconfontVersion,
  cas,
  unLoading,
};
