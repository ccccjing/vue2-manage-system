<template>
  <div class="box">
    <div class="top">
      <span class="title">人数统计</span>
      <p class="bg"></p>
    </div>
    <div class="number">
      <span>排名</span>
      <span>景区</span>
      <span>预约数量</span>
    </div>
    <div class="liquidFill">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Hot",
  data() {
    return {
      people: "20236人",
    };
  },
  mounted() {
    let myCharts = echarts.init(this.$refs.charts);
    // 排行榜最终版
    let ydata = ["泰山", "华山", "嵩山", "衡山", "恒山"];
    let xdata = [55, 65, 75, 90, 92];
    let option = {
      //你的代码
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        backgroundColor: "rgba(13, 64, 71, 0.50)",
        borderColor: "rgba(143, 225, 252, 0.60)",
        padding: 8,
        textStyle: {
          color: "#fff",
        },
      },
      grid: {
        left: "15%",
        right: "10%",
        bottom: "10%",
        top: "10%",
        containLabel: false,
      },
      xAxis: {
        type: "value",
        show: false,
      },
      yAxis: [
        {
          type: "category",
          data: ydata,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            margin: 50,
            align: "left",
            color: "#e5e5e5",
            formatter: function (value, index) {
              let ind = index + 1;
              if (ind == ydata.length) {
                return "{one|" + (ydata.length - index) + "} {a|" + value + "}";
              } else if (ind + 1 == ydata.length) {
                return "{two|" + (ydata.length - index) + "} {b|" + value + "}";
              } else if (ind + 2 == ydata.length) {
                return (
                  "{three|" + (ydata.length - index) + "} {c|" + value + "}"
                );
              }
              if (ydata.length - index > 9) {
                return (
                  "{five|" + (ydata.length - index) + "} {d|" + value + "}"
                );
              }
              return "{four|" + (ydata.length - index) + "} {d|" + value + "}";
            },
            rich: {
              // 第一名
              one: {
                backgroundColor: "#F6BD16",
                color: "white",
                width: 12,
                height: 16,
                padding: [1, 0, 0, 5],
                borderRadius: 10,
                fontSize: 12,
              },
              // 第二名
              two: {
                backgroundColor: "#FF9845",
                color: "white",
                width: 12,
                height: 16,
                padding: [1, 0, 0, 5],
                borderRadius: 10,
                fontSize: 12,
              },
              // 第三名
              three: {
                backgroundColor: "#F6BD16",
                color: "white",
                width: 12,
                height: 16,
                padding: [1, 0, 0, 5],
                borderRadius: 10,
                fontSize: 12,
              },
              // 一位数
              four: {
                backgroundColor: "#33CCCC",
                color: "white",
                width: 12,
                height: 16,
                padding: [1, 0, 0, 5],
                borderRadius: 10,
                fontSize: 12,
              },
              // 两位数
              five: {
                backgroundColor: "#33CCCC",
                color: "white",
                width: 16,
                height: 16,
                padding: [1, 0, 0, 1],
                borderRadius: 10,
                fontSize: 12,
              },
            },
          },
        },
        {
          show: true,
          data: xdata,
          offset: 5,
          position: "right",
          axisLabel: {
            lineHeight: 0,
            verticalAlign: "bottom",
            fontSize: 14,
            color: "#8CEA00",
            formatter: "{value}",
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          type: "bar",
          showBackground: true,
          label: {
            show: true,
            position: "right",
            color: "#e5e5e5",
            formatter: "{c}%",
          },
          barWidth: 10,
          itemStyle: {
            emphasis: {
              barBorderRadius: 8,
            },
            //颜色样式部分
            normal: {
              barBorderRadius: 8,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "rgba(51, 204, 204,.4)" },
                { offset: 1, color: "rgba(51, 204, 204, 1)" },
              ]),
            },
          },
          data: xdata,
        },
      ],
    };
    myCharts.setOption(option);
  },
};
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
  }
  .number {
    display: flex;
    margin: 40px 20px 0;
    background: url(../images/rankingChart-bg.png) no-repeat;
    background-size: 100% 100%;
    span {
      flex: 1;
      height: 40px;
      color: #29fcff;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
    }
  }
  .liquidFill {
    width: 100%;
    height: 230px;
    .charts {
      width: 100%;
      height: 90%;
    }
  }
}
</style>