<template>
  <div class="lock-container pull-height">
    <div class="lock-form animated bounceInDown">
      <div
        class="animated"
        :class="{'shake':passwdError,'bounceOut':pass}"
      >
        <h3 class="text-white">{{ userInfo.username }}</h3>
        <div class="lock-btn-wrap">
          <el-input
            v-model="passwd"
            placeholder="请输入登录密码"
            type="password"
            class="input-with-select animated"
            @keyup.enter.native="handleLogin"
          />
          <div class="lock-button">
            <el-tooltip
              class="item"
              effect="dark"
              content="解锁"
              placement="top"
            >
              <el-button
                style="margin-right: -6px;"
                size="mini"
                icon="iconfont icon-unlock"
                @click="handleLogin"
              />
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="登出"
              placement="top"
            >
              <el-button
                size="mini"
                icon="iconfont icon-logout"
                @click="handleLogout"
              />
            </el-tooltip>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import { resolveUrlPath } from '@/util/util';

export default {
  name: 'Lock',
  data() {
    return {
      passwd: '',
      passwdError: false,
      pass: false,
    };
  },
  created() { },
  mounted() { },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
    ...mapGetters(['tag', 'lockPasswd']),
  },
  components: {},
  props: [],
  methods: {
    handleLogout() {
      this.$confirm('退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          window.location.href = '/logout';
        });
      });
    },
    handleLogin() {
      if (this.passwd != this.lockPasswd) {
        this.passwd = '';
        this.$message({
          message: '解锁密码错误,请重新输入',
          type: 'error',
        });
        this.passwdError = true;
        setTimeout(() => {
          this.passwdError = false;
        }, 1000);
        return;
      }
      this.pass = true;
      setTimeout(() => {
        this.$store.commit('CLEAR_LOCK');
        this.$router.push({ path: resolveUrlPath(this.tag.value || '/') });
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.lock-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  position: relative;
  .el-input--small .el-input__inner {
    height: 36px;
    line-height: 36px;
  }
  .lock-btn-wrap {
    position: relative;
    .lock-button {
      position: absolute;
      top: 0;
      right: 0;
      width: 110px;
      height: 100%;
      text-align: right;
    }
    .el-button--mini {
      padding: 8px 15px;
      margin: 0;
    }
  }
}
.lock-container::before {
  z-index: -999;
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('/static/img/login.png');
  background-size: cover;
}
.lock-form {
  width: 300px;
}
</style>
