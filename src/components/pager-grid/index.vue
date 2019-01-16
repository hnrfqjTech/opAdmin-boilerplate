<template>
  <div class="hm-pager-grid fill-area">
    <el-table
      :data="data"
      :height="height"
      :max-height="maxHeight"
      :border="border"
      :fit="true"
      :stripe="stripe"
      :highlight-current-row="highlight"
      :row-key="rowKey"
      :cell-style="cellStyle"
      @row-click="rowClick"
      @select="onSelect"
      @select-all="onSelectAll"
      @selection-change="onSelectionChange"
      @sort-change="onSortChange">
      <slot></slot>
    </el-table>

    <el-pagination v-if="page.total > 0" class="view-pager"
      background
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      :current-page="page.currPage"
      :page-sizes="pageSizes"
      :page-size="page.size"
      :layout="paginationLayout"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'PagerGrid',
  props: {
    rowKey: {
      type: [String, Function],
      default: 'id',
    },
    cellStyle: {
      type: Function,
    },
    data: Array,
    height: {
      type: [String, Number],
    },
    maxHeight: {
      type: [String, Number],
    },
    paginationLayout: {
      type: String,
      default: 'sizes, prev, pager, next',
    },
    border: {
      type: Boolean,
      default: true,
    },
    stripe: {
      type: Boolean,
      default: true,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Object,
      default() {
        return {
          currPage: 1,
          size: 1,
          total: 1,
        };
      },
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100];
      },
    },
  },
  methods: {
    onSelect (selection, row) {
      this.$emit('select', selection, row);
    },
    onSelectAll (selection) {
      this.$emit('select-all', selection);
    },
    onSelectionChange (selection) {
      this.$emit('selection-change', selection);
    },
    onSizeChange (size) {
      this.$emit('size-change', size);
    },
    onCurrentChange (page) {
      this.$emit('current-change', page);
    },
    onSortChange ({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order });
    },
    rowClick (row) {
      this.$emit('row-click', row);
    },
  },
};
</script>

<style lang="scss">
.hm-pager-grid, .qj-pager-grid {
  .view-pager {
    padding-top: 20px;
    margin-right: -10px;
    text-align: right;
  }
  .el-table thead tr, .el-table thead th{
    background-color: #f8f8f9;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
  }
  .el-button {
    margin: 3px 5px 3px 0;
  }
  .el-button+.el-button {
    margin: 3px 5px 3px 0;
  }
}
</style>
