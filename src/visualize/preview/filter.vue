<template>
  <div>
    <hm-panel>
      <filter-param :configs="configs" @on-reset="onReset" @on-query="onQuery">
      </filter-param>
    </hm-panel>
  </div>
</template>

<script>
import FilterParam from '@/visualize/widget/filterParam.vue';
import filterMockData from '@/visualize/data/filter_MockData';

export default {
  name: 'TemplateFilter',
  components: {
    FilterParam,
  },
  data() {
    return {
      configs: filterMockData,
    };
  },
  created() {},
  methods: {
    onReset() {
    },
    onQuery(paramsValue) {
    },
  },
};
</script>

<style lang='scss'>
</style>
