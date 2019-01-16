<template>
  <el-form-item :prop="namePrefix + config.name" :label="config.label">
    <!-- select 选择器 -->
    <el-select
      v-if="config.type === 'select'"
      v-model="form[namePrefix + config.name]"
      :placeholder="config.placeholder"
      :disabled="!!config.disabled"
      @change="onChangeSelect(namePrefix + config.name)"
      clearable>
      <el-option
        v-for="(option, index) in config.options"
        :key="'item-select-option' + option.value + index"
        :label="option.label"
        :value="option.value">
      </el-option>
    </el-select>
    <!-- 单选框组 -->
    <el-radio-group
      v-else-if="config.type === 'radio'"
      v-model="form[namePrefix + config.name]"
      :disabled="!!config.disabled">
      <el-radio
        v-for="option in config.options"
        :key="'item-radio-option' + option.value"
        :label="option.value"
        >{{option.label}}</el-radio>
    </el-radio-group>
    <!-- 日期选择器 -->
    <el-date-picker
      v-else-if="config.type === 'date-picker'"
      v-model="form[namePrefix + config.name]"
      type="daterange"
      value-format="yyyy-MM-ddTHH:mm:ss"
      :default-time="['00:00:00', '23:59:59']"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :disabled="!!config.disabled">
    </el-date-picker>
    <!-- 输入框 -->
    <el-input
      v-else
      v-model="form[namePrefix + config.name]"
      :placeholder="config.placeholder"
      :disabled="!!config.disabled">
      <template v-if="!!config.append" slot="append">{{config.append}}</template>
    </el-input>
  </el-form-item>
</template>

<script>
export default {
  props: {
    namePrefix: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default () {
        return {};
      },
    },
    form: {
      type: Object,
      default () {
        return {};
      },
    },
    whileHandle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    onChangeSelect(name) {
      if (this.whileHandle[name]) {
        this.whileHandle[name]();
      }
    },
  },
};
</script>

<style lang="scss">
</style>
