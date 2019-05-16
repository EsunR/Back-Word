<template>
  <div id="manageRoom" class="e_card">
    <div class="title">宿舍列表</div>
    <hr style="margin-bottom: 20px;">
    <transition-group>
      <div class="list" v-for="item in roomList" :key="item.id">
        <div class="no">宿舍编号：{{item.id}}</div>
        <div class="btn_box">
          <el-button type="primary" @click="modifyMember(item.id)">修改成员</el-button>
        </div>
      </div>
    </transition-group>

    <!-- 模态框 -->
    <el-dialog title="修改成员" :visible.sync="dialogVisible" width="900px">
      <div class="body">
        <transition-group name="userList">
          <div class="member_list" v-for="(item, index) in memberList" :key="item.uid">
            <div class="name">{{item.name}}</div>
            <el-button type="danger" size="mini" @click="remove(item.uid, roomId, index)">移出该宿舍</el-button>
          </div>
        </transition-group>
        <div v-if="memberList.length == 0">暂无成员分配</div>
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
      roomList: [],
      dialogVisible: false,
      roomId: "",
      memberList: []
    };
  },
  methods: {
    getRoomList() {
      this.axios
        .get("/getRoomList")
        .then(res => {
          if (res.data.code == 1) {
            this.roomList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    },
    modifyMember(id) {
      this.roomId = id;
      this.getRoomInfo(() => {
        this.dialogVisible = true;
      });
    },
    getRoomInfo(callback) {
      this.axios
        .get("/getRoomInfo?id=" + this.roomId)
        .then(res => {
          if (res.data.code == 1) {
            this.memberList = res.data.data.memberList;
            callback();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    },
    remove(uid, roomId, index) {
      this.axios
        .post("/removeMember", {
          uid,
          roomId
        })
        .then(res => {
          if (res.data.code == 1) {
            this.memberList.splice(index, 1);
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
.list {
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  transition: box-shadow 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.1);
  }
}
.member_list {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  transition: all 1s ease;
}

.userList-enter,
.userList-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.userList-leave-active {
  position: absolute;
  width: 860px;
}
</style>