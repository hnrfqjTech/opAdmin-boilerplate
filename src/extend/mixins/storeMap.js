import { mapActions, mapGetters } from 'vuex';
import extend from 'lodash/extend';

/**
 * @desc 传入store模块名获取 mixins
 * @param {Array} moduleArr
 * @author bigang.ybg
 */
export default function setStoreMap(moduleArr) {
  let a = {};
  let b = {};
  moduleArr.forEach((item) => {
    a = extend(a, mapGetters(item, {
      [`${item}GetDataByPath`]: 'getDataByPath',
      [`${item}PostDataByPath`]: 'postDataByPath',
    }));
    b = extend(b, mapActions(item, {
      [`${item}GetData`]: 'getData',
      [`${item}PostData`]: 'postData',
    }));
  });
  return {
    computed: {
      ...a,
    },
    methods: {
      ...b,
    },
  };
}
