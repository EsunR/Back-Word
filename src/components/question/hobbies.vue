<template>
  <div id="hobbies" class="e_card">
    <div class="title">
      <div class="tag">爱好选项</div>
      <hr>
      <div class="subtitle">请选择您的爱好，系统将为您挑选喜好相同的舍友。</div>
    </div>

    <div class="main">
      <div class="group">
        <div class="label">1. 喜欢的游戏类型</div>
        <el-checkbox-group v-model="form.game">
          <el-checkbox label="不喜欢" @change="dontLike('game', gameDisabled)">不喜欢</el-checkbox>
          <el-checkbox label="网络游戏" :disabled="gameDisabled">网络游戏</el-checkbox>
          <el-checkbox label="单机游戏" :disabled="gameDisabled">单机游戏</el-checkbox>
          <el-checkbox label="手游" :disabled="gameDisabled">手游</el-checkbox>
          <el-checkbox label="主机、掌机游戏" :disabled="gameDisabled">主机、掌机游戏</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="group">
        <div class="label">2. 喜欢的阅读类型</div>
        <el-checkbox-group v-model="form.read">
          <el-checkbox label="不喜欢" @change="dontLike('read', readDisabled)">不喜欢</el-checkbox>
          <el-checkbox label="流行小说" :disabled="readDisabled">流行小说</el-checkbox>
          <el-checkbox label="文学著作" :disabled="readDisabled">文学著作</el-checkbox>
          <el-checkbox label="漫画" :disabled="readDisabled">漫画</el-checkbox>
          <el-checkbox label="杂志报纸" :disabled="readDisabled">杂志报纸</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="group">
        <div class="label">3. 喜欢影视作品类型</div>
        <el-checkbox-group v-model="form.video">
          <el-checkbox label="不喜欢" @change="dontLike('video', videoDisabled)">不喜欢</el-checkbox>
          <el-checkbox label="电影" :disabled="videoDisabled">电影</el-checkbox>
          <el-checkbox label="电视剧" :disabled="videoDisabled">电视剧</el-checkbox>
          <el-checkbox label="动漫" :disabled="videoDisabled">动漫</el-checkbox>
          <el-checkbox label="纪录片" :disabled="videoDisabled">纪录片</el-checkbox>
          <el-checkbox label="网络短视频" :disabled="videoDisabled">网络短视频</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="group">
        <div class="label">4. 喜欢的运动类型</div>
        <el-checkbox-group v-model="form.sport">
          <el-checkbox label="不喜欢" @change="dontLike('sport', sportDisabled)">不喜欢</el-checkbox>
          <el-checkbox label="球类运动" :disabled="sportDisabled">球类运动</el-checkbox>
          <el-checkbox label="跑步" :disabled="sportDisabled">跑步</el-checkbox>
          <el-checkbox label="单车" :disabled="sportDisabled">单车</el-checkbox>
          <el-checkbox label="力量健身" :disabled="sportDisabled">力量健身</el-checkbox>
          <el-checkbox label="极限运动" :disabled="sportDisabled">极限运动</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="group">
        <div class="label">5. 喜欢的音乐类型</div>
        <el-checkbox-group v-model="form.music">
          <el-checkbox label="不喜欢" @change="dontLike('music', musicDisabled)">不喜欢</el-checkbox>
          <el-checkbox label="华语系音乐" :disabled="musicDisabled">华语系音乐</el-checkbox>
          <el-checkbox label="日韩系音乐" :disabled="musicDisabled">日韩系音乐</el-checkbox>
          <el-checkbox label="欧美系音乐" :disabled="musicDisabled">欧美系音乐</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div class="btn_box">
      <el-button icon="el-icon-arrow-left" type="success" circle @click="previous"></el-button>
      <el-button icon="el-icon-arrow-right" type="success" circle @click="next"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        game: this.$store.state.form.game,
        read: this.$store.state.form.read,
        video: this.$store.state.form.video,
        sport: this.$store.state.form.sport,
        music: this.$store.state.form.music
      },
      gameDisabled: false,
      readDisabled: false,
      videoDisabled: false,
      sportDisabled: false,
      musicDisabled: false
    };
  },
  methods: {
    dontLike(hobby, bollen) {
      this[hobby + "Disabled"] = !bollen;
      console.log(bollen);
      if (bollen) {
        this.form[hobby].shift();
      } else {
        this.form[hobby] = ["不喜欢"];
      }
    },
    next() {
      for(let key in this.form){
        if(this.form[key].length == 0){
          this.$message.error('有未填项，请检查');
          return;
        }
      }
      this.$router.push("/question/habit");
      this.$store.commit("setFormValue", this.form);
    },
    previous() {
      this.$router.push("/question/time");
    }
  }
};
</script>

<style lang='scss' scoped>
#hobbies {
  position: relative;
}
.title {
  .tag {
    font-size: 25px;
    font-weight: bold;
  }
}
.btn_box {
  position: absolute;
  right: 30px;
  bottom: -20px;
}
.group {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px dashed rgba(0, 0, 0, 0.1);
  &:first-child {
    border: none;
    margin-top: 0px;
  }
  .label {
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>