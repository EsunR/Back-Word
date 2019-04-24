<template>
  <div id="backErrorWord" class="e_card">
    <div class="warning" v-if="wordList.length == 0">暂时没有可供默写的单词了，快去学习新单词吧！</div>
    <div class="wrapper" v-if="wordList.length != 0">
      <div class="title">错词默写 | 中文释义：</div>
      <hr>
      <div class="chinese">
        <div class="mean" v-for="(item,index) in wordList[index].chinese" :key="index">{{item}}</div>
      </div>
      <div class="back">
        <el-input placeholder="请默写单词" prefix-icon="el-icon-edit" v-model="backWord"></el-input>
        <el-button type="primary" @click="submit">提 交</el-button>
      </div>
      <el-button class="home_btn" round @click="$router.push('/user')">
        <i class="mdi mdi-home"></i> 返回首页
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wordList: [
        {
          id: "",
          word: "",
          chinese: []
        }
      ],
      index: 0,
      backWord: ""
    };
  },
  methods: {
    getWordStatus() {
      this.axios
        .get("/getWordStatus?status=3")
        .then(res => {
          if (res.data.code == 1) {
            this.wordList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    },
    submit() {
      if (this.backWord == "") {
        this.$message("请填写单词");
      } else {
        if (this.backWord != this.wordList[this.index].word) {
          this.$message.error(
            `默写错误，单词 “${this.wordList[this.index].word}” 已加入错词本`
          );
          this.postWordStatus(3);
        } else {
          this.$message.success(
            `单词 “${this.wordList[this.index].word}” 已通过测试`
          );
          this.postWordStatus(2);
        }
        this.index++;
        this.backWord = "";
      }
    },
    postWordStatus(status) {
      let obj = {
        id: this.wordList[this.index].id.toString(),
        status: status.toString()
      };
      this.axios
        .post("/postWordStatus", obj)
        .then(res => {
          if (res.data.code == 1) {
            return;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    }
  },
  mounted() {
    this.getWordStatus();
  }
};
</script>

<style lang='scss' scoped>
#backErrorWord {
  position: relative;
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 45px;
  }
  .chinese {
    line-height: 30px;
    padding-left: 10px;
  }
  .back {
    margin-top: 20px;
    display: flex;
    .el-input {
      margin-right: 20px;
    }
  }
  .home_btn {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>