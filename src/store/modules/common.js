import {
  setStore,
  getStore,
  removeStore,
} from '@/util/store';
import {
  baseUrl,
} from '@/config/env';
import website from '@/const/website';

const common = {

  state: {
    isCollapse: false,
    isFullScren: false,
    isLock: getStore({
      name: 'isLock',
    }) || false,
    theme: getStore({
      name: 'theme',
    }) || '#409EFF',
    themeName: getStore({
      name: 'themeName',
    }) || '',
    lockPasswd: getStore({
      name: 'lockPasswd',
    }) || '',
    website,
    indexRequestStatus: true,
  },
  actions: {
    changeIndexRequestStatus({
      commit,
      state,
    }, status) {
      commit('INDEX_REQUEST_STATUS', status);
    },
  },
  mutations: {
    SET_COLLAPSE: (state, action) => {
      state.isCollapse = !state.isCollapse;
    },
    SET_FULLSCREN: (state, action) => {
      state.isFullScren = !state.isFullScren;
    },
    SET_LOCK: (state, action) => {
      state.isLock = true;
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session',
      });
    },
    SET_THEME: (state, color) => {
      state.theme = color;
      setStore({
        name: 'theme',
        content: state.theme,
      });
    },
    SET_THEME_NAME: (state, themeName) => {
      state.themeName = themeName;
      setStore({
        name: 'themeName',
        content: state.themeName,
      });
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd;
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session',
      });
    },
    CLEAR_LOCK: (state, action) => {
      state.isLock = false;
      state.lockPasswd = '';
      removeStore({
        name: 'lockPasswd',
      });
      removeStore({
        name: 'isLock',
      });
    },
    INDEX_REQUEST_STATUS: (state, status) => {
      state.indexRequestStatus = status;
    },
  },
};
export default common;
