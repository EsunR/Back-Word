<template>
  <div id="cet" class="e_card">
    <div
      class="warning"
      v-if="wordList.length == 0"
    >您已经学会了所有单词，请休息一下吧！</div>
    
    <div class="wrapper" v-if="wordList.length != 0">
      <div class="word">{{wordList[index].word}}</div>
      <hr>
      <div class="chinese">
        <div class="mean" v-for="(item,index) in wordList[index].chinese" :key="index">{{item}}</div>
      </div>
      <el-button class="home_btn" circle @click="$router.push('/user')">
        <i class="mdi mdi-home"></i>
      </el-button>
      <div class="btn_box">
        <el-button icon="el-icon-arrow-left" circle @click="previous"></el-button>
        <el-button icon="el-icon-arrow-right" circle @click="next"></el-button>
        <el-button type="danger" round @click="postWordStatus(3)">添加到错词本</el-button>
        <el-button type="primary" round @click="postWordStatus(1)">通 过</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wordList: [
        {
          word: "",
          chinese: "",
          id: ""
        }
      ],
      index: 0
    };
  },
  methods: {
    getWordList() {
      this.axios
        .get("/getWordList?unit=" + this.$route.params.id)
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
    previous() {
      if (this.index == 0) {
        this.$message("前面没有单词了");
      } else {
        this.index--;
      }
    },
    next() {
      if (this.index == this.wordList.length - 1) {
        this.$message("后面没有单词了");
      } else {
        this.index++;
      }
    },
    postWordStatus(status) {
      let id = this.wordList[this.index].id;
      this.axios
        .post("/postWordStatus", {
          id: id.toString(),
          status: status.toString()
        })
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("标记成功！");
            this.index++;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    }
  },
  mounted() {
    this.getWordList();
  }
};
</script>

<style lang='scss' scoped>
#cet {
  position: relative;
  .word {
    font-size: 2rem;
    font-weight: bold;
  }
  .chinese {
    .mean {
      line-height: 30px;
    }
  }
  .btn_box {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  .home_btn {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>