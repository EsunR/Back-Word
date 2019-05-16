<template>
  <el-container id="app">
    <el-header class="header shadow_base">
      <div
        class="left"
        style="cursor:pointer"
        @click="$router.push('/')"
      >宿舍分配系统 | Dormitory Allocation System</div>
      <div class="right">
        <span class="mdi mdi-account-circle"></span>
        <span class="user_name">用户：{{$store.state.name}}</span>
        <el-button
          style="margin-left: 10px; position: relative; bottom: 10px;"
          type="danger"
          icon="el-icon-error"
          size="small"
          @click="logout"
        >注销</el-button>
      </div>
    </el-header>
    <el-main>
      <transition>
        <router-view></router-view>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    getUserInfo() {
      this.axios
        .get("/getUserInfo")
        .then(res => {
          if (res.data.code == 1) {
            this.$store.commit("setValue", res.data.data);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    },
    logout() {
      localStorage.clear();
      window.location.href = this.COMMON.login_location;
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  .left {
    background-color: #67c23a;
    color: #fff;
    margin-left: -20px;
    padding: 0 20px;
    font-size: 18px;
  }
  .right {
    color: rgba($color: #000000, $alpha: 0.7);
    .mdi {
      font-size: 35px;
      margin-right: 10px;
    }
    .user_name {
      position: relative;
      top: -7px;
    }
  }
}

.el-main {
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 0px;
  overflow: inherit;
}
</style>



