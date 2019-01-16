<template>
  <div
    class="sidebar-container"
    :class="{'is-active':isCollapse}"
  >
    <logo :is-collapse="isCollapse" />
    <el-menu
      style="border-right: 0;"
      unique-opened
      :default-active="nowTagValue"
      :default-openeds="defaultOpeneds"
      mode="vertical"
      :show-timeout="200"
      background-color="#2c304d"
      text-color="hsla(0,0%,100%,.8)"
      active-text-color="#409eff"
      :collapse="isCollapse"
      @select="openMenu"
    >
      <sidebar-item
        :menu="menu"
        :is-collapse="isCollapse"
      />
    </el-menu>
  </div>
</template>

<script>
// import MENU from '@/mock/menu'
import { setUrlPath } from '@/util/util';
import { mapGetters } from 'vuex';
import SidebarItem from './sidebarItem';
import logo from './logo';

export default {
  name: 'Sidebar',
  components: { SidebarItem, logo },
  data() {
    return {
      defaultOpeneds: ['开具发票'],
    };
  },
  created() {
    // this.$store.dispatch('GetMenu').then(data => {
    //   console.info('>>>>GetMenu', data);
    // })
    this.$store.dispatch('GetMenuAll').then((data) => {
      // console.info('>>>>GetMenuAll', data);
    });
  },
  computed: {
    ...mapGetters(['menu', 'tag', 'isCollapse']),
    nowTagValue() {
      return setUrlPath(this.$route);
    },
  },
  mounted() { },
  methods: {
    openMenu(a, b) {
      this.$nextTick(() => {
        this.defaultOpeneds = b;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
