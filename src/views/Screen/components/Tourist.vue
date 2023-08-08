<template>
  <div class="box">
    <div class="top">
      <span class="title">人数统计</span>
      <p class="bg"></p>
      <p class="right">已预约 <span>99999</span> 人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill'

export default {
  name: 'Tourist',
  data () {
    return {
      people: '20236人',
    }
  },
  mounted() {
    let myCharts = echarts.init(this.$refs.charts)
    myCharts.setOption({
      title: {
        text: ''
      },
      series: {
        type: 'liquidFill',
        data: [0.6]
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin-top: 10px;
  background: url(../images/dataScreen-main-lc.png) no-repeat;
  background-size: 100% 100%;
  .top {
    position: relative;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      position: absolute;
      top: 0;
      right: 30px;
      color: white;
      font-size: 22px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    display: flex;
    margin: 40px 20px 0;
    span {
      flex: 1;
      height: 40px;
      color: #29fcff;
      font-size: 30px;
      text-align: center;
      line-height: 40px;
      background: url(../images/total.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .charts {
    width: 100%;
    height: 90%;
  }
}
</style>