<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:{{time}}</span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'Top',
  data () {
    return {
      time: '',
      timer: 0
    }
  },
  methods: {
    goHome() {
      this.$router.push('/home-page')
    }
  },
  mounted() {
    this.time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.timer = setInterval(() => {
      this.time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 40px;
  display: flex;
  .left {
    flex: 1.5;
    background: url(../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url(../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      cursor: pointer;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url(../images/dataScreen-header-center-bg.png);
      background-size: 100% 100%;
      font-size: 30px;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
    }
  }
  .right {
    flex: 1.5;
    background: url(../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rbtn {
      width: 150px;
      height: 40px;
      background: url(../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      font-size: 20px;
      line-height: 40px;
      color: #29fcff;
    }
    .time {
      color: #29fcff;
      margin-right: 20px;
      font-size: 20px;
    }
  }
}
</style>