<template>
  <div class="box">
    <span class="title">变化趋势</span>
    <p class="bg"></p>
    <div class="line">
      <div class="line-charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Lines',
  mounted() {
    let myCharts = echarts.init(this.$refs.charts)
    let option = {
      grid: {
        left: '5%',
        right: '10%',
        top: '20%',
        bottom: '15%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer:{
          type:'line',
          lineStyle:{
              color:'rgba(50, 216, 205, 1)'
          },
        }
      },
      xAxis: [{
        type: 'category',
        boundaryGap: 1,
        axisLine: {
          show: false
        },
        axisLabel: {
          color: 'white',
          fontSize: 18
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }],
      yAxis: [{
        type: 'value',
        name: '访问量',
        nameTextStyle: {
          fontSize: 18,
          color: 'white'
        },
        padding:5,
        // max: 1000,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#A1A7B3',
            type: 'dashed'
          }
        },
        axisLine: {
          show: true
        },
        axisLabel: {
          show: true,
          margin: 10,
          textStyle: {
            color: 'white',
            fontSize: 16
          }
        },
        axisTick: {
          show: false
        },
      }],
      series: [{
        name: '今日',
        type: 'line',
        smooth:true,
        stack: '总量',
        symbolSize: 5,
        showSymbol:true,
        itemStyle: {
          normal: {
            color: '#23D0C4',
            lineStyle: {
              color: "#23D0C4",
              width: 2
            },
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(50, 216, 205, 1)'
              },
                {
                  offset: 1,
                  color: 'rgba(255, 255, 255, 0.2)'
                }
            ], false),
          }
        },
        data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410]
      }]
    }
    myCharts.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 96%;
  height: 100%;
  margin: 0 20px;
  background: url(../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    color: white;
    font-size: 20px;
  }
  .bg {
    width: 68px;
    height: 7px;
    background: url(../images/dataScreen-title.png) no-repeat;
    background-size: 100% 100%;
  }
  .line {
    width: 100%;
    height: 220px;
    .line-charts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>