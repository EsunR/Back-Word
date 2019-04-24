<template>
  <el-container id="app">
    <el-header class="header shadow_base">
      <div class="left" @click="$router.push('/check')" style="cursor: pointer;">四六级单词学习</div>
      <div class="right">
        <span class="mdi mdi-account-circle"></span>
        <span class="user_name">用户：{{name}}</span>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-circle-close-outline"
          style="margin-left: 20px;position: relative; bottom: 8px;"
          plain
          @click="logOut"
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
  data() {
    return {
      name: ""
    };
  },
  methods: {
    logOut() {
      localStorage.clear();
      window.location.href = global.login_location;
    },
    getUserInfo() {
      this.axios
        .get("/getUserInfo")
        .then(res => {
          if (res.data.code == 1) {
            this.name = res.data.data.name;
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

<style lang="scss" scoped>
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  .left {
    background-color: #409eff;
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
      font-size: 14px;
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





