<template>
  <div id="manageWord">
    <div class="search_bar e_card">
      <div class="title">
        <i class="el-icon-document"></i> 查询单词 | Search Word
      </div>
      <el-input placeholder="请输入查询单词" v-model="key" class="input-with-select">
        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: ""
    };
  }
};
</script>

<style lang='scss' scoped>
</style>