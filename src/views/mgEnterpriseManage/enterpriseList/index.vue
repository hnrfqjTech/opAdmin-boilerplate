<template>
  <div class="admin-enterprise-list">
    <temp-list :tempConf="tempConf" ref="enterTemp">
      <template slot="filter">
        <el-button  icon="el-icon-plus" type="primary" @click="onEdit()">新增企业</el-button>
        <el-button type="danger" @click="delEnterprise">删除</el-button>
        <!-- <el-button size="mini" type="primary">批量导入企业</el-button> -->
      </template>

      <template slot-scope="helperData">
        <hm-pager-grid
          ref="pagerGrid"
          :border="false"
          row-key="tableComment"
          :data="helperData.tableList"
          :page="helperData.page"
          @selection-change="handleSelectionChange"
          @size-change="helperData.onSizeChange"
          @current-change="helperData.onPageChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="企业名称"></el-table-column>
          <el-table-column prop="taxCode" label="企业税号"></el-table-column>
          <el-table-column prop="taxAreaName" label="地区名称"></el-table-column>
          <el-table-column prop="taxOrgName" label="税局名称"></el-table-column>
          <el-table-column prop="contactName" label="联系人姓名" min-width="90px"></el-table-column>
          <el-table-column prop="contactPhone" label="联系人手机号码" min-width="120px"></el-table-column>
          <el-table-column prop="deviceNo" label="盒子机器编码" min-width="100px"></el-table-column>
          <el-table-column prop="deviceCode" label="税控盘机器号码" min-width="120px"></el-table-column>
          <el-table-column prop="extNo" label="分机号"></el-table-column>
          <el-table-column prop="refuseReason" label="退回原因"></el-table-column>
          <el-table-column label="操作" align="center" min-width="150px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="onEdit(scope.row.id)" v-if="scope.row.status === 1000">编辑</el-button>
              <el-button size="mini" type="primary" @click="signAgree(scope.row)">签订协议</el-button>
            </template>
          </el-table-column>
        </hm-pager-grid>
      </template>
    </temp-list>
  </div>
</template>

<script>
import TempList from '@/visualize/template/list';
import tempConf from '@/visualize/data/admin_enterpriseList';

export default {
  name: 'enterpriseList',
  components: {
    TempList,
  },
  data () {
    return {
      tempConf,
      multipleSelection: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onEdit(id) {
      const basePath = '/mgEnterpriseManage/enterpriseEdit';
      const pathUrl = id === undefined ? basePath : basePath + '?id=' + id;
      this.$router.push({
        path: pathUrl,
      });
    },
    delEnterprise() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的企业',
        });
      } else {
        const vm = this;
        const ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        vm.$confirm('确定要删除选中的记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const url = '/service/companyinfo/delete';
          vm.$http.post(url, ids)
            .then((res) => {
              if (res.code === 0) {
                vm.$message({
                  type: 'success',
                  message: '删除成功!',
                });
                vm.$refs.enterTemp.onReset();
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }).catch(() => {

        });
      }
    },
    signAgree(row) {
      const routPath = '/mgEnterpriseManage/signAgree';
      this.$router.push({
        path: routPath,
        query: {
          id: row.id,
          name: row.name,
          taxCode: row.taxCode,
        },
      });
    },
  },
};
</script>

<style lang='scss' scoped>


</style>
