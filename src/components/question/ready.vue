<template>
  <div id="ready" class="e_card">
    <div class="title">
      <div class="tag">提示：</div>
      <hr>
      <div class="subtitle">接下来您要填写几个问题，系统将根据您的答案来自动筛选合适的宿舍。</div>
    </div>
    <div class="btn_box">
      <el-button size="medium" type="success" icon="el-icon-circle-check-outline" @click="ready">确 定</el-button>
      <el-button
        size="medium"
        type="danger"
        icon="el-icon-circle-close-outline"
        @click="$router.push('/home')"
      >返 回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    ready() {
      this.$router.push("./time");
      this.$store.commit("setValue", { processing: true });
    }
  }
};
</script>

<style lang='scss' scoped>
.title {
  .tag {
    font-size: 25px;
    font-weight: bold;
  }
}
.btn_box {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>