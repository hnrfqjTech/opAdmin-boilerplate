<template>
  <div class="page-edit">
    <hm-panel :title="title">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :label-position="labelPosition"
        label-suffix=" "
        :label-width="labelWidth + 'px'"
        class="edit-form-width"
        :style="'width:' + formWidth + '%;'">
        <div v-for="(floor, fIndex) in itemConf.params" :key="'form-item-floor' + fIndex">
          <!-- 标题 -->
          <div v-if="itemConf.titles && itemConf.titles[fIndex]" class="tip-title">- {{itemConf.titles[fIndex]}} -</div>
          <!-- 基础模式 -->
          <el-row :gutter="60" v-if="floor instanceof Array">
            <el-col :span="grid" v-for="(config, index) in floor" :key="'form-item' + index">
              <form-item-input :config="config" :form="form" :whileHandle="whileHandle"></form-item-input>
            </el-col>
          </el-row>
          <!-- 添加多行模式 -->
          <div class="add-row-wrap" v-else>
            <div v-if="showAddBtn"><el-button type="primary" size="mini" @click="onAddNew">增加</el-button></div>
            <div style="position: relative;" v-for="(list, lIndex) in floor.list" :key="'row-list' + lIndex">
              <div v-if="list.length > 0 && lIndex > 0" class="icon" @click="onDeleteNew(lIndex)"><i class="el-icon-circle-close-outline"></i></div>
              <el-row v-if="list.length > 0" class="row" style="margin-left: 0; margin-right: 0;" :gutter="60">
                <el-col style="padding:0;" :span="grid" v-for="(config, index) in list" :key="'form-item-add' + index">
                  <form-item-input :namePrefix="lIndex + '@'" :config="config" :form="form" :whileHandle="whileHandle"></form-item-input>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- ohter -->
        </div>
        <div class="edit-form-btngroup">
          <el-button @click="onReset">重置</el-button>
          <el-button type="primary" style="margin-left: 20px;" @click="save('form')">保存</el-button>
        </div>
      </el-form>
    </hm-panel>
  </div>
</template>

<script>
import merge from 'lodash/merge';
import FormItemInput from '@/visualize/widget/form-item-input';

const defaultForm = {
  select: {
    val: '',
    trigger: 'change',
  },
  radio: {
    val: '',
    trigger: 'change',
  },
  'date-picker': {
    val: [],
    trigger: 'change',
  },
  input: {
    val: '',
    trigger: 'blur',
  },
};

