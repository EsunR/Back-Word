<template>
  <div id="success">
    <div class="top">
      <div class="title">
        <i class="el-icon-success"></i> 提交成功
      </div>
      <div class="subtitle">系统已为您挑选出合适的宿舍，结果如下：</div>
    </div>
    <roomList></roomList>
  </div>
</template>

<script>
import roomList from "./subComponent/roomList.vue";
export default {
  data() {
    return {};
  },
  components: {
    roomList
  },
  mounted() {
    if (this.$store.getters.getRoom != "") {
      this.$router.push("/");
    }
  }
};
</script>

<style lang='scss' scoped>
.top {
  background-image: linear-gradient(120deg, #67c23a 0%, #7ec45c 100%);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  color: white;
  .title {
    font-size: 25px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #fff;
  }
}
</style>