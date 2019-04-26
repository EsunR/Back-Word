<template>
  <div id="question">
    <div class="top e_card">
      <el-steps :active="active" finish-status="success" simple>
        <el-step title="准备"></el-step>
        <el-step title="作息时间"></el-step>
        <el-step title="爱好选项"></el-step>
        <el-step title="习惯选项"></el-step>
      </el-steps>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  watch: {
    $route(to) {
      let link = to.fullPath.split("/").pop();
      switch(link){
        case 'ready':
          this.active = 0;
          break;
        case 'time': 
          this.active = 1;
          break;
        case 'hobbies':
          this.active = 2;
          break;
        case 'habit': 
          this.habit = 3;
          break;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.top {
  margin-bottom: 30px;
}
</style>