<template>
  <div class="content" @mouseenter="handleIn" @mouseleave="handleOut" @click="$emit('click')">
    <div class="inner">
      <slot name="main"></slot>
    </div>
    <div class="shade" ref="shade">
      <div class="inner">
        <slot name="shade"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleIn: function(e) {
      const direction = this.direction(e);
      this.animate(direction, "in");
    },
    handleOut: function(e) {
      const direction = this.direction(e);
      this.animate(direction, "out");
    },
    direction: function(e) {
      const clientX = e.clientX;
      const clientY = e.clientY;
      const top = e.target.offsetTop;
      const bottom = parseInt(top + e.target.offsetHeight);
      const left = e.target.offsetLeft;
      const right = parseInt(left + e.target.offsetWidth);
      const absTop = Math.abs(clientY - top);
      const absBottom = Math.abs(clientY - bottom);
      const absLeft = Math.abs(clientX - left);
      const absRight = Math.abs(clientX - right);
      const min = Math.min(absTop, absBottom, absLeft, absRight);
      let direction;
      switch (min) {
        case absTop:
          direction = "top";
          break;
        case absBottom:
          direction = "bottom";
          break;
        case absLeft:
          direction = "left";
          break;
        case absRight:
          direction = "right";
          break;
      }
      return direction;
    },
    animate: function(direction, type) {
      let top = 0,
        left = 0;
      if (type == "in") {
        this.$refs.shade.style.transition = "none";
        if (direction == "top") {
          top = "-100%";
          left = 0;
        } else if (direction == "right") {
          top = 0;
          left = "100%";
        } else if (direction == "bottom") {
          top = "100%";
          left = 0;
        } else if (direction == "left") {
          top = 0;
          left = "-100%";
        }
        this.$refs.shade.style.top = top;
        this.$refs.shade.style.left = left;
        setTimeout(() => {
          this.$refs.shade.style.transition = "all .2s ease 0s";
          this.$refs.shade.style.top = 0;
          this.$refs.shade.style.left = 0;
        }, 0);
      } else if (type == "out") {
        if (direction == "top") {
          top = "-100%";
          left = 0;
        } else if (direction == "right") {
          top = 0;
          left = "100%";
        } else if (direction == "bottom") {
          top = "100%";
          left = 0;
        } else if (direction == "left") {
          top = 0;
          left = "-100%";
        }
        this.$refs.shade.style.top = top;
        this.$refs.shade.style.left = left;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.content {
  float: left;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 10rem;
  color: rgba($color: #000000, $alpha: 0.7)
}

.content .shade {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #409EFF;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
}
</style>