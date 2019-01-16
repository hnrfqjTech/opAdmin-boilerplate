import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import common from './modules/common';
import tags from './modules/tags';
import errLog from './modules/errLog';
import getters from './getters';
import demo from './modules/demo';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    common,
    errLog,
    tags,
    demo,
  },
  getters,
});

export default store;
