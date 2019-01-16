<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in menu">
      <el-menu-item
        v-if="validatenull(item.subMenus)"
        :key="'el-menu-item' + index + item.url"
        :index="filterPath(item.url,index)"
        @click="open(item)"
      >
        <i :class="'title-icon ' + item.icon" />
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <el-submenu
        v-else
        :key="'el-submenu' + index + item.url"
        :index="filterPath(item.name,index)"
      >
        <template slot="title">
          <i :class="'title-icon ' + item.icon" />
          <span
            slot="title"
            :class="{'el-menu--display':isCollapse}"
          >{{ item.name }}</span>
        </template>
        <template v-for="(child,cindex) in item.subMenus">
          <el-menu-item
            v-if="validatenull(child.subMenus)"
            :key="'el-menu-item2' + cindex + child.url"
            :class="{'siderbar-active':nowTagValue==child.url}"
            :index="filterPath(child.url,cindex)"
            @click="open(child)"
          >
            <i :class="'title-icon ' + child.icon" />
            <span slot="title">{{ child.name }}</span>
          </el-menu-item>
          <sidebar-item
            v-else
            :key="'sidebar-item' + cindex"
            :menu="[child]"
            :is-collapse="isCollapse"
          />
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { resolveUrlPath, setUrlPath, validatenull } from '@/util/util';

export default {
  name: 'SidebarItem',
  props: {
    menu: {
      type: Array,
    },
    isCollapse: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  computed: {
    nowTagValue() {
      return setUrlPath(this.$route);
    },
  },
  created() { },
  mounted() { },
  methods: {
    validatenull(val) {
      return validatenull(val);
    },
    filterPath(path, index) {
      return path == null ? `${index}` : path;
    },
    open(item) {
      this.$router.push({
        path: resolveUrlPath(item.url, item.name),
        query: item.query,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
//刷新激活状态
.siderbar-active {
  i,
  span {
    color: #409eff;
  }
}
.el-icon-tickets:before {
  font-size: 17px;
}
</style>
