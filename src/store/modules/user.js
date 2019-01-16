import {
  setStore,
  getStore,
  removeStore,
} from '@/util/store';
import {
  encryption,
  validatenull
} from '@/util/util';
import {
  loginByUsername,
  getUserInfo,
  getTableData,
  getMenu,
  logout,
  getMenuAll,
  RefeshToken,
  getMessage,
} from '@/api/user';
import $http from '@/bootstrap/loadhttp';
import remove from 'lodash/remove';
import cloneDeep from 'lodash/cloneDeep';

const user = {
  state: {
    userInfo: {},
    permission: {},
    roles: [],
    menu: [],
    menuAll: [],
    messageLength: '',
    token: getStore({
      name: 'token',
    }) || '',
    currentCompany: '',
  },
  actions: {
    changeCurrentCompany({
      commit,
      state,
      dispatch,
    }, currentCompany) {
      commit('SET_CURRENT_COMPANY', currentCompany);
    },
    // 根据用户名登录
    LoginByUsername({
      commit,
      state,
      dispatch,
    }, userInfo) {
      const user = encryption({
        data: userInfo,
        type: 'Aes',
        key: '1234567887654321',
        param: [],
      });
      return new Promise((resolve, reject) => {
        loginByUsername(user.username, user.password, userInfo.code, userInfo.redomStr).then((res) => {
          let resp = {};
          if (res.code === 0) {
            resp = res;
            const data = res.msg;
            commit('SET_TOKEN', data);
            commit('DEL_ALL_TAG');
            commit('CLEAR_LOCK');
            // setToken(data);
          } else {
            resp.code = res.code || 10000;
            resp.msg = res.msg || '';
          }
          resolve(resp);
        });
      });
    },
    // 根据手机号登录
    LoginByPhone({
      commit,
      state,
      dispatch,
    }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.phone, userInfo.code).then((res) => {
          const data = res.data;
          commit('SET_TOKEN', data);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          // setToken(data);
          resolve();
        });
      });
    },
    GetTableData({
      commit,
      state,
      dispatch,
    }, page) {
      return new Promise((resolve, reject) => {
        getTableData(page).then((res) => {
          const data = res.data;
          resolve(data);
        });
      });
    },
    GetUserInfo({
      commit,
      state,
      dispatch,
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          const data = {
            userInfo: res.data,
            roles: res.data.roles,
            permissions: [],
          };
          commit('SET_USERIFNO', data.userInfo);
          commit('SET_ROLES', data.roles);
          commit('SET_PERMISSION', data.permissions);
          resolve(data);
        });
      });
    },
    // 刷新token
    RefeshToken({
      commit,
      state,
    }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', data);
          // setToken(data);
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },
    // 登出（目前版本：统一登录，登录态存储在 cookie 中）
    LogOut({
      commit,
      state,
    }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        commit('DEL_ALL_TAG');
        commit('CLEAR_LOCK');
        // removeToken();
        resolve();
      });
    },
    // 注销session
    FedLogOut({
      commit,
    }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        commit('DEL_ALL_TAG');
        commit('CLEAR_LOCK');
        // removeToken();
        resolve();
      });
    },
    // 获取系统菜单
    GetMenu({
      commit,
    }, parentId) {
      parentId;
      return new Promise((resolve) => {
        getMenu(parentId).then((res) => {
          const data = res.data;
          commit('SET_MENU', data);
          resolve(data);
        });
      });
    },
    // 获取全部菜单
    GetMenuAll({
      commit,
    }) {
      return new Promise((resolve) => {
        getMenuAll().then((res) => {
          const data = res.data;
          commit('SET_MENU_ALL', data);

          // 根据全部菜单（包含按钮元素等权限）拿到左边栏菜单；
          const temp = cloneDeep(data);
          const getMenu = (allMenu) => {
            allMenu.forEach((item) => {
              if (item.type === 2) {
                remove(allMenu, item => item.type === 2);
              } else if (item.subMenus) {
                getMenu(item.subMenus);
              }
            });
            return allMenu;
          };
          const menu = getMenu(temp);
          commit('SET_MENU', menu);

          resolve(data);
        });
      });
    },
    GetMessage({
      commit,
    }) {
      getMessage().then(

        (data) => {
          let messageLength = '';
          if (data.data == 0) {

          } else if (typeof data.data === 'number') {
            messageLength = data.data;
          }
          commit('SET_MESSAGE', messageLength);
        },
      );
    },

  },
  mutations: {
    SET_CURRENT_COMPANY: (state, currentCompany) => {
      state.currentCompany = currentCompany;
      setStore({
        name: 'currentCompany',
        content: state.currentCompany,
      });
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
      setStore({
        name: 'token',
        content: state.token,
      });
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_MENU: (state, menu) => {
      const list = menu.filter((ele) => {
        if (validatenull(ele.meta)) return true;
        if (validatenull(ele.meta.roles)) return true;
        if (ele.meta.roles.indexOf(state.roles[0]) != -1) {
          return true;
        }
        return false;
      });
      state.menu = list;
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = {};
      permission.forEach((ele) => {
        state.permission[ele] = true;
      });
    },
    SET_MESSAGE: (state, messageLength) => {
      state.messageLength = messageLength;
    },
  },

};
export default user;
