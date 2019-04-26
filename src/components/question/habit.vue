<template>
  <div id="hobbies" class="e_card">
    <div class="title">
      <div class="tag">习惯选项</div>
      <hr>
      <div class="subtitle">请填写您的习惯选项，系统将为您与您习惯相似的舍友</div>
    </div>

    <div class="main">
      <div class="group">
        <div class="label">1. 是否信奉宗教？</div>
        <el-radio-group v-model="form.religion">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </div>
      <div class="group">
        <div class="label">2. 是否希望有一个安静的环境？</div>
        <el-radio-group v-model="form.quite">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </div>
      <div class="group">
        <div class="label">3. 是否会在宿舍经常有产生噪音的行为？</div>
        <el-radio-group v-model="form.noise">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </div>
      <div class="group">
        <div class="label">4. 是否习惯使用公放设备？</div>
        <el-radio-group v-model="form.sound">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </div>
      <div class="group">
        <div class="label">5. 是否会经常长时间待在宿舍？</div>
        <el-radio-group v-model="form.stay">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="btn_box">
      <el-button icon="el-icon-arrow-left" type="success" circle @click="previous"></el-button>
      <el-button icon="el-icon-success" type="success" round @click="finishClick">提交结果</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        religion: this.$store.state.form.religion,
        quite: this.$store.state.form.quite,
        noise: this.$store.state.form.noise,
        sound: this.$store.state.form.sound,
        stay: this.$store.state.form.stay
      }
    };
  },
  methods: {
    finishClick(){
      for(let key in this.form){
        if(this.form[key] === ""){
          this.$message.error('有未填项，请检查');
          return;
        }
      }
      let obj = {};
      for(let key in this.form){
        obj[key] = this.form[key].toString();
      }
      this.$store.commit("setFormValue", obj);
      this.$confirm('您确定要提交问卷吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postSurvey();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        });
      });
    },
    postSurvey() {
      this.axios
        .post('/postSurvey', this.$store.state.form)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success('提交成功');
          }
      })
      .catch(err => {
        console.log(err);
        this.$message.error('服务器无法连接');
      });
    },
    previous() {
      this.$router.push("/question/hobbies");
    }
  }
};
</script>

<style lang='scss' scoped>
#hobbies {
  position: relative;
}
.title {
  .tag {
    font-size: 25px;
    font-weight: bold;
  }
}
.btn_box {
  position: absolute;
  right: 30px;
  bottom: -20px;
}
.group {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px dashed rgba(0, 0, 0, 0.1);
  &:first-child {
    border: none;
    margin-top: 0px;
  }
  .label {
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>