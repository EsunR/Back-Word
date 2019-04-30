<template>
  <div id="adminHome">
    <div class="title e_card">管理员选项 | Administrator Options</div>
    <div class="select_part">
      <mouse-hover class="e_card part" @click="goTo('addWord')">
        <template v-slot:main>
          <i class="mdi-book-multiple-plus mdi"></i>
        </template>
        <template v-slot:shade>添加单词</template>
      </mouse-hover>

      <mouse-hover class="e_card part" @click="goTo('manageWord')">
        <template v-slot:main>
          <i class="mdi-circle-edit-outline mdi"></i>
        </template>
        <template class="part_hide" v-slot:shade>管理单词</template>
      </mouse-hover>

      <mouse-hover class="e_card part" @click="goTo('manageUser')">
        <template v-slot:main>
          <i class="mdi-account-card-details mdi"></i>
        </template>
        <template v-slot:shade>管理用户</template>
      </mouse-hover>
    </div>
  </div>
</template>

<script>
import mouseHover from "../user/animateBlock.vue";
export default {
  data() {
    return {
      key: ""
    };
  },
  components: {
    mouseHover
  },
  methods: {
    goTo(path) {
      this.$router.push("/admin/" + path);
    },
    search() {
      if (this.key == "") {
        this.$message("请输如内容");
      } else {
        this.$router.push("./search?key=" + this.key);
      }
    }
  }
};
</script>

<style lang="scss" scope>
.title {
  font-size: 25px;
  text-align: center;
  margin-bottom: 20px;
}
.select_part {
  display: flex;
  margin: 0 -20px;
  margin-top: 30px;
  .part {
    width: 33.3%;
    margin: 0 20px;
    height: 300px;
  }
}
</style>