<template>
  <div>
    <hm-panel>
      <filter-param :configs="tempConf.filter" @on-reset="onReset" @on-query="onQuery">
        <slot name="filter"></slot>
      </filter-param>
      <header>
        <slot name="header"></slot>
      </header>
      <hm-pager-helper
        ref="templateList"
        :api="tempConf.list.api"
        :method="tempConf.list.method"
        :params="tempConf.list.params"
        :reqPageName="{currPage: 'current', size: 'size'}"
        :resKeysName="{ data: 'data', list: 'data.records', total: 'data.total', totalPage: 'data.pages'}"
        :page-size="10">
        <template slot-scope="helperData">
          <slot
            :table-list="helperData.tableList"
            :initial-data="helperData.initialData"
            :extra="helperData.extraData"
            :page="helperData.page"
            :on-loading="helperData.onLoading"
            :on-size-change="helperData.onSizeChange"
            :on-page-change="helperData.onPageChange"></slot>
        </template>
      </hm-pager-helper>
    </hm-panel>
  </div>
</template>

<script>
import FilterParam from '@/visualize/widget/filterParam.vue';

export default {
  name: 'TemplateList',
  components: {
    FilterParam,
  },
  props: {
    tempConf: {
      type: Object,
      default() {
        return {
          filter: [],
          listApi: '',
        };
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onReset() {
      this.$refs.templateList.page.currPage = 1;
      this.$refs.templateList.query();
    },
    onQuery(paramsValue) {
      this.$refs.templateList.page.currPage = 1;
      this.$refs.templateList.query(paramsValue);
    },
  },
};
</script>

<style lang='scss'>
</style>
