<template>
  <div class="filter-model">
    <el-row class="model-box-group" :gutter="20">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4" v-for="(config, index) in configs" :key="index" v-show="index<3 ? true:showAll" style="height: 42px;">
        <div class="model-box" style="margin-right:0;">
          <el-select v-if="config.type === 'select'"
            :value="inputValue[index]"
            @input="value => updateValue(index, value)"
            :placeholder="config.placeholder"
            :disabled="config.disabled"
            clearable
            style="width:100%;">
            <el-option
              v-for="option in config.options"
              :key="option.value"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
          <el-radio-group v-else-if="config.type === 'radio'"
            :value="inputValue[index]"
            @input="value => updateValue(index, value)">
            <el-radio-button
              v-for="option in config.options"
              :key="option.label"
              :label="option.label">
            </el-radio-button>
          </el-radio-group>
          <el-date-picker v-else-if="config.type === 'date-picker'"
            :value="inputValue[index]"
            @input="value => updateValue(index, value)"
            type="daterange"
            value-format="yyyy-MM-ddTHH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:100%;">
          </el-date-picker>
          <el-date-picker v-else-if="config.type === 'date'"
            :value="inputValue[index]"
            :placeholder="config.placeholder"
            @input="value => updateValue(index, value)"
            type="month"
            value-format="yyyy-MM"
            style="width:100%;">
          </el-date-picker>
          <el-input v-else
            :placeholder="config.placeholder"
            :value="inputValue[index]"
            @input="value => updateValue(index, value)" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6" style="display: flex;height: 42px;">
        <div class="model-box">
          <el-button type="primary" @click="onQuery">查询</el-button>
        </div>
        <div class="model-box">
          <el-button @click="onReset">重置</el-button>
        </div>
        <div class="model-box" v-if="configs.length > 3">
          <a @click="onResetApart" v-if="showAll" style="color: #409EFF;text-decoration:none;cursor: pointer;">收起 <i class="el-icon-arrow-up"></i></a>
          <a @click="showAll=true" v-else style="color: #409EFF;text-decoration:none;cursor: pointer;">展开 <i class="el-icon-arrow-down"></i></a>
        </div>
      </el-col>
    </el-row>
    <div class="btn-group" :style="{marginBottom: BtnMarginBot+'px', marginTop: btnMarginTop+'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';

export default {
  props: {
    configs: {
      type: Array,
      default () {
        return [];
      },
    },
  },
  data() {
    return {
      inputValue: {},
      paramsValue: {},
      showAll: false,
      BtnMarginBot: 20,
      btnMarginTop: 10,
    };
  },
  watch: {
    BtnMarginBot() {
      let hasedBtn = 20;
      this.$nextTick(() => {
        if (this.hasContent()) {
          hasedBtn = 20;
        } else {
          hasedBtn = 0;
        }
      });
      return hasedBtn;
    },
  },
  methods: {
    hasContent() {
      const innerHTML = this.$el.getElementsByClassName('btn-group')[0].innerHTML;
      const innerText = this.$el.getElementsByClassName('btn-group')[0].innerText;
      return innerHTML !== '' || innerText !== '';
    },
    onQuery() {
      this.$emit('on-query', cloneDeep(this.paramsValue));
    },
    onReset() {
      this.inputValue = {};
      this.paramsValue = {};
      this.$emit('on-reset');
    },
    onResetApart() {
      this.showAll = false;
      for (const index in this.inputValue) {
        if (Number(index) > 2) {
          const inputVal = this.inputValue[index];
          const config = this.configs[index];
          if (typeof inputVal === 'string') {
            this.deleteParamByKey([config.key]);
          } else {
            this.deleteParamByKey(config.keys);
          }
          delete this.inputValue[index];
        }
      }
    },
    updateValue(index, value, needDebounce) {
      index = parseInt(index, 10);
      const oldVal = this.inputValue[index];
      if (oldVal === value) {
        return;
      }
      const cloneDeepValue = cloneDeep(this.inputValue);
      this.$set(this.inputValue, index, value);
      this.$set(cloneDeepValue, index, value);

      if (needDebounce) {
        this.emitValueDebounce(cloneDeepValue);
      } else {
        this.constructParamsByConfig(cloneDeepValue);
      }
    },
    emitValueDebounce: debounce((val) => {
      this.constructParamsByConfig(val);
    }, 500),
    constructParamsByConfig(val) {
      for (const index in val) {
        const config = this.configs[index];
        const paramVal = val[index];
        if (config.type === 'date-picker') {
          if (paramVal) {
            this.paramsValue[config.keys[0]] = paramVal[0];
            this.paramsValue[config.keys[1]] = paramVal[1];
          } else {
            this.deleteParamByKey(config.keys);
          }
        } else if (val[index] || val[index] === 0) {
          this.paramsValue[config.key] = val[index];
        } else {
          this.deleteParamByKey([config.key]);
        }
      }
    },
    deleteParamByKey(keys) {
      keys.forEach((key) => {
        delete this.paramsValue[key];
      });
    },
  },
  mounted() {
    if (!this.hasContent()) {
      this.BtnMarginBot = 0;
    }
  },
};
</script>

<style lang="scss" scoped>
  .filter-model {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    .model-box-group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .model-box {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
</style>
