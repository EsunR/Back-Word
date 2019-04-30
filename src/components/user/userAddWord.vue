<template>
  <div id="addWord" class="e_card">
    <div class="topbar">
      <div class="title">添加单词</div>
      <div class="mode">
        <el-radio-group v-model="form.unit">
          <el-radio-button :label="'4'">四级词汇</el-radio-button>
          <el-radio-button :label="'6'">六级词汇</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="form">
      <div class="group">
        <label for="word">英文单词：</label>
        <el-input name="word" placeholder="如：add" prefix-icon="el-icon-edit" v-model="form.word"></el-input>
      </div>
      <div class="group" v-for="(item, index) in form.chinese" :key="index">
        <label>中文释义{{index+1}}：</label>
        <el-input
          name="word"
          placeholder="如：v. 添加"
          prefix-icon="el-icon-edit"
          v-model="form.chinese[index]"
        ></el-input>
      </div>
      <div class="btn_box">
        <el-button type="danger" @click="reset">重置数据</el-button>
        <el-button type="primary" @click="addChinese">添加释义</el-button>
        <el-button type="success" @click="submit">提交单词</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        unit: "4",
        word: "",
        chinese: [""]
      }
    };
  },
  methods: {
    addChinese() {
      this.form.chinese.push("");
    },
    reset() {
      this.form.word = "";
      this.form.chinese = [""];
    },
    submit() {
      if (this.form.word == "") {
        this.$message.error("请填写英文单词");
        return;
      }
      for (let i in this.form.chinese) {
        if (this.form.chinese[i] == "") {
          this.$message.error("中文释义不完整");
          return;
        }
      }
      this.axios
        .post("/addWord", this.form)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("添加成功");
            this.reset();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    margin-bottom: 0px;
    text-align: left;
  }
}
.form {
  margin-top: 20px;
  .group {
    display: flex;
    margin-bottom: 20px;
    label {
      width: 90px;
      text-align: left;
      color: rgba(0, 0, 0, 0.6);
      line-height: 40px;
      font-size: 14px;
    }
  }
  .btn_box {
    display: flex;
    justify-content: center;
  }
}
</style>