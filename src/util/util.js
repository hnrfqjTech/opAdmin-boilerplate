import {
  baseUrl,
} from '@/config/env';

function validatenullHandle(val) {
  if (typeof val === 'boolean') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;
}

/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = `${document.body.className} grayMode`;
  } else {
    document.body.className = document.body.className.replace(' grayMode', '');
  }
};

/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name;
};

/**
 * 获取字典
 */
export const setDic = (dicData, DIC) => ((typeof (dicData) === 'string') ? DIC : dicData);

/**
 * 设置px
 */
export const setPx = (val, defval) => {
  if (validatenullHandle(val)) {
    val = defval;
  }
  val = `${val}`;
  if (val.indexOf('%') == -1) {
    val = `${val}px`;
  }
  return val;
};

/**
 * 动态获取组件
 */
export const getComponent = (type) => {
  if (type == 'select') {
    return 'crudSelect';
  }
  if (type == 'radio') {
    return 'crudRadio';
  }
  if (type == 'checkbox') {
    return 'crudCheckbox';
  }
  if (type == 'date') {
    return 'crudDate';
  }
  return 'crudInput';
};

/**
 * 加密处理
 */
export const encryption = (params) => {
  let {
    data,
    type,
    param,
    key,
  } = params;
  const result = JSON.parse(JSON.stringify(data));
  if (type == 'Base64') {
    param.forEach((ele) => {
      result[ele] = btoa(result[ele]);
    });
  } else if (type == 'Aes') {
    // param.forEach(ele => {
    //     console.info('key>>>>>>>', ele, result[ ele ], key);
    //     result[ele] = CryptoJS.AES.encrypt(result[ele], key).toString();
    // })

    param.forEach((ele) => {
      const data = result[ele];
      key = CryptoJS.enc.Latin1.parse(key);
      const iv = key;
      // 加密
      const encrypted = CryptoJS.AES.encrypt(
        data,
        key, {
          iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.ZeroPadding,
        },
      );
      result[ele] = encrypted.toString();
    });
  }
  return result;
};

/**
 * 设置浏览器头部标题
 */
export const setTitle = function (title) {
  title = title ? `${title} — opAdmin-boilerplate` : 'opAdmin-boilerplate';
  window.document.title = title;
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};

/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback();
  }
  document.addEventListener('fullscreenchange', (e) => {
    listen();
  });
  document.addEventListener('mozfullscreenchange', (e) => {
    listen();
  });
  document.addEventListener('webkitfullscreenchange', (e) => {
    listen();
  });
  document.addEventListener('msfullscreenchange', (e) => {
    listen();
  });
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  const isFullscreen = document.fullscreenEnabled ||
    window.fullScreen ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen;
  return isFullscreen;
};

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};

/**
 * 递归寻找子类的父类
 */
export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i];
        }
        if (menu[i].children[j].children.length != 0) {
          return findParent(menu[i].children[j].children, id);
        }
      }
    }
  }
};

/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {
  let reqUrl = url;
  if (url.indexOf('http') != -1 || url.indexOf('https') != -1) {
    reqUrl = `/myiframe/urlPath?src=${reqUrl}&name=${name}`;
  } else {
    reqUrl = `${reqUrl}`;
  }
  return reqUrl;
};

/**
 * 总体路由设置器
 */
export const setUrlPath = ($route) => {
  let value = '';
  if ($route.query.src) {
    value = $route.query.src;
  } else {
    value = $route.path;
  }
  return value;
};

/**
 * 动态插入css
 */
export const loadStyle = (url) => {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
};

/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = '';
  if (validatenullHandle(dic)) return value;
  if (typeof (value) === 'string' || typeof (value) === 'number' || typeof (value) === 'boolean') {
    let index = 0;
    index = findArray(dic, value);
    if (index != -1) {
      result = dic[index].label;
    } else {
      result = value;
    }
  } else if (value instanceof Array) {
    result = [];
    let index = 0;
    value.forEach((ele) => {
      index = findArray(dic, ele);
      if (index != -1) {
        result.push(dic[index].label);
      } else {
        result.push(value);
      }
    });
    result = result.toString();
  }
  return result;
};

/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i;
      break;
    }
  }
  return -1;
};

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = '';
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4);
  if (date) random += Date.now();
  return random;
};


/**
 * 判断是否为空
 */
export const validatenull = validatenullHandle;

export function isvalidUsername(str) {
  const valid_map = [ 'admin', 'editor' ];
  return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile(phone) {
  const list = [];
  let result = true;
  let msg = '';
  const isPhone = /^0\d{2,3}-?\d{7,8}$/;
  // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  const isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/;
  if (!validatenull(phone)) {
    if (phone.length == 11) {
      if (isPhone.test(phone)) {
        msg = '手机号码格式不正确';
      } else {
        result = false;
      }
    } else {
      msg = '手机号码长度不为11位';
    }
  } else {
    msg = '手机号码不能为空';
  }
  list.push(result);
  list.push(msg);
  return list;
}
