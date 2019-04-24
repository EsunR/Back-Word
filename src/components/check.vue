<template>
  <div id="check">
    <div class="e_card">正在检查用户身份... ...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getUserInfo() {
      this.axios
        .get("/getUserInfo")
        .then(res => {
          if (res.data.code == 1) {
            let identity = res.data.data.identity;
            if (identity == "admin") {
              this.$router.push("/admin");
            } else {
              this.$router.push("/user");
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<style lang='scss' scoped>
.e_card {
  color: #fff;
  background-color: #f56c6c;
}
</style>