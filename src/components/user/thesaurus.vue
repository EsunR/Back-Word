<template>
  <div id="manageWord">
    <div class="search_bar e_card">
      <div class="title">
        <i class="el-icon-document"></i> 查询单词 | Search Word
      </div>
      <el-input placeholder="请输入查询单词" v-model="key" @input="inputChange" class="input-with-select">
        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
      </el-input>
    </div>

    <!-- 选择菜单 -->
    <div class="btn_wrapper e_card" v-show="key == ''">
      <el-radio-group v-model="unit">
        <el-radio-button :label="'4'">四级词汇</el-radio-button>
        <el-radio-button :label="'6'">六级词汇</el-radio-button>
        <el-radio-button :label="'userAddWord'">添加单词</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 单词列表 -->
    <div class="wordListr">
      <div class="wrapper" v-for="(item) in wordList" :key="item.id">
        <div class="inner">
          <div class="word">{{item.word}}</div>
          <hr>
          <div class="chinese">
            <div class="mean" v-for="(subItem,subIndex) in item.chinese" :key="subIndex">{{subItem}}</div>
          </div>
          <div class="btn_box"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: "",
      unit: "4",
      wordList: [],
      form: {},
      dialogVisible: false,
      index: ""
    };
  },
  methods: {
    getWordList() {
      this.axios
        .get("/getAllWords?unit=" + this.unit)
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
    inputChange() {
      this.debounce(this.searchWord, 500);
    },
    debounce(fn, delay) {
      var timer = null;
      return (function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn();
        }, delay);
      })();
    },
    searchWord() {
      if (this.key == "") {
        this.getWordList();
        return;
      }
      this.axios
        .get("/searchWord?key=" + this.key)
        .then(res => {
          if (res.data.code == 1) {
            this.wordList = res.data.data;
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
  },
  watch: {
    unit: function(value) {
      if (value == "userAddWord") {
        this.$router.push("/user/userAddWord");
        return;
      }
      this.getWordList();
    }
  }
};
</script>

<style lang='scss' scoped>
.btn_wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.wordListr {
  color: #fff !important;
  margin-bottom: 40px;
  margin-top: 20px;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .wrapper {
    box-sizing: border-box;
    .inner {
      position: relative;
      background-color: #fff;
      padding: 20px;
      background-color: #409eff;
      border-radius: 10px;
      margin: 20px 0;
      .word {
        font-size: 2rem;
      }
      .chinese {
        line-height: 25px;
      }
      .btn_box {
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
      hr {
        border-color: #fff !important;
      }
    }
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