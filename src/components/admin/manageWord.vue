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
      </el-radio-group>
    </div>

    <!-- 单词列表 -->
    <div class="wordListr">
      <div class="wrapper" v-for="(item,index) in wordList" :key="item.id">
        <div class="inner">
          <div class="word">{{item.word}}</div>
          <hr>
          <div class="chinese">
            <div class="mean" v-for="(subItem,subIndex) in item.chinese" :key="subIndex">{{subItem}}</div>
          </div>
          <div class="btn_box">
            <el-button
              class="delete"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteWord(item.id,index)"
            ></el-button>
            <el-button
              class="edit"
              type="success"
              icon="el-icon-edit"
              circle
              @click="editClick(index)"
            ></el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 模态框 -->
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="900px">
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
          <el-button type="success" @click="submit">提交修改</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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
        .get("/getWordList?unit=" + this.unit)
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
    deleteWord(id, index) {
      this.$confirm("您确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/deleteWord?id=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.wordList.splice(index, 1);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("服务器无法连接");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消"
          });
        });
    },
    editClick(index) {
      this.form = JSON.parse(JSON.stringify(this.wordList[index]));
      this.dialogVisible = true;
      this.index = index;
    },
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
        .post("/modifyWord", this.form)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("修改成功");
            this.wordList.splice(this.index, 1, this.form);
            // this.reset();
            this.dialogVisible = false;
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
    unit: function() {
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
  display: flex;
  margin-bottom: 40px;
  flex-wrap: wrap;
  margin: 10px -10px;
  .wrapper {
    width: 50%;
    padding: 10px;
    box-sizing: border-box;
    .inner {
      position: relative;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      min-height: 134px;
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