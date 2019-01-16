<template>
  <div class="pager-card-wrap">
    <div class="card-title">
      <span class="title">{{title}}</span>
      <el-tooltip
        class="tips"
        effect="dark"
        placement="top"
        :content="tipsTxt"
        v-show="tipsShow">
        <i class="el-icon-info icon-tip"></i>
      </el-tooltip>
    </div>
    <div class="content-wrap">
      <div class="item content-left" :style="`color: ${color};`">
        {{content}}
      </div>
      <div class="item content-right">
        <slot name="cont-right"></slot>
      </div>
    </div>
    <div class="desc-wrap" v-if="desc.type">
      <!-- 环比 -->
      <div class="flex-wrap" v-if="desc.type === 'rate'">
        <div class="rate" v-for="(item, index) in desc.rate" :key="'rate' + index">
          <em class="label">{{item.txt}}</em>
          <i :class="{'el-icon-caret-top hb-rise': item.type === 'top', 'el-icon-caret-bottom hb-fall': item.type === 'bottom'}"></i>{{item.unit}}
        </div>
      </div>
      <!-- 进度条 -->
      <div class="process" v-if="desc.type === 'process'">
        <el-progress :text-inside="true" :stroke-width="13" :percentage="desc.process"></el-progress>
      </div>
      <!-- 时间段 -->
      <div class="time" v-if="desc.type === 'time'">
        <span class="label">{{desc.time.from}}</span> 至 <span class="label">{{desc.time.to}}</span>
      </div>
      <slot name="desc"></slot>
    </div>
    <div class="bottom-wrap">
      <div v-if="bottom.label">
        <em class="label">{{bottom.label}}</em>
        <span v-for="(item, index) in bottom.list" :key="index">
          <span class="txt" :style="`color: ${color};`">{{item.txt}}</span>
          <span class="unit">{{item.unit}}</span>
        </span>
      </div>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagerCard',
  props: {
    color: {
      type: String,
      default: '#409eff',
    },
    title: {
      type: String,
      default: '',
    },
    tips: {
      type: String,
      default: 'placehold',
    },
    content: {
      type: String,
      default: '',
    },
    bottom: {
      type: Object,
      default() {
        return {
          label: '',
        };
      },
    },
    desc: {
      type: Object,
      default() {
        return {
          type: '',
        };
      },
    },
  },
  computed: {
    tipsTxt() {
      return this.tips === 'placehold' ? this.title : this.tips;
    },
    tipsShow() {
      let isShow = false;
      if (this.tipsTxt) isShow = true;
      return isShow;
    },
  },
};
</script>

<style lang="scss">
.pager-card-wrap {
  background: #fff;
  padding: 5px 12px;
  min-height: 110px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  color: #333;
  font-size: 14px;
  .flex-wrap {
    display: -webkit-flex;
    display: flex;
  }
  .flex-list {
    flex-grow: 1;
  }
  .label {
    color: gray;
  }
  .t-right {
    text-align: right;
  }
  .card-title {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    .title {
      color: rgba(0, 0, 0, .5);
    }
    .icon-tip {
      color: rgba(0, 0, 0, 0.2);
    }
  }
  .content-wrap {
    display: -webkit-flex;
    display: flex;
    padding: 0 0 10px 0;
    line-height: 50px;
    .item {
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }
    .content-left {
      font-size: 24px;
    }
    .content-right {
      text-align: right;
    }
  }
  .desc-wrap {
    height: 14px;
    line-height: 14px;
    padding-bottom: 10px;
    .hb-rise {
      margin-left: 10px;
      color: red;
    }
    .hb-fall {
      margin-left: 10px;
      color: green;
    }
    .rate {
      padding-right: 20px;
    }
    .process {
      // padding-bottom: 10px;
      font-size: 12px;
    }
  }
  .bottom-wrap {
    border-top: 1px solid #e9e9e9;
    padding-top: 5px;
    .label {
      margin-right: 5px;
    }
    .txt {
      padding: 0 3px;
    }
    // border-top: 1px solid #e8e8e8;
  }
}
</style>
