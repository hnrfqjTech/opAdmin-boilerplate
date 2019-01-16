<template>
  <el-form
    ref="loginForm"
    class="login-form"
    status-icon
    :rules="loginRules"
    :model="loginForm"
    label-width="0"
  >
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        size="small"
        auto-complete="off"
        placeholder="请输入用户名"
        @keyup.enter.native="handleLogin"
      >
        <i
          slot="prefix"
          class="icon-yonghu"
        />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        size="small"
        :type="passwordType"
        auto-complete="off"
        placeholder="请输入密码"
        @keyup.enter.native="handleLogin"
      >
        <i
          slot="suffix"
          class="el-icon-view el-input__icon"
          @click="showPassword"
        />
        <i
          slot="prefix"
          class="icon-mima"
        />
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="14">
          <el-input
            v-model="loginForm.code"
            size="small"
            :maxlength="code.len"
            auto-complete="off"
            placeholder="请输入验证码"
            @keyup.enter.native="handleLogin"
          >
            <i
              slot="prefix"
              class="icon-yanzhengma"
            />
          </el-input>
        </el-col>
        <el-col :span="10">
          <div class="login-code">
            <span
              v-if="code.type == 'text'"
              class="login-code-img"
              @click="refreshCode"
            >{{ code.value }}</span>
            <img
              v-else
              :src="code.src"
              class="login-code-img"
              @click="refreshCode"
            >
            <!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
          </div>
        </el-col>
      </el-row>

    </el-form-item>
    <!-- <el-checkbox v-model="checked">记住账号</el-checkbox> -->
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        class="login-submit"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { randomLenNum, isvalidUsername } from '@/util/util';
import { mapGetters } from 'vuex';

export default {
  name: 'Userlogin',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      callback();
    };
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        redomStr: '',
      },
      checked: false,
      code: {
        src: '',
        value: '',
        len: 4,
        type: 'img',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur',
          },
          { required: true, trigger: 'blur', validator: validateCode },
        ],
      },
      passwordType: 'password',
    };
  },
  created() {
    this.refreshCode();
  },
  mounted() {},
  computed: {
    ...mapGetters(['tagWel']),
  },
  props: [],
  methods: {
    refreshCode() {
      this.loginForm.redomStr = randomLenNum(this.code.len, true);
      this.code.type == 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}?t=${new Date().getTime()}`);
      this.loginForm.code = this.code.value;
    },
    showPassword() {
      this.passwordType == ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '');
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
            if (res && res.code === 0) {
              this.$router.push({ path: this.tagWel.value });
            } else {
              this.refreshCode();
            }
          });
        }
      });
    },
  },
};
</script>

<style>
</style>
