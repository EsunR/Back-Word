<template>
  <div id="note">
    <div class="head e_card">
      <div class="title">错词列表</div>
      <div class="btn_box">
        <el-button type="primary" class="home_btn" round @click="$router.push('/user')">
          <i class="mdi mdi-home"></i> 返回首页
        </el-button>
        <el-button
          type="danger"
          class="home_btn"
          round
          @click="$router.push('/user/backErrorWord')"
        >
          <i class="mdi mdi-close-circle-outline"></i> 默写措词
        </el-button>
      </div>
    </div>
    <div class="warning e_card" style="margin-top: 20px;" v-if="wordList.length == 0">错词列表为空，快去学习新单词吧！</div>
    <div class="wordListr">
      <div class="wrapper" v-for="(item,index) in wordList" :key="item.id">
        <div class="inner">
          <div class="word">{{item.word}}</div>
          <hr>
          <div class="chinese">
            <div class="mean" v-for="(subItem,subIndex) in item.chinese" :key="subIndex">{{subItem}}</div>
          </div>
          <el-button
            class="delete"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteWord(item.id,index)"
          ></el-button>
        </div>
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
          id: "",
          word: "",
          chinese: []
        }
      ]
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
    deleteWord(id, index) {
      let obj = {
        id: id.toString(),
        status: "1"
      };
      this.$confirm("您确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/postWordStatus", obj)
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
    }
  },
  mounted() {
    this.getWordStatus();
  }
};
</script>

<style lang='scss' scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 1.5rem;
    margin: 0;
  }
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
      .delete {
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
    }
  }
}
</style>