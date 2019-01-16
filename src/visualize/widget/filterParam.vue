<template>
  <div class="filter-model list-btn-group">
    <div class="model-box" v-for="(config, index) in configs" :key="index">
      <el-select v-if="config.type === 'select'"
        :value="inputValue[index]"
        @input="value => updateValue(index, value)"
        :placeholder="config.placeholder"
        :disabled="config.disabled"
        clearable>
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
        end-placeholder="结束日期">
      </el-date-picker>
      <el-date-picker v-else-if="config.type === 'date'"
        :value="inputValue[index]"
        :placeholder="config.placeholder"
        @input="value => updateValue(index, value)"
        type="month"
        value-format="yyyy-MM">
      </el-date-picker>
      <el-input v-else
        :placeholder="config.placeholder"
        :value="inputValue[index]"
        @input="value => updateValue(index, value)" clearable></el-input>
    </div>
    <div class="model-box">
      <el-button type="primary" @click="onQuery">查询</el-button>
    </div>
    <div class="model-box">
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
    <div class="btn-group">
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
    };
  },
  methods: {
    onQuery() {
      this.$emit('on-query', cloneDeep(this.paramsValue));
    },
    onReset() {
      this.inputValue = {};
      this.paramsValue = {};
      this.$emit('on-reset');
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
};
</script>

<style lang="scss" scoped>
  .filter-model {
    display: flex;
    flex-wrap: wrap;
    .model-box {
      display: flex;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
</style>
