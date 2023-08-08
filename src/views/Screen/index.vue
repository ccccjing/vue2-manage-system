<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">center</div>
        <div class="right">right</div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from './components/Top.vue'
import Tourist from './components/Tourist.vue'
import Sex from './components/Sex.vue'
import Age from './components/Age.vue'

export default {
  name: 'Screen',
  components: {
    Top,
    Tourist,
    Sex,
    Age
  },
  data () {
    return {
    }
  },
  methods: {
    getScale(w = 1920, h = 1080) {
      const ww = window.innerWidth / w
      const wh = window.innerHeight / h
      return ww < wh ? ww : wh
    }
  },
  mounted() {
    this.$refs.screen.style.transform = `scale(${this.getScale()}) translate(-50%, -50%)`
    window.onresize = () => {
      this.$refs.screen.style.transform = `scale(${this.getScale()}) translate(-50%, -50%)`
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1;
        }
        .sex {
          flex: 1;
          background-color: aquamarine;
        }
        .age {
          flex: 1;
          background-color: hotpink;
        }
      }
      .center {
        flex: 2;
      }
    }
  }
}
</style>