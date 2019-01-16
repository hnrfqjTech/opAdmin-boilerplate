<template>
  <div class="top">
    <div class="top-button is-left">
      <!-- breadcrumb按钮和面包屑 -->
      <div class="tags-breadcrumb">
        <i class="iconfont tag-collapse icon-menu-fold" :class="[{ 'tag-collapse_right': isCollapse }]" @click="showCollapse"></i>
        <!-- <top-breadcrumb class="tags-breadcrumb-list"></top-breadcrumb> -->
      </div>

      <!-- 面包屑 tab v-if="breadcrumbMode === 1"-->
      <el-breadcrumb class="tabs-breadcrumb">
        <el-breadcrumb-item
          v-for="(item, key) in breadcrumbs" :key="`breadcrumbs-${key}`"
          :to="item.path ? {path: item.path} : ''">
          {{ item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1 class="top-title">
      <topMenu></topMenu>
    </h1>
    <div class="top-button is-right">
      <!-- <el-tooltip class="item"
                  effect="dark"
                  content="主题色"
                  placement="bottom">
        <span class="top-item">
          <top-color></top-color>
        </span>
      </el-tooltip> -->

      <!-- <el-tooltip class="item top-item" effect="dark" content="消息中心" placement="bottom">
        <el-badge :value="messageLength" class="item">
          <i class='el-icon-message' @click="toMessageCenter" style="cursor:pointer"></i>
        </el-badge>
      </el-tooltip> -->

      <el-dropdown
        v-if="currentCompany"
        @command="onCompanyCommand"
        class="company-change" placement="bottom-end">
        <i class="iconfont icon-qi"></i>
        <span style="padding-left: 22px;">{{currentCompany}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in companyList"
            :command="item.id"
            :disabled="currentCompany === item.name"
            :key="`company-${index}`">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-tooltip class="item" effect="dark" content="特色主题" placement="bottom">
        <span class="top-item">
          <top-theme></top-theme>
        </span>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom">
        <span class="top-item">
          <top-lock></top-lock>
        </span>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" :content="isFullScren?'退出全屏':'全屏'" placement="bottom">
        <span class="top-item">
          <i :class="isFullScren ? 'iconfont icon-fullscreen-exit' : 'iconfont icon-fullscreen'" @click="handleScreen"></i>
        </span>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="用户头像" placement="bottom">
        <img class="top-userImg" :src="userInfo.avatar">
      </el-tooltip>

      <el-dropdown placement="bottom-end">
        <span class="el-dropdown-link" style="cursor: pointer;">
          {{userInfo.username}}<span v-if="roleName">({{ roleName }})</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="onEditPassword">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dialog :append-to-body="true" class="edit-password" title="修改密码" width="26%" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="85px">
          <el-form-item label="帐号">
            <el-tag>{{userInfo.username}}</el-tag>
          </el-form-item>
          <el-form-item label="原密码" prop="password">
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="form.newPassword" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onCancelPassword">取 消</el-button>
          <el-button type="primary" @click="onConfirmPassword">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { fullscreenToggel, listenfullscreen } from '@/util/util';
import topLock from './top-lock';
import topMenu from './top-menu';
import topBreadcrumb from './top-breadcrumb';
import topColor from './top-color';
import topTheme from './top-theme';
import { Notification } from 'element-ui';

export default {
  components: {
    topLock,
    topMenu,
    topBreadcrumb,
    topColor,
    topTheme,
  },

  props: [],

  name: 'top',
  data() {
    return {
      currentCompany: '',
      companyList: [],
      form: {
        password: '',
        newPassword: '',
      },
      dialogFormVisible: false,
      rules: {
        password: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur',
        },
        {
          min: 6,
          message: '长度至少 6 个字符',
          trigger: 'blur',
        },
        ],
        newPassword: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur',
        },
        {
          min: 6,
          message: '长度至少 6 个字符',
          trigger: 'blur',
        },
        ],
      },
    };
  },
  filters: {},
  created() {
    // 应用权限 + 状态停用（新应用）
    this.$store.dispatch('GetUserInfo').then(res => {
      const systemsArr = res.userInfo && res.userInfo.systems || [];
      const systems = systemsArr.map(item => item.name);
      const userName = res.userInfo && res.userInfo.username || '';
      const app = 'huacai-tax-service';
      const status = res.userInfo && res.userInfo.status;
      // 帐号停用
      if (status === 0) this.logoutHandle(`帐号：${userName} 已停用`);
      // 无权限
      if (!systems.includes(app)) this.logoutHandle(`帐号：${userName} 没有发票盒子的权限`);
      this.getCompanyList();
    });
    // this.getCompanyList();

    // 消息中心
    // setTimeout(() => {
    //   this.$http.get('/msg/pullPoolMsg').then((data) => {
    //     this.tableData = data.data;
    //   });
    // }, 10000);
  },
  mounted() {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'isFullScren',
      'tagWel',
      'tagList',
      'isCollapse',
      'tag',
      'messageLength',
      'breadcrumbs',
      'breadcrumbMode',
    ]),
    roleName() {
      const _roleName = '';
      // if (this.userInfo && this.userInfo.roles) {
      //   _roleName = CONST_CONF && (CONST_CONF.roleInfo[this.userInfo.roles[0]] || CONST_CONF.roleInfo[this.userInfo.roles[1]]);
      // }
      return _roleName;
    },
  },
  methods: {
    logoutHandle(msg) {
      Notification.error({
        title: '错误',
        message: msg
      });
      setTimeout(() => {
        window.location.href = '/logout';
      }, 2000);
    },
    getCurrentCompany(companyId) {
      let temp;
      this.companyList.forEach(item => {
        if (companyId === null) {
          if (item.current) temp = item.name;
        } else {
          if (item.id === companyId) temp = item.name;
        }
      });
      this.currentCompany = temp;
      this.$store.dispatch('changeCurrentCompany', (temp || 'getCompanySuccess'));
    },
    getCompanyList() {
      this.$http.post('/service/currentsetting/companylist').then(res => {
        if (res.code !== 500) {
          this.companyList = res.data || [];
          this.getCurrentCompany(null);
        } else {
          this.$store.dispatch('changeCurrentCompany', 'getCompanyError');
        }
      })
    },
    onCompanyCommand(companyId) {
      this.$http.post('/service/currentsetting/switchcompany?companyId=' + companyId).then(res => {
        if(res.code === 0) {
          this.$confirm('切换企业将清空当前页面数据并回到首页, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            this.getCurrentCompany(companyId);
            this.$router.push('/');
          });
        }
      });
    },
    onEditPassword() {
      this.dialogFormVisible = true;
    },
    toMessageCenter() {
      this.$router.push('/message/index');
    },
    onConfirmPassword() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const data = {
            oldPwd: this.form.password,
            newPwd: this.form.newPassword,
          };
          this.$http.request({
            url: '/sys/user/changePwd',
            method: 'post',
            data,
          }).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
              });

              this.$refs.ruleForm.resetFields();
              this.dialogFormVisible = false;
              this.$store.dispatch('LogOut').then(() => {
                window.location.href = '/logout';
              });
            }
            if (res.code === 1) {
              // this.$message({
              //   message: res.msg,

              // });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onCancelPassword() {
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false;
    },

    handleScreen() {
      fullscreenToggel();
    },
    showCollapse() {
      this.$store.commit('SET_COLLAPSE');
    },
    setScreen() {
      this.$store.commit('SET_FULLSCREN');
    },
    logout() {
      this.$confirm('退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          window.location.href = '/logout';
        });
      });
    },
  },
};

</script>

<style lang="scss">
  .company-change {
    margin: 2px 12px 0 0;
    .iconfont {
      width: 100%;
      position: absolute;
      top: -2px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .edit-password {
    .el-dialog__header {
      padding: 20px 20px 18px;
      border-bottom: 1px solid #dcdfe6;
    }

    .el-input {
      width: 70%;
    }
  }

</style>
