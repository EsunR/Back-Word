<template>
  <div id="roomList">
    <div class="room_box e_card" v-for="(item,index) in roomList" :key="item.roomId">
      <div class="top">
        <div class="room_id">宿舍编号：{{item.roomId}} | 已入住：{{item.peopleNum}}人</div>
        <div class="total">
          总契合度：{{(item.total/10)*100 + '%'}}
          <span v-if="index == 0">（推荐）</span>
        </div>
      </div>
      <hr>
      <table cellspacing="0">
        <tr>
          <th>调查选项</th>
          <th>契合度</th>
        </tr>
        <tr>
          <td>喜欢的游戏类型</td>
          <td>{{item.gamePct | pct}}</td>
        </tr>
        <tr>
          <td>喜欢的阅读类型</td>
          <td>{{item.readPct | pct}}</td>
        </tr>
        <tr>
          <td>喜欢影视作品类型</td>
          <td>{{item.videoPct | pct}}</td>
        </tr>
        <tr>
          <td>喜欢的运动类型</td>
          <td>{{item.sportPct | pct}}</td>
        </tr>
        <tr>
          <td>喜欢的音乐类型</td>
          <td>{{item.musicPctc | pct}}</td>
        </tr>
        <tr>
          <td>是否信奉宗教？</td>
          <td>{{item.religionPct | pct}}</td>
        </tr>
        <tr>
          <td>是否希望宿舍保持安静氛围？</td>
          <td>{{item.quitePct | pct}}</td>
        </tr>
        <tr>
          <td>是否会在宿舍经常有产生噪音的行为？</td>
          <td>{{item.quitePct | pct}}</td>
        </tr>
        <tr>
          <td>是否习惯使用公放设备（如使用外置音响）？</td>
          <td>{{item.soundPct | pct}}</td>
        </tr>
        <tr>
          <td>是否会经常长时间待在宿舍？</td>
          <td>{{item.stayPct | pct}}</td>
        </tr>
      </table>
      <div class="btn_box">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="$router.push('/detail/' + item.roomId)"
          round
        >查看详情</el-button>
        <el-button type="success" icon="el-icon-check" @click="check(item.roomId)" round>确认入住</el-button>
      </div>
    </div>
    <div class="fond_room e_card" v-if="roomList.length == 0">
      <div class="text">很遗憾，没有合适的宿舍，您可以选择新建宿舍，等待新的室友入住。</div>
      <el-button type="success" round icon="el-icon-circle-plus" @click="newRoom">新建宿舍</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomList: []
    };
  },
  methods: {
    check(roomId) {
      this.$confirm("您确定要入住此宿舍吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/chooseRoom?id=" + roomId)
            .then(res => {
              if (res.data.code == 1) {
                this.$message.success("入住成功");
                this.getUserInfo();
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
    getUserInfo() {
      this.axios
        .get("/getUserInfo")
        .then(res => {
          if (res.data.code == 1) {
            this.$store.commit("setValue", res.data.data);
            this.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    },
    newRoom() {
      this.axios
        .get("/newRoom")
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("您的宿舍号为" + res.data.data.roomId);
            this.getUserInfo();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    },
    getRoomList() {
      this.axios
        .get("/getFilter")
        .then(res => {
          if (res.data.code == 1) {
            this.roomList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    }
  },
  mounted() {
    this.getRoomList();
  }
};
</script>

<style lang='scss' scoped>
#roomList {
  .room_box {
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      .room_id {
        font-weight: bold;
      }
      .total {
        background-color: #67c23a;
        padding: 5px 10px;
        font-size: 16px;
        border-radius: 5px;
        color: #fff;
      }
    }
    hr {
      margin: 20px 0;
      opacity: 0.2;
    }
    table {
      margin-top: 10px;
      width: 100%;
      th {
        text-align: left;
        padding: 10px;
      }
      tr {
        &:nth-child(odd) {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
      td {
        padding: 5px 10px;
      }
    }
    .btn_box {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
  .fond_room {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>