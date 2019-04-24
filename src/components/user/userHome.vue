<template>
  <div id="home">
    <div class="search_bar e_card">
      <div class="title">
        <i class="el-icon-document"></i> 查询单词 | Search Word
      </div>
      <el-input placeholder="请输入内容" v-model="key" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="select_part">
      <mouse-hover class="e_card part" @click="goTo('learning')">
        <template v-slot:main>
          <i class="mdi-book-open mdi"></i>
        </template>
        <template v-slot:shade>学习单词 | Learning words</template>
      </mouse-hover>
      <mouse-hover class="e_card part" @click="goTo('backWord')">
        <template v-slot:main>
          <i class="mdi-pencil-box mdi"></i>
        </template>
        <template class="part_hide" v-slot:shade>默写单词 | Back Words</template>
      </mouse-hover>
      <mouse-hover class="e_card part" @click="goTo('note')">
        <template v-slot:main>
          <i class="mdi-notebook mdi"></i>
        </template>
        <template v-slot:shade>错题本 | Note</template>
      </mouse-hover>
    </div>
  </div>
</template>

<script>
import mouseHover from "./animateBlock.vue";
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
      this.$router.push("/user/" + path);
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
.search_bar {
  .title {
    font-size: 25px;
    text-align: center;
    margin-bottom: 20px;
  }
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