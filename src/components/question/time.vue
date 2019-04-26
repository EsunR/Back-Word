<template>
  <div id="time" class="e_card_big">
    <div class="title">
      <div class="tag">作息时间</div>
      <hr>
      <div class="subtitle">请选择您的早起时间与晚起时间，这将作为您分配宿舍的关键参考数据。</div>
    </div>

    <div class="time_box">
      <div class="getUpTime">
        <label>起床时间：</label>
        <el-time-picker
          v-model="getUpTime"
          :picker-options="{
      selectableRange: '5:00:00 - 11:59:00'
    }"
          value-format="HH:mm"
          placeholder="请选择"
          format="HH:mm"
        ></el-time-picker>
      </div>

      <div class="sleepTime">
        <label>睡觉时间：</label>
        <el-time-picker
          v-model="sleepTime"
          :picker-options="{
            selectableRange: ['00:00:00 - 02:59:00', '21:00:00 - 23:59:00']
          }"
          value-format="HH:mm"
          placeholder="请选择"
          format="HH:mm"
        ></el-time-picker>
      </div>
    </div>

    <div class="btn_box">
      <el-button icon="el-icon-arrow-left" type="success" circle @click="previous"></el-button>
      <el-button icon="el-icon-arrow-right" type="success" circle @click="next"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getUpTime: this.$store.state.form.getUpTime,
      sleepTime: this.$store.state.form.sleepTime
    };
  },
  methods: {
    next() {
      if (this.getUpTime == "" || this.sleepTime == "") {
        this.$message.error("请选择时间");
        return;
      }
      this.$router.push("/question/hobbies");
      this.$store.commit("setFormValue", {
        getUpTime: this.getUpTime,
        sleepTime: this.sleepTime
      });
    },
    previous() {
      this.$router.push("/question/ready");
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
.time_box {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  label {
    background-color: #67c23a;
    color: #fff;
    padding: 0 20px;
    line-height: 40px;
    display: inline-block;
    border-radius: 5px 0 0 5px;
  }
  .getUpTime {
    margin-right: 200px;
  }
}
.btn_box {
  position: absolute;
  right: 30px;
  bottom: -20px;
}
</style>

<style lang="scss">
#time {
  position: relative;
  padding-bottom: 60px;
  .el-input__inner {
    border-radius: 0px 5px 5px 0px;
  }
  .el-date-editor {
    width: 300px;
  }
}
</style>