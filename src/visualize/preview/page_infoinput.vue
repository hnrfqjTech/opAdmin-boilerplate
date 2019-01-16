<template>
  <div>
    <temp-infoinput
      cols="2"
      :itemConf="pageConf"
      :editInitData="editInitData"
      @save-form="onSaveForm"
    ></temp-infoinput>
  </div>
</template>

<script>
import TempInfoinput from '@/visualize/template/infoinput';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import pageConf from '@/visualize/data/infoinput_demo';
import setStoreMap from '@/extend/mixins/storeMap';
/**
 * 页面中搜索 demo 字样，修改对应逻辑即可。具体步骤：
 *
 * 修改页面 demoName
 * 准备页面的表单配置数据 infoinput_demo，本页面中替换
 * 准备 vuex 模块 demoModule，本页面中替换和跑通接口逻辑
 * 提交接口地址修改 demoUpdateUrl，demoSaveUrl
 */
const storeMap = setStoreMap(['demoModule']);
export default {
  name: 'demoName',
  components: {
    TempInfoinput,
  },
  mixins: [storeMap],
  data () {
    return {
      pageConf,
    };
  },
  computed: {
    qId() {
      return this.$route.query.id;
    },
    respData() {
      const res = this.qId ? this.demoModuleGetDataByPath(this.qId).data : {};
      return cloneDeep(res);
    },
    editInitData() {
      return this.respData;
    },
    dataUrl() {
      return this.qId ? 'demoUpdateUrl' : 'demoSaveUrl';
    },
  },
  created() {
    if (this.qId) {
      this.demoModuleGetData({
        path: this.qId,
      });
    }
  },
  mounted() {},
  methods: {
    onSaveForm(fromData) {
      const vm = this;
      const data = merge({}, this.respData, fromData);
      vm.$http.request({
        url: vm.dataUrl,
        method: 'post',
        data,
      }).then((res) => {
        if (res.code === 0) {
          vm.$alert('提交成功', '', {
            confirmButtonText: '确定',
            callback: () => {
              vm.$router.go(-1);
            },
          });
        }
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
