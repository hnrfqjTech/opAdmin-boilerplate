<template>
  <div class="demo-wrap">
    <temp-list :tempConf="tempConf">
      <template slot="filter">
        <!-- 按钮 -->
      </template>

      <template slot-scope="helperData">
        <hm-pager-grid
          ref="pagerGrid"
          :border="false"
          row-key="tableComment"
          :data="helperData.tableList"
          :page="helperData.page"
          @size-change="helperData.onSizeChange"
          @current-change="helperData.onPageChange">

          <!-- 表格列 -->
        </hm-pager-grid>
      </template>
    </temp-list>
  </div>
</template>

<script>
import TempList from '@/visualize/template/list';
import tempConf from '@/visualize/data/temp_demo';
// import setStoreMap from '@/extend/mixins/storeMap';
// const storeMap = setStoreMap(['enterpriseassign']);

// todo 替换 demo 字样，然后删除该条
export default {
  name: 'demo',
  components: {
    TempList,
  },
  // mixins: [storeMap],
  data() {
    return {
      tempConf,
    };
  },
  created() {},
  computed: {},
  methods: {},
};
</script>

<style lang='scss' scoped>

</style>