export default {
  components: {
    FormItemInput,
  },
  props: {
    cols: {
      type: [String, Number],
      default: 2,
    },
    itemConf: {
      type: Object,
      defalut() {
        return {
          labelWidth: 140,
          params: [],
        };
      },
    },
    editInitData: {
      type: Object,
      default() {
        return {};
      },
    },
    showAddBtn: {
      type: Boolean,
      default: true,
    },
    whileHandle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data () {
    return {
      title: '新增',
      form: {},
      rules: {},
      delIndex: [],
    };
  },
  computed: {
    labelWidth() {
      return this.itemConf.labelWidth || 140;
    },
    tempcols() {
      return parseInt(this.cols, 10);
    },
    formWidth() {
      let width = 95;
      if (Object.is(1, this.tempcols)) {
        width = 50;
      }
      return width;
    },
    grid() {
      let gridNum = 12;
      if (Object.is(1, this.tempcols)) {
        gridNum = 24;
      }
      return gridNum;
    },
    labelPosition() {
      let position = 'right';
      if (Object.is(1, this.tempcols)) {
        position = 'left';
      }
      return position;
    },
    addKey() {
      return (this.itemConf.custom && this.itemConf.custom.add && this.itemConf.custom.add.key) || '';
    },
  },
  watch: {
    editInitData: {
      handler(newVal) {
        console.log(newVal);
        console.log(111);
        this.title = '编辑';
        for (const name in newVal) {
          // 基础模式
          this.form[name] = newVal[name];
          // 添加多行模式
          if (name === this.addKey && newVal[this.addKey]) {
            const addForm = newVal[this.addKey];
            this.onAddNew('reset');
            addForm.forEach((item, index) => {
              if (index > 0) this.onAddNew();
              for (const key in item) {
                this.form[index + '@' + key] = item[key];
              }
            });
            delete this.form[this.addKey];
          }
        }
      },
      deep: true,
    },
  },
  created() {
    this.itemConf.params.forEach((floor) => {
      if (floor instanceof Array) {
        // 基础模式
        this._setBaseFormRules(floor, this.itemConf.validates);
      } else {
        // 添加多行模式
        this._setAddFormRules(floor, this.itemConf.validates);
      }
    });
  },
  mounted () {},
  methods: {
    _setRules(item, validates, ruleKey) {
      const ruleItem = [
        { required: !!item.require, message: item.label + ' 不能为空值', trigger: defaultForm[item.type].trigger },
      ];
      if (validates) {
        for (const name in validates) {
          if (name === item.name) {
            ruleItem.push(
              {
                validator: validates[name].validator,
                message: validates[name].message,
                trigger: defaultForm[item.type].trigger,
              },
            );
          }
        }
      }
      this.$set(this.rules, ruleKey, ruleItem);
    },
    _setBaseFormRules(floor, validates) {
      floor.forEach((item) => {
        this.$set(this.form, item.name, defaultForm[item.type].val);
        this._setRules(item, validates, item.name);
      });
    },
    _setAddFormRules(floor, validates) {
      const fList = floor.list || [];
      for (const list in fList) {
        fList[list].forEach((item, index) => {
          const tempName = list + '@' + item.name;
          if (!this.form[tempName]) this.$set(this.form, tempName, defaultForm[item.type].val);
          this._setRules(item, validates, tempName);
        });
      }
    },
    _clearValidate() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    setDisabled(name, status) {
      this.itemConf.params.forEach((floor) => {
        if (floor instanceof Array) {
          // 基础模式
          floor.forEach((item) => {
            if (name === item.name) {
              item.disabled = status;
            }
          });
        } else {
          // 添加多行模式
          for (const list in floor.list) {
            floor.list[list].forEach((item, index) => {
              if (name === item.name) {
                item.disabled = status;
              }
            });
          }
        }
      });
    },
    /*
      值联动
    */
    setValue(name, val) {
      this.form[name] = val;
    },
    onAddNew(type) {
      this.itemConf.params.forEach((floor) => {
        if (floor instanceof Array) {
          // Array
        } else {
          // 添加多行模式
          if (floor.custom === 'add') {
            const tempList = floor.list[0];
            if (type === 'reset') floor.list = [];
            floor.list.push(tempList);
            this._setAddFormRules(floor, this.itemConf.validates);
          }
        }
        this._clearValidate();
      });
    },
    onDeleteNew(index) {
      this.$confirm('此操作将删除该行数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.itemConf.params.forEach((floor) => {
          if (floor instanceof Array) {
            // Array
          } else {
            // 添加多行模式
            if (floor.custom === 'add') {
              this.$set(floor.list, index, []);
              this.delIndex.push(index);
            }
          }
        });
      }).catch(() => {});
    },
    onReset() {
      if (Object.is(this.title, '新增')) {
        this.$refs.form.resetFields();
      } else {
        this.itemConf.params.forEach((floor) => {
          if (floor instanceof Array) {
            // 基础模式
            floor.forEach((item) => {
              if (!item.disabled) {
                this.$set(this.form, item.name, defaultForm[item.type].val);
              }
            });
          } else {
            // 添加多行模式
            for (const list in floor.list) {
              floor.list[list].forEach((item, index) => {
                if (!item.disabled) {
                  this.$set(this.form, list + '@' + item.name, defaultForm[item.type].val);
                }
              });
            }
          }
        });
      }
      this._clearValidate();
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let extendFrom = {};
          const baseForm = {};
          const addForm = {};
          let addArr = [];
          for (const key in this.form) {
            if (key.search('@') === -1) {
              baseForm[key] = this.form[key];
            } else {
              addForm[key] = this.form[key];
            }
          }
          // 添加多行模式
          for (const key in addForm) {
            const tempArr = key.split('@');
            if (!this.delIndex.includes(Number(tempArr[0]))) {
              if (!addArr[tempArr[0]]) addArr[tempArr[0]] = {};
              addArr[tempArr[0]][tempArr[1]] = addForm[key];
            }
          }
          addArr = addArr.filter((item) => {
            const result = item !== null;
            return result;
          });

          extendFrom = merge({}, baseForm, {
            [this.addKey]: addArr,
          });
          // console.info('extendFrom', extendFrom);
          this.$emit('save-form', extendFrom);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.page-edit {
  .edit-form-width {
    width:50%;
    margin:0 auto;
    min-width:680px;
  }
  .tip-title {
    color: #999999;
    font-size: 13px;
    padding: 10px 0;
  }
  .edit-form-btngroup{
    display: flex;
    justify-content: center;
  }
  .add-row-wrap {
    .icon {
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 22px;
      color: rgb(220, 223, 230);
      background: #fff;
      z-index: 99;
      display: -none;
      cursor: pointer;
    }
    &:hover {
      .icon {
        display: block;
        color: red;
      }
    }
    .el-icon-circle-close-outline {
      float: left;
    }
    .row {
      border: 1px solid rgb(220, 223, 230);
      padding: 20px 20px 0 20px;
      margin: 15px 0;
    }
  }
}

.form-select-width {
  width: 100%;
}
.line {
  text-align: center;
}
.el-checkbox-group .el-checkbox {
  width: 160px;
  padding-right: 20px;
}
.el-checkbox-group .el-checkbox+.el-checkbox {
  margin-left: 0;
}
</style>
