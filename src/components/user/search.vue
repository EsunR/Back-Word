<template>
  <div id="search" class="e_card">
    <div class="word">{{word.word}}</div>
    <hr>
    <div class="chinese">
      <div class="mean" v-for="(item,index) in word.chinese" :key="index">{{item}}</div>
    </div>
    <el-button type="primary" class="home_btn" round @click="$router.push('/user')">
      <i class="mdi mdi-home"></i> 返回首页
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      word: {
        id: "1",
        word: "china",
        chinese: ["n.中国", "adv.瓷器 陶瓷", "adj.瓷的"],
        unit: "4"
      }
    };
  },
  methods: {
    searchWord() {
      this.axios
        .get("/searchWord?key=" + this.$route.query.key)
        .then(res => {
          if (res.data.code == 1) {
            this.word = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    }
  },
  mounted() {
    this.searchWord();
  }
};
</script>

<style lang='scss' scoped>
#search {
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
  .home_btn{
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>