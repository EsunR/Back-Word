<template>
  <div id="home">
    <div>{{$store.state.identity}}</div>
    <transition>
      <div class="top e_card">
        <img src="../assets/index.jpg">
        <div class="title">
          <div class="welcome_title">
            Welcome，欢迎使用宿舍分配系统
            <span
              style="background: #409EFF; padding: 10px 5px; color: #fff; font-weight: 100; border-radius: 5px; font-size: 16px; position: relative; top: -3px;"
              v-if="identity == 'admin'"
            >后台管理</span>
          </div>
          <hr>
          <div class="subtitle" v-if="identity != 'admin'">
            <p v-if="$store.getters.getRoom == ''">检测到您是第一次使用该系统，系统将引导您完成宿舍分配工作。</p>
            <p v-if="$store.getters.getRoom == ''" style="margin-bottom: 0px;">点击右下方按钮即可开始进入分配流程。</p>
            <p v-if="$store.getters.getRoom != ''">您已经完成了宿舍分配。</p>
          </div>
          <div class="admin_panel" v-if="identity == 'admin'">
            <div class="left chuck" @click="goto('manageStudent')">学生管理</div>
            <div class="right chuck" @click="goto('manageRoom')">宿舍管理</div>
          </div>
        </div>
        <el-button
          v-if="$store.state.room == '' && identity != 'admin'"
          class="start"
          type="success"
          icon="el-icon-check"
          circle
          @click="$router.push('/question')"
        ></el-button>
        <el-button
          v-if="$store.getters.getRoom != '' && identity != 'admin'"
          class="start"
          type="success"
          icon="el-icon-check"
          round
          style="font-size: 16px"
          disabled
        >您已完成分配</el-button>
      </div>
    </transition>
    <div class="bottom e_card" v-if="room != '' && room != undefined">
      <div class="title">您分配的宿舍编号为: {{form.roomId}}</div>
      <label for></label>
      <el-input type="textarea" v-model="form.comment" rows="4" style="font-size: 16px;"></el-input>
      <div class="btn_box">
        <div class="rate">
          <el-rate v-model="form.harmonious" show-text></el-rate>
          <span>评分：</span>
        </div>
        <div>
          <el-button type="info" @click="$router.push('/detail/' + room)">查看详情</el-button>
          <el-button type="success" @click="commit">发布评价</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        roomId: "",
        harmonious: 5,
        comment: this.$store.state.roomId
      }
    };
  },
  methods: {
    commit() {
      if (this.form.comment == "") {
        this.$message.error("请填写评价内容");
        return;
      }
      this.$confirm("您确定要发布评价吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let obj = {};
          for (let key in this.form) {
            obj[key] = this.form[key].toString();
          }
          obj.roomId = this.room;
          this.axios
            .post("/postComment", obj)
            .then(res => {
              if (res.data.code == 1) {
                this.form.comment = "";
                this.$message.success("评价成功!");
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
    goto(path) {
      this.$router.push(`./${path}`);
    }
  },
  computed: {
    room() {
      return this.$store.state.room;
    },
    identity() {
      return this.$store.state.identity;
    }
  },
  watch: {
    "$store.getters.getRoom"() {
      this.form.roomId = this.$store.getters.getRoom;
    }
  }
};
</script>

<style lang="scss" scope>
.top {
  position: relative;
  img {
    width: 1200px;
    margin: -20px;
    border-radius: 10px 10px 0 0;
    margin-bottom: 20px;
  }
  .title {
    .welcome_title {
      font-size: 25px;
      font-weight: 600;
    }
    hr {
      margin: 10px 0;
    }
  }
  .start {
    position: absolute;
    right: 20px;
    font-size: 20px;
    bottom: -20px;
  }
  .admin_panel {
    display: flex;
    margin: -10px;
    .chuck {
      width: 50%;
      height: 100px;
      color: #fff;
      margin: 10px;
      border-radius: 10px;
      text-align: center;
      line-height: 100px;
      font-size: 20px;
      cursor: pointer;
    }
    .left {
      background-color: #409eff;
    }
    .right {
      background-color: #409eff;
    }
  }
}
.bottom {
  margin: 40px 0;
  .title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .btn_box {
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: space-between;
    .rate {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>