<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>
<style lang="scss">
.flex-box {
  display: -webkit-flex;
  display: flex;
}
.flex-item {
  flex-grow: 1;
}

.el-button--mini {
  padding: 7px 10px !important;
}
.iconfont {
  font-size: 18px !important;
}
.echart-wrap {
  position: relative;
  .no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 99;
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #909399;
    font-size: 12px;
  }
}
.edit-wrap {
  .panel-wrap .layout-card {
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .edit-btn {
    text-align: center;
  }
}
.panel-wrap {
  margin-bottom: 22px !important;
}
.no-padbot.panel-wrap {
  .layout-card-cont {
    padding-bottom: 2px;
  }
}
.el-card__header {
  padding: 8px 20px;
}
.el-table thead {
  color: #767980;
}
.el-table--small td {
  padding: 6px 0;
}
.hm-pager-grid, .qj-pager-grid {
  .el-table thead tr, .hm-pager-grid .el-table thead th {
    font-size: 13px;
  }
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
