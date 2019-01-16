<template>
  <div v-cloak class="home-page">
    <hm-panel title="根据 store-helper 取数据">
      {{useraccountResp.success}}
    </hm-panel>

    <hm-panel title="根据可视化模板-列表页 取数据">
      <temp-list :tempConf="tempConf">
        <template slot="filter">
          <!-- 按钮 -->
          <el-button type="primary" icon="el-icon-plus" @click="goEdit('new')">添加</el-button>
        </template>

        <template slot-scope="helperData">
          <!-- 配合 /visualize/template/list.vue 入参-->
          <hm-pager-grid
            ref="pagerGrid"
            :border="false"
            row-key="tableComment"
            :data="helperData.initialData"
            :page="helperData.page"
            @size-change="helperData.onSizeChange"
            @current-change="helperData.onPageChange">
            <!-- 表格列 -->
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="author_id" label="author_id"></el-table-column>
          </hm-pager-grid>
        </template>
      </temp-list>
    </hm-panel>
  </div>
</template>

<script>
import TempList from '@/visualize/template/list';
import tempConf from '@/visualize/data/list_home';
import setStoreMap from '@/extend/mixins/storeMap';

const storeMap = setStoreMap(['demo']);
export default {
  name: 'Home',
  mixins: [storeMap],
  components: {
    TempList,
  },
  data() {
    return {
      tempConf
    };
  },
  created() {
    this.demoGetData({
      path: 'topics',
      configs: {
        baseURL: 'https://cnodejs.org' // 当前应用中默认不需要，DEMO 调试用到
      }
    });
  },
  computed: {
    useraccountResp() {
      return this.demoGetDataByPath('topics');
    },
  },
  watch: {
  },
  methods: {
    goEdit() {

    }
  },
};
</script>

<style lang="scss">
.home-page {}
</style>
