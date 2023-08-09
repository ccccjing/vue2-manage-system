<template>
  <div class="box">
    <span class="title">男女比例</span>
    <p class="bg"></p>
    <div class="sex">
      <div class="sex-man">
        <img class="man" src="../images/man.png" alt="">
      </div>
      <div class="sex-woman">
        <img class="woman" src="../images/woman.png" alt="">
      </div>
    </div>
    <p class="rate">
      <span>男士58%</span>
      <span class="rate-woman">女士42%</span>
    </p>
    <div class="box-bar">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Sex',
  mounted() {
    let myCharts = echarts.init(this.$refs.charts)
    myCharts.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [58],
          barWidth: 20,
          z: 100,
          itemStyle: {
            borderRadius: 20
          }
        },
        {
          type: 'bar',
          data: [100],
          barWidth: 20,
          barGap: '-100%',
          itemStyle: {
            color: 'pink',
            borderRadius: 20
          }
        }
      ],
      grid: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin-top: 10px;
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
  .sex {
    display: flex;
    justify-content: center;
    .sex-man {
      position: relative;
      width: 111px;
      height: 116px;
      margin: 0 20px;
      background: url(../images/man-bg.png) no-repeat;
      background-size: 100% 100%;
      .man {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .sex-woman {
      position: relative;
      width: 111px;
      height: 116px;
      margin: 0 20px;
      background: url(../images/woman-bg.png) no-repeat;
      background-size: 100% 100%;
      .woman {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .rate {
    position: relative;
    display: block;
    color: #29fcff;
    margin: 0 45px;
    .rate-woman {
      position: absolute;
      right: 0;
    }
  }
  .box-bar {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    .charts {
      width: 90%;
      height: 100%;
    }
  }
}
</style>