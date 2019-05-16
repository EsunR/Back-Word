<template>
  <div id="manageUser" class="e_card">
    <div class="title">用户列表</div>
    <hr style="margin-bottom: 20px;">

    <!-- 用户列表 -->
    <el-row :gutter="20">
      <el-col
        :span="12"
        v-for="(item,index) in userList"
        :key="item.id"
        v-show="item.identity != 'admin'"
      >
        <div class="grid-content">
          <div class="name">{{item.name}}</div>
          <hr>
          <div class="wrap">
            <div class="account">
              <i class="mdi mdi-account-circle"></i>
              账号：{{item.account}}
            </div>
            <div class="account">
              <i class="mdi mdi-home"></i>
              宿舍编号：{{item.room}}
            </div>
          </div>
          <div class="btn_box">
            <el-button type="danger" icon="el-icon-delete" @click="deleteUser(index,item.id)"></el-button>
            <el-button type="primary" icon="el-icon-edit" @click="editClick(index)"></el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 模态框 -->
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="900px">
      <div class="form">
        <div class="group">
          <label for="userName">用户名：</label>
          <el-input
            name="userName"
            placeholder="填写用户名"
            prefix-icon="el-icon-edit"
            v-model="form.name"
          ></el-input>
        </div>
        <div class="group">
          <label for="userName">学生账号：</label>
          <el-input
            name="userName"
            placeholder="填写用户账号"
            prefix-icon="el-icon-edit"
            v-model="form.account"
          ></el-input>
        </div>
        <div class="group">
          <label for="userName">账号密码（已加密）：</label>
          <el-input
            name="userName"
            placeholder="填写新密码"
            prefix-icon="el-icon-edit"
            v-model="form.password"
          ></el-input>
        </div>
        <div class="group">
          <label for="room">学生宿舍：</label>
          <el-input name="room" placeholder="填写宿舍编号" prefix-icon="el-icon-edit" v-model="form.room"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      dialogVisible: false,
      index: "",
      form: {
        id: "",
        name: "",
        password: "",
        room: ""
      }
    };
  },
  methods: {
    getUserList() {
      this.axios
        .get("/getUserList")
        .then(res => {
          if (res.data.code == 1) {
            this.userList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    },
    editClick(index) {
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(this.userList[index]));
      this.index = index;
    },
    submit() {
      let obj = {};
      for (let key in this.form) {
        obj[key] = this.form[key].toString();
        if (this.form[key] === "") {
          this.$message.error("修改的信息不能留空");
          return;
        }
      }
      this.axios
        .post("/modifyUserInfo", obj)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("修改成功");
            this.userList[this.index] = this.form;
            this.dialogVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    },
    deleteUser(index, id) {
      this.$confirm("您确定要删除该用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/deleteUser?id=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.userList.splice(index, 1);
                this.$message.success("删除成功！");
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
    this.getUserList();
  }
};
</script>

<style lang='scss' scoped>
.grid-content {
  position: relative;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.05);
  margin-bottom: 30px;
  .name {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .wrap {
    margin: -8px 0;
    .account {
      line-height: 1.8;
    }
  }
  .btn_box {
    margin-top: 20px;
  }
}

.form {
  margin-top: 20px;
  .group {
    display: flex;
    margin-bottom: 20px;
    label {
      width: 200px;
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