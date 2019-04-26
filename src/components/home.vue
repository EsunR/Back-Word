<template>
  <div id="home">
    <transition>
      <div class="top e_card">
        <img src="../assets/index.jpg">
        <div class="title">
          <div class="welcome_title">Welcome，欢迎使用宿舍分配系统</div>
          <hr>
          <div class="subtitle">
            <p>检测到您是第一次使用该系统，系统将引导您完成宿舍分配工作。</p>
            <p style="margin-bottom: 0px;">点击右下方按钮即可开始进入分配流程。</p>
          </div>
        </div>
        <el-button class="start" type="success" icon="el-icon-check" circle @click="$router.push('/question')"></el-button>
      </div>
    </transition>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scope>
.top {
  position: relative;
  img {
    width: 1200px;
    margin: -20px;
    border-radius: 10px 10px 0 0;
    margin-bottom: 20px;
  }
  .title {
    .welcome_title {
      font-size: 25px;
      font-weight: 600;
    }
    hr {
      margin: 10px 0;
    }
  }
  .start {
    position: absolute;
    right: 20px;
    font-size: 20px;
    bottom: -20px;
  }
}

</style>