<template>
  <div class="third-container">
    <img
      src="/static/img/code/qq-code.jpg"
      class="third-icon qq"
    >
    <img
      src="/static/img/code/wechat-code.jpg"
      class="third-icon wechat"
    >
  </div>
</template>

<script>
export default {
  name: 'Thirdlogin',
  props: [],
  data() {
    return {
    };
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {},
};
</script>

<style lang="scss" scoped>
.third-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 250px;
  & > .third-icon {
    padding: 8px;
    width: 130px;
    height: 130px;
    line-height: 100%;
    background-color: #fff;
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    text-align: center;
  }
  & > .third-icon.qq {
    border-color: #409eff;
  }
  & > .third-icon.wechat {
    border-color: #67c23a;
  }
}
</style>
