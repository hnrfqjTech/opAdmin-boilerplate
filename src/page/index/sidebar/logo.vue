<template>
  <div
    class="logo"
    @click="toWelIndex"
  >
    <span
      key="0"
      class="logo_title is-bold "
      :class="{'is-text':!type,'is-img':type}"
    >
      <template v-if="type">
        <img
          :src="website.logo"
          width="50"
          height="50"
        >
      </template>
      <template v-else>
        {{ website.logo }}
      </template>
    </span>
    <transition name="slide-fade">
      <span
        v-if="!isCollapse"
        key="1"
        class="logo_title is-bold logo-txt"
      >{{ website.title }} </span>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Logo',
  props: ['isCollapse'],
  data() {
    return {};
  },
  computed: {},
  created() {},
  computed: {
    ...mapGetters(['website']),
    type(val) {
      return this.website.logo.indexOf('logo') != -1;
    },
  },
  methods: {
    toWelIndex() {
      this.$router.push({
        path: '/home/index',
      });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
.slide-fade-enter-active {
  transition: all .5s ease;
}
// .slide-fade-leave-active {
//   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
// }
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.logo {
  position: relative;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // width: 230px;
  height: 95px;
  line-height: 95px;
  background: #2c304d;
  color: #fdfdfd;
  // text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  box-sizing: border-box;
}
.logo_title {
  padding: 0 10px 0 0;
  color: #fff;
  font-size: 14px;
  &.is-bold {
    font-weight: 600;
    cursor: pointer;
  }
}
.logo-txt {
  float: right;
  letter-spacing: 1px;
}
.is-text {
  position: absolute;
  top: 0;
  left: 20px;
}
.is-img {
  position: absolute;
  top: 15px;
  left: 10px;
}
.sidebar-container.is-active {
  .is-img {
    left: 7px;
  }
}
.logo_subtitle {
  font-size: 16px;
  padding-top: 5px;
}
</style>
