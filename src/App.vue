<template>
  <el-container id="app">
    <el-header class="header shadow_base">
      <div class="left">宿舍分配系统 | Dormitory Allocation System</div>
      <div class="right">
        <span class="mdi mdi-account-circle"></span>
        <span class="user_name">用户：{{name}}</span>
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
      name: "李大富"
    };
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



