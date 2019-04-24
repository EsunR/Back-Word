<template>
  <div id="learning" class="e_card">
    <div class="title">请选择词汇标准：</div>
    <hr>
    <div class="select_section">
      <div class="section" style="background: #409EFF" @click="$router.push('./learning/4')">
        <div class="inner">
          <div class="top">四级词汇</div>
          <div class="bottom">CET 4</div>
        </div>
      </div>
      <div class="section" style="background: #F56C6C" @click="$router.push('./learning/6')">
        <div class="inner">
          <div class="top">六级词汇</div>
          <div class="bottom">CET 6</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.title {
  font-size: 1.5rem;
}
.select_section {
  display: flex;
  margin-top: 20px;
  .section {
    width: 50%;
    height: 200px;
    margin: 0 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .inner {
      text-align: center;
      width: 150px;
      color: #fff;
      .top {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #fff;
        font-size: 1rem;
      }
      .bottom {
        font-size: 1.5rem;
      }
    }
  }
}
</style>