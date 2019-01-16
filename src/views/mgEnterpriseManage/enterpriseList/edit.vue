<template>
  <div class="addmin-enterprise-edit">
    <temp-infoinput
      cols="2"
      :showAddBtn="false"
      :itemConf="pageConf"
      :editInitData="editInitData"
      @save-form="onSaveForm"
      :whileHandle="whileHandle"
      ref="enterpriseTemp"
    ></temp-infoinput>
  </div>
</template>

<script>
import TempInfoinput from '@/visualize/template/infoinput';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import pageConf from '@/visualize/data/infoinput_adminEMEnterpriseEdit';
import setStoreMap from '@/extend/mixins/storeMap';

const storeMap = setStoreMap(['companyinfo', 'service']);
export default {
  name: 'adminEnterpriseEdit',
  mixins: [storeMap],
  components: {
    TempInfoinput,
  },
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
      const res = this.qId ? this.companyinfoGetDataByPath('admin/' + this.qId).data : {};
      if (res && res.devices) {
        for (let i = 0; i < res.devices.length; i++) {
          const date = new Date(res.devices[i].grantExpiryDate);
          const timestamp = (new Date()).getTime();
          const days = date.getTime() - timestamp;
          res.devices[i].grantExpiryDays = parseInt(days / (1000 * 60 * 60 * 24));
        }
      }
      return cloneDeep(res);
    },
    editInitData() {
      return this.respData;
    },
    dataUrl() {
      return this.qId ? '/service/companyinfo/update' : '/service/companyinfo/save';
    },
    taxOrgList() {
      return this.servicePostDataByPath('taxorginfo/page').records || [];
    },
    taxOrgNameList() {
      const res = this.taxOrgList;
      const temp = [];
      if (res && res.length !== 0) {
        for (let i = 0; i < res.length; i++) {
          temp.push({
            value: res[i].taxOrgName,
            label: res[i].taxOrgName,
          });
        }
      }
      return temp;
    },
    whileHandle() {
      const vm = this;
      return {
        // eslint-disable-next-line
        taxOrgName: function() {
          const name = vm.$refs.enterpriseTemp.form.taxOrgName;
          if (name) {
            for (let i = 0; i < vm.taxOrgList.length; i++) {
              if (vm.taxOrgList[i].taxOrgName === name) {
                vm.setValue('taxOrgCode', vm.taxOrgList[i].taxOrgCode);
              }
            }
          }
        },
      };
    },
  },
  watch: {
    taxOrgNameList(newVal, oldVal) {
      if (newVal.length !== 0) {
        this.pageConf.params[1][0].options = newVal;
      }
    },
  },
  created () {
    this.servicePostData({
      path: 'taxorginfo/page',
      data: {
        current: 1,
        size: 100,
      },
    });
    if (this.qId) {
      this.companyinfoGetData({ path: 'admin/' + this.qId });
    }
  },
  methods: {
    setValue(name, val) {
      this.$refs.enterpriseTemp.setValue(name, val);
    },
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
.form-select-width {
  width: 100%;
}
.tip-title {
  color: #999999;
  font-size: 13px;
  padding: 10px 0;
}
.box-msg-list {
  position: relative;
  padding: 18px 0 0 0;
  border: 1px solid #f5f1f1;
  margin-bottom: 20px;
  .close-btn {
    position: absolute;
    right: -6px;
    top: -8px;
    z-index: 99;
    font-size: 18px;
    color: #E5030E;
  }
}
</style>
