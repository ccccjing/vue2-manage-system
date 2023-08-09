<template>
  <div class="box">
    <span class="title">年度对比</span>
    <p class="bg"></p>
    <div class="box-bar">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "AnnualComparison",
  mounted() {
    let myCharts = echarts.init(this.$refs.charts);
    let option = {
      color: ["#5090FF", "#01B3E4", "#FF7E00", "#99004c"],
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(0,0,0,.6)",
        borderColor: "rgba(147, 235, 248, .8)",
        textStyle: {
          color: "#FFF",
        },
      },
      grid: {
        left: "2%",
        right: "5%",
        bottom: "5%",
        top: "30px",
        containLabel: true,
      },
      legend: {
        show: true,
        icon: "rect",
        orient: "horizontal",
        left: "right",
        itemWidth: 12,
        itemHeight: 12,
        formatter: ["{a|{name}}"].join("\n"),
        textStyle: {
          fontSize: 12,
          color: "#6A93B9",
          height: 8,
          rich: {
            a: {
              verticalAlign: "bottom",
            },
          },
        },
        data: ["2018年", "2020年", "2022年", "2024年"],
      },
      xAxis: {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#BDD8FB",
            fontSize: 12,
          },
        },
        axisLabel: {
          // interval:0,
          color: "#BDD8FB",
          fontSize: 12,
          textStyle: {
            color: "white",
            fontSize: 16,
          },
        },
        axisTick: {
          show: false,
        },
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
      yAxis: {
        type: "value",
        name: "(人数)",
        min: 0,
        minInterval: 1,
        nameTextStyle: {
          fontSize: 12,
          color: "#BDD8FB",
          align: "center",
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.15)",
          },
        },
        splitArea: { show: false },
        axisLine: {
          show: true,
          textStyle: {
            fontSize: 20,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 12,
          fontFamily: "Bebas",
          color: "#BDD8FB",
          textStyle: {
            color: "white",
            fontSize: 16,
          },
        },
      },
      series: [
        {
          type: "line",
          smooth: true, // 是否曲线
          name: "2018年", // 图例对应类别
          data: [
            4000, 6000, 7000, 2000, 5000, 7000, 9000, 1000, 4000, 5000, 6000,
            3000, 8000, 7000,
          ], // 纵坐标数据
          areaStyle: {
            color: {
              type: "linear",
              x: 0, //右
              y: 0, //下
              x2: 0, //左
              y2: 1, //上
              colorStops: [
                {
                  offset: 0.1,
                  color: "#5090FF", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#1057E500", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          type: "line",
          smooth: true,
          name: "2020年",
          data: [
            1000, 4000, 5000, 6000, 3000, 8000, 7000, 1000, 4000, 5000, 6000,
            3000, 8000, 7000,
          ],
          areaStyle: {
            color: {
              type: "linear",
              x: 0, //右
              y: 0, //下
              x2: 0, //左
              y2: 1, //上
              colorStops: [
                {
                  offset: 0.1,
                  color: "#01B3E4", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#86DCF300", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          type: "line",
          smooth: true,
          name: "2022年",
          data: [
            1230, 4520, 5620, 7220, 3520, 8600, 7630, 1230, 4520, 5620, 7220,
            3520, 8600, 7630,
          ],
          areaStyle: {
            color: {
              type: "linear",
              x: 0, //右
              y: 0, //下
              x2: 0, //左
              y2: 1, //上
              colorStops: [
                {
                  offset: 0.1,
                  color: "#FF7E00", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#FF000000", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          type: "line",
          smooth: true,
          name: "2024年",
          data: [
            230, 4520, 5520, 6620, 3620, 8620, 7620, 230, 4520, 5520, 6620,
            3620, 8620, 7620,
          ],
          areaStyle: {
            color: {
              type: "linear",
              x: 0, //右
              y: 0, //下
              x2: 0, //左
              y2: 1, //上
              colorStops: [
                {
                  offset: 0.1,
                  color: "#99004c", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#FF000000", // 100% 处的颜色
                },
              ],
            },
          },
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
  .box-bar {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    .charts {
      width: 100%;
      height: 100%;
      margin-top: 14px;
    }
  }
}
</style>