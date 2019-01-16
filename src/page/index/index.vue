<template>
  <el-container class="avue-contail">
    <el-aside :style="{width: isCollapse ? asideWidthCollapse : asideWidth}">
      <!-- 左侧导航栏 -->
      <sidebar class="avue-sidebar" />
    </el-aside>
    <el-container
      v-loading="indexRequestStatus"
      class="main-container"
    >
      <el-header
        height="auto"
        class="avue-tabs"
      >
        <!-- 顶部导航栏 -->
        <top />
        <!-- 顶部标签卡 -->
        <tags v-if="breadcrumbMode === 2" />
      </el-header>
      <el-main class="avue-main">
        <!-- 主体视图层 -->
        <keep-alive>
          <transition
            name="fade"
            mode="out-in"
          >
            <router-view
              v-if="$route.meta.keepAlive"
              class="avue-view"
            />
          </transition>
        </keep-alive>
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view
            v-if="!$route.meta.keepAlive"
            class="avue-view"
          />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  mapGetters,
} from 'vuex';
import tags from './tags';
import top from './top';
import sidebar from './sidebar';
import {
  setStore,
  getStore,
} from '@/util/store.js';


export default {
  name: 'Index',
  components: {
    top,
    tags,
    sidebar,
  },
  data() {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '230px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px',
      // 刷新token锁
      refreshLock: false,
      // 刷新token的时间
      refreshTime: '',

    };
  },
  created() {
    // 实时检测刷新token
    // this.refreshToken();

    // 消息中心
    // this.$store.dispatch('GetMessage');

    // setInterval(() => {
    //   this.$store.dispatch('GetMessage');
    // }, 1000 * 60);
  },
  mounted() {

  },
  computed: mapGetters(['isLock', 'isCollapse', 'website', 'indexRequestStatus', 'messageLength', 'breadcrumbMode']),
  props: [],
  methods: {
  },
};

</script>

<style lang="scss" scoped>
  .main-container {
    min-width: 1000px;
  }
  .avue-contail {
    height: 100%;
  }

  .avue-sidebar {
    height: 100%;
  }

  .avue-tabs {
    padding: 0 10px 0 0;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  .avue-main {
    position: relative;
    background-color: #f0f2f5;
  }

  .avue-view {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 22px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    /* Safari */
  }

</style>
