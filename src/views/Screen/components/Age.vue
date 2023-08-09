<template>
  <div class="box">
    <span class="title">年龄比例</span>
    <p class="bg"></p>
    <div class="box-pie">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Age',
  mounted() {
    let myCharts = echarts.init(this.$refs.charts)
    let list = [
      {percent: 3.45, name: "10岁以下", value: 1},
      {percent: 6.9, name: "10-18岁", value: 2},
      {percent: 10.34, name: "18-30岁", value: 3},
      {percent: 41.38, name: "30-40岁", value: 12},
      {percent: 3.45, name: "40-60岁", value: 1},
      {percent: 16, name: "60岁以上", value: 10}
    ] 
    let nameArray = list.map(item=>{
      return item.name + '\t\t\t' + item.value + '个' + '\t\t\t' + item.percent + '%'
    })
    let color = [
      '#2ca1ff',
      '#0adbfa',
      '#febe13',
      '#65e5dd',
      '#7b2cff',
      '#fd5151',
      '#f071ff',
      '#85f67a',
      '#0baefd',
      '#fdcd0b',
      '#0bfdab',
      '#ff5353',
      '#ff72cb',
      '#8488ff',
    ]
    let dataList = [];
    for (var i = 0; i < list.length; i++) {
      dataList.push({
        value: list[i].value,
        name: list[i].name + '\t\t\t' + list[i].value + '个' 
              + '\t\t\t' + list[i].percent + '%',
        itemStyle: {
            borderWidth: 6,
            shadowBlur: 5,
            borderRadius: 10,
            borderColor:color[i],
            shadowColor: color[i]
        }
      });
    }
    let option = {
        backgroundColor:"#061740",
        color : color,
        tooltip: {
            show: false
        },
        title: {
            text: '本月总数',
            left: '24%',
            top: 'center',
            textStyle: {
                color: '#29fcff',
                fontWeight: 'bold',
                fontSize: "1.2rem",
            }
        },
        legend: [{
          orient: 'vertical',
          data:nameArray,
          left: 'right',
          top: 'center',
          align: 'left',
          itemGap: 5,
          textStyle: {
              color: '#29fcff',
              fontSize: "1.1rem",
          },
          //图例标记的图形高度
          itemHeight: 10,
          //图例标记的图形宽度
          itemWidth: 10,
        }],
        series: [{
            name: '',
            type: 'pie',
            clockwise: false,
            radius: ['80%', '130%'],
            width:"65%",
            height:"55%",
            emphasis: {
              scale: false
            },
            center: ['50%', '50%'],
            top:"center",
            label: {
              show: true,
              position: 'inside',
              color: '#fff',
              formatter: function(params) {
                  return params.percent + '%'
              }
            },
            data: dataList
        }]
    };
    myCharts.setOption(option)
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
  .box-pie {
    width: 100%;
    height: 250px;
    .charts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>