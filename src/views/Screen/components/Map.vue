<template>
  <div class="box">
    <div class="map" ref="china"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import chinaJson from '@/utils/china.json'

export default {
  name: 'Map',
  mounted() {
    echarts.registerMap('china', chinaJson)
    let myEcharts = echarts.init(this.$refs.china)
    // 点坐标
    let points = [
      { value: [110.81, 33.40], itemStyle: { color: '#c1bb1f' }, name: '11', total: 0, bj: 0, yj: 0, yx: 0, tj: 0, dw: 0 },
      { value: [116.55, 40.01], itemStyle: { color: '#3eef1d' }, name: '北京', total: 0, bj: 0, yj: 0, yx: 0, tj: 0, dw: 0 },
      { value: [113.11, 28.40], itemStyle: { color: '#3eef1d' }, name: '22', total: 5, bj: 0, yj: 0, yx: 5, tj: 0, dw: 0 },
      { value: [106.44, 29.50], itemStyle: { color: '#3eef1d' }, name: '33', total: 10, bj: 0, yj: 0, yx: 10, tj: 0, dw: 0 },
      { value: [112.85, 38.95], itemStyle: { color: '#3eef1d' }, name: '44', total: 8, bj: 0, yj: 0, yx: 8, tj: 0, dw: 0 },
      { value: [82.78, 43.27], itemStyle: { color: '#3eef1d' }, name: '55', total: 18, bj: 0, yj: 0, yx: 18, tj: 0, dw: 0 }
    ]
    let lineToLf = [
      { name: '11', coords: [[110.81, 33.40], [116.55, 40.01]], lineStyle: { color: '#c1bb1f' } },
      { name: '22', coords: [[113.11, 28.40], [116.55, 40.01]], lineStyle: { color: '#3eef1d' } },
      { name: '33', coords: [[106.44, 29.50], [116.55, 40.01]], lineStyle: { color: '#3eef1d' } },
      { name: '44', coords: [[112.85, 38.95], [116.55, 40.01]], lineStyle: { color: '#3eef1d' } },
      { name: '55', coords: [[82.78, 43.27], [116.55, 40.01]], lineStyle: { color: '#3eef1d' } }
    ]
    let option = {
      backgroundColor: 'transparent', // 设置背景色透明
      // 必须设置
      tooltip: {
        show: false,
      },
      // 地图阴影配置
      geo: {
        map: 'china',
        // 这里必须定义，不然后面series里面不生效
        tooltip: {
          show: false
        },
        label: {
          show: false
        },
        zoom: 1.03,
        silent: true, // 不响应鼠标时间
        show: true,
        roam: false, // 地图缩放和平移
        aspectScale: 0.75, // scale 地图的长宽比
        itemStyle: {
          borderColor: '#0FA3F0',
          borderWidth: 1,
          areaColor: '#00F1FF',
          shadowColor: 'rgba(1,34,73,0.48)',
          shadowBlur: 10,
          shadowOffsetX: -10, //
          shadowOffsetY: 10
        },
        select: {
          disabled: true
        },
        emphasis: {
          disabled: true,
          areaColor: '#00F1FF'
        },
        // 地图区域的多边形 图形样式 阴影效果
        // z值小的图形会被z值大的图形覆盖
        top: '14%',
        left: 'center',
        // 去除南海诸岛阴影 series map里面没有此属性
        regions: [{
          name: '南海诸岛',
          selected: false,
          emphasis: {
            disabled: true
          },
          itemStyle: {
            areaColor: '#00000000',
            borderColor: '#00000000'
          }
        }],
        z: 1
      },
      series: [
        // 地图配置
        {
          type: 'map',
          map: 'china',
          zoom: 1.03,
          tooltip: {
            show: true,
            textStyle: {
              fontSize: 22
            }
          },
          label: {
            show: true, // 显示省份名称
            color: '#04CFF5',
            align: 'center',
            fontSize: 22
          },
          top: '14%',
          left: 'center',
          aspectScale: 0.75,
          roam: false, // 地图缩放和平移
          itemStyle: {
            borderColor: '#0FA3F0', // 省分界线颜色  阴影效果的
            borderWidth: 1,
            areaColor: '#065CAE',
            opacity: 1
          },
          // 去除选中状态
          select: {
            disabled: true
          },
          emphasis: { // 聚焦后颜色
            disabled: false, // 开启高亮
            label: {
              align: 'center',
              color: '#04CFF5'
            },
            itemStyle: {
              color: '#ffffff',
              areaColor: '#0a8bd8'// 阴影效果 鼠标移动上去的颜色
            }
          },
          z: 1
        },
        // 点
        {
          name: 'companyPoint',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          showEffectOn: 'render',
          // zlevel: 2, // zlevel用于 Canvas 分层 相同的绘制在同一个canvas上
          rippleEffect: {
            number: 5, // 波纹数量
            period: 4, // 动画周期 数值越大，波动越慢
            scale: 3.5, // 动画中波纹的最大缩放比例
            brushType: 'stroke' // 波纹的绘制方式 stroke fill
          },
          label: {
            show: false,
            position: 'right',
            formatter: '{b}',
            color: '#97e9e1',
            fontSize: 14
          },
          symbol: 'circle',
          symbolSize: 16,
          data: points,
          z: 4
        },
        // 地图线的动画效果
        {
          name: 'arrowline',
          type: 'lines',
          // zlevel: 1,
          effect: {
            show: true,
            period: 3, // 箭头指向速度，值越小速度越快
            trailLength: 0.1, // 特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', // 箭头图标
            symbolSize: 6 // 图标大小
          },
          lineStyle: {
            color: '#1DE9B6',
            width: 2, // 线条宽度
            opacity: 0.1, // 尾迹线条透明度
            curveness: 0.2 // 尾迹线条曲直度
          },
          data: lineToLf,
          z: 3
        }
      ]
    }
    myEcharts.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 0px 20px 20px;
  box-sizing: border-box;
  .map {
    width: 100%;
    height: 100%;
  }
}
</style>