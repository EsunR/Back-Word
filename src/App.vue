<template>
  <el-container id="app">
    <el-header class="header shadow_base">
      <div class="left" @click="$router.push('/check')" style="cursor: pointer;">四六级单词学习</div>
      <div class="right">
        <el-tooltip effect="dark" content="修改用户信息" placement="bottom">
          <span class="mdi mdi-account-circle" @click="modifyUserInfoClick" style="cursor: pointer"></span>
        </el-tooltip>

        <span class="user_name">用户：{{name}}</span>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-circle-close-outline"
          style="margin-left: 20px;position: relative; bottom: 8px;"
          plain
          @click="logOut"
        >注销</el-button>
      </div>
    </el-header>
    <el-main>
      <transition>
        <router-view></router-view>
      </transition>
    </el-main>

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
          <label for="userName">用户账号：</label>
          <el-input
            name="userName"
            placeholder="填写用户账号"
            prefix-icon="el-icon-edit"
            v-model="form.account"
          ></el-input>
        </div>
        <div class="group">
          <label for="userName">账号密码：</label>
          <el-input
            name="userName"
            placeholder="填写新密码（留空为不更改）"
            prefix-icon="el-icon-edit"
            v-model="form.password"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交修改</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      form: {
        uid: "",
        name: "",
        account: ""
      },
      userData: {},
      dialogVisible: false
    };
  },
  methods: {
    logOut() {
      localStorage.clear();
      window.location.href = this.COMMON.login_location;
    },
    getUserInfo() {
      this.axios
        .get("/getUserInfo")
        .then(res => {
          if (res.data.code == 1) {
            this.userData = res.data.data;
            this.name = res.data.data.name;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    },
    modifyUserInfoClick(index) {
      this.dialogVisible = true;
      this.form.name = this.userData.name;
      this.form.account = this.userData.account;
      this.form.uid = this.userData.uid;
      this.index = index;
    },
    submit() {
      let obj = {};
      for (let key in this.form) {
        obj[key] = this.form[key].toString();
        if (this.form[key] == "") {
          this.$message.error("修改的信息不能留空");
          return;
        }
      }
      this.axios
        .post("/modifyUserInfo", obj)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("修改成功");
            this.dialogVisible = false;
            this.getUserInfo();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器无法连接");
        });
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  .left {
    background-color: #409eff;
    color: #fff;
    margin-left: -20px;
    padding: 0 20px;
    font-size: 18px;
  }
  .right {
    color: rgba($color: #000000, $alpha: 0.7);
    .mdi {
      font-size: 35px;
      margin-right: 10px;
    }
    .user_name {
      position: relative;
      font-size: 14px;
      top: -7px;
    }
  }
}

.el-main {
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 0px;
  overflow: inherit;
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





