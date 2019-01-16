import Vue from 'vue'
import merge from 'lodash/merge'
import updateResource from './update_resource'

const normalizeKey = function (key) {
  if (!key) {
    return ''
  }
  return '' + key
}

export default function (apiInstance, default_ = {}) {
  const state = {
    loading: {
      getData: {},
      postData: {},
    },
    error: {
      getData: {},
      postData: {},
    },
    getData: {},
    postData: {},
  }

  const getters = {
    // get 请求数据
    getData: (state, getters) => {
      return state.getData;
    },
    getDataLoading: (state, getters) => {
      return state.loading.getData;
    },
    getDataError: (state, getters) => {
      return state.error.getData;
    },
    getDataByPath: (state, getters) => (path) => {
      path = normalizeKey(path);
      return state.getData[ path ] || [];
    },
    getDataLoadingByPath: (state, getters) => (path) => {
      path = normalizeKey(path)
      return state.loading.getData[ path ] || false;
    },
    getDataErrorByPath: (state, getters) => (path) => {
      path = normalizeKey(path)
      return state.error.getData[ path ] || null;
    },
    // post 请求数据
    postData: (state, getters) => {
      return state.postData;
    },
    postDataLoading: (state, getters) => {
      return state.loading.postData;
    },
    postDataError: (state, getters) => {
      return state.error.postData;
    },
    postDataByPath: (state, getters) => (path) => {
      path = normalizeKey(path);
      return state.postData[ path ] || [];
    },
    postDataLoadingByPath: (state, getters) => (path) => {
      path = normalizeKey(path)
      return state.loading.postData[ path ] || false;
    },
    postDataErrorByPath: (state, getters) => (path) => {
      path = normalizeKey(path)
      return state.error.postData[ path ] || null;
    },

    // listTotal: (state, getters) => {
    //   return getters.getDataTotalByTag('')
    // },
    // listSums: (state, getters) => {
    //   return getters.getDataSumsByTag('')
    // },
    // getDataTotalByTag: (state, getters) => (tag) => {
    //   tag = normalizeKey(tag)
    //   return state.total[tag] || 0
    // },
    // getDataSumsByTag: (state, getters) => (tag) => {
    //   tag = normalizeKey(tag)
    //   return state.sums[tag] || 0
    // },
    // getById: (state, getters) => (id) => {
    //   id = normalizeKey(id)
    //   return state.postData[id] || default_
    // },
    // getLoadingById: (state, getters) => (id) => {
    //   id = normalizeKey(id)
    //   return state.loading.postData[id] || false
    // },
    // getErrorById: (state, getters) => (id) => {
    //   id = normalizeKey(id)
    //   return state.error.postData[id] || null
    // },
    // getSaveLoadingById: (state, getters) => (id) => {
    //   id = normalizeKey(id)
    //   return state.loading.saveds[id] || false
    // },
    // getSaveErrorById: (state, getters) => (id) => {
    //   id = normalizeKey(id)
    //   return state.error.saveds[id] || null
    // },
    // getDeleteLoadingById: (state, getters) => (id) => {
    //   id = normalizeKey(id)
    //   return state.loading.deletes[id] || false
    // },
    // getDeleteErrorById: (state, getters) => (id) => {
    //   id = normalizeKey(id)
    //   return state.error.deletes[id] || null
    // }
  }

  const mutations = {
    listStart(state, { key }) {
      Vue.set(state.loading.getData, key, true);
    },
    listSuccess(state, { key, response, reset }) {
      Vue.set(state.loading.getData, key, false);

      if (!(key in state.getData) || reset === true) {
        Vue.set(state.getData, key, response);
      } else {
        state.getData[ key ] = state.getData[ key ].concat(response);
      }

      Vue.set(state.error.getData, key, null);
    },
    listFail(state, { key, error }) {
      Vue.set(state.loading.getData, key, false);
      Vue.set(state.error.getData, key, error);
    },
    resetList (state, { key }) {
      Vue.set(state.loading.getData, key, false);
      Vue.set(state.getData, key, []);
      Vue.set(state.error.getData, key, null);
    },

    postStart(state, { key }) {
      Vue.set(state.loading.postData, key, true);
    },
    postSuccess(state, { key, response }) {
      Vue.set(state.loading.postData, key, false);
      Vue.set(state.postData, key, response);
      Vue.set(state.error.postData, key, null);
    },
    postFail(state, { key, error }) {
      Vue.set(state.loading.postData, key, false);
      Vue.set(state.error.postData, key, error);
    },

    // setInList (state, { tag, index, res }) {
    //   const key = normalizeKey(tag)
    //   let list = state.getData[key]
    //   if (list) {
    //     if (index !== undefined && index !== null) {
    //       list.splice(index, 0, res)
    //     } else {
    //       list.push(res)
    //     }
    //   } else {
    //     Vue.set(state.getData, key, [res])
    //   }
    // },
    // deleteInList (state, { tag, index }) {
    //   const key = normalizeKey(tag)
    //   let list = state.getData[key]
    //   if (!list) {
    //     return
    //   }
    //   if (index < 0) {
    //     index = list.length + index
    //   }
    //   list.splice(index, 1)
    // },
    // removeInList (state, { tag, res, equal }) {
    //   const key = normalizeKey(tag)
    //   let list = state.getData[key]
    //   if (!list) {
    //     return
    //   }
    //   for (let i = 0; i < list.length; i++) {
    //     const resource = list[i]
    //     if ((equal && equal(resource, res)) || resource.id === res.id) {
    //       list.splice(i, 1)
    //       break
    //     }
    //   }
    // },
    // updateInList (state, { tag, id, changes, callback }) {
    //   const key = normalizeKey(tag)
    //   let list = state.getData[key]
    //   if (!list) {
    //     return
    //   }
    //   for (let i = 0; i < list.length; i++) {
    //     const resource = list[i]
    //     if (resource.id === id) {
    //       updateResource(resource, changes, false)
    //       callback && callback(resource)
    //       break
    //     }
    //   }
    // },
    // restore (state, { key }) {
    //   if (!(key in state.postData)) {
    //     // 從列表恢復
    //     for (const k in state.getData) {
    //       const getData = state.getData[k]
    //       for (let i = 0; i < getData.length; i++) {
    //         const resource = getData[i]
    //         if (normalizeKey(resource.id) === key) {
    //           Vue.set(state.postData, key, resource)
    //           break
    //         }
    //       }
    //     }
    //   }
    // },

    // reset (state, { id, res }) {
    //   const key = normalizeKey(id)
    //   if (!res) {
    //     res = {}
    //   }
    //   Vue.set(state.postData, key, res)
    // },
    // update (state, { id, changes }) {
    //   const key = normalizeKey(id)
    //   let resource = state.postData[key]
    //   if (!resource) {
    //     resource = {}
    //     Vue.set(state.postData, key, resource)
    //   }
    //   updateResource(resource, changes)
    // },
    // saveStart (state, { key }) {
    //   Vue.set(state.loading.saveds, key, true)
    // },
    // saveSuccess (state, { key, response }) {
    //   Vue.set(state.loading.saveds, key, false)
    //   const resource = merge(state.postData[key] || {}, response.data)
    //   Vue.set(state.postData, key, resource)
    //   Vue.set(state.error.saveds, key, null)
    // },
    // saveFail (state, { key, error }) {
    //   Vue.set(state.loading.saveds, key, false)
    //   Vue.set(state.error.saveds, key, error)
    // },
    // deleteStart (state, { key }) {
    //   Vue.set(state.loading.deletes, key, true)
    // },
    // deleteSuccess (state, { key, response }) {
    //   Vue.set(state.loading.deletes, key, false)
    //   delete state.postData[key]
    //   Vue.set(state.error.deletes, key, null)
    // },
    // deleteFail (state, { key, error }) {
    //   Vue.set(state.loading.deletes, key, false)
    //   Vue.set(state.error.deletes, key, error)
    // }
  }

  const actions = {
    async getData({ state, getters, dispatch, commit }, { path, args, query, headers, configs, reset = true, lazy, success, failure}) {
      const key = normalizeKey(path);
      // let start = 0
      // if (reset === true) {
      //   start = (configs && configs.offset) || 0
      //   if (lazy) {
      //     const data = getters.getDataByPath(key)
      //     if (data.length > 0) {
      //       const total = getters.getDataTotalByTag(key)
      //       const sums = getters.getDataSumsByTag(key)
      //       const response = {
      //         data: {
      //           data: data,
      //           total: total,
      //           sums: sums
      //         }
      //       }
      //       if (success) {
      //         return success(response)
      //       } else {
      //         return response
      //       }
      //     }
      //   }
      // } else {
      //   start = getters.getDataByPath(key).length
      // }
      commit('listStart', { key: key });
      try {
        // query['start'] = start
        const response = await apiInstance.get({
          path: key,
          args: args,
          query: query,
          headers: headers,
          configs: configs,
        });
        commit('listSuccess', { key: key, response: response, reset: reset });
        if (success) {
          success(response);
        } else {
          return response;
        }
      } catch (err) {
        commit('listFail', { key: key, error: err });
        if (failure) {
          failure(err);
        } else {
          return Promise.reject(err);
        }
      }
    },
    async postData({ state, getters, commit, dispatch }, { path, args, query, data, headers, configs, reset = true, lazy, success, failure }) {
      const key = normalizeKey(path)
      // if (lazy) {
      //   const resource = state.postData[key]
      //   if (resource) {
      //     const response = {
      //       data: resource
      //     }
      //     if (success) {
      //       success(response)
      //       return
      //     } else {
      //       return response
      //     }
      //   }
      // }

      commit('postStart', { key: key })
      try {
        const response = await apiInstance.post({
          path: key,
          args,
          query,
          data,
          headers,
          configs,
        })
        commit('postSuccess', { key: key, response: response });
        if (success) {
          success(response);
        } else {
          return response;
        }
      } catch (err) {
        commit('postFail', { key: key, error: err });
        if (failure) {
          failure(err);
        } else {
          return Promise.reject(err);
        }
      }
    },
  }
  return {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
  }
}
