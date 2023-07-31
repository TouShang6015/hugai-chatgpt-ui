<template>
  <div class="charts" :style="{width: width,height: height}">
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme

  export default {
    name: "BarIndex",
    props:{
      width: { type: String,default: '100%' },
      height: { type: String,default: '400px' },
      titleText: { type: String,default: 'Title' },
      titleSubtext: { type: String,default: 'Description' },
      columnText: { type: Array,required: true },
      columnValue: { type: Array,required: true },
    },
    data() {
      return {
        chart: null,
        chartData: {
          title: {
            text: this.titleText,
            subtext: this.titleSubtext
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
          },
          xAxis: {
            type: 'category',
            data: this.columnText,
            axisLabel: {
              inside: true,
              color: '#fff'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#999'
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            {
              type: 'bar',
              showBackground: true,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ])
              },
              emphasis: {
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                  ])
                }
              },
              data: this.columnValue
            }
          ]
        }
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.chart.setOption(val)
        }
      }
    },
    created() {

    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption(this.chartData)
        const zoomSize = 6;
        const columnText = JSON.parse(JSON.stringify(this.columnText));
        const columnValue = JSON.parse(JSON.stringify(this.columnValue));
        const chart = this.chart;
        chart.on('click', function (params) {
          chart.dispatchAction({
            type: 'dataZoom',
            startValue: columnText[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
              columnText[Math.min(params.dataIndex + zoomSize / 2, columnValue.length - 1)]
          });
        });
      },
      beforeDestroy() {
        if (!this.chart) {
          return
        }
        this.chart.dispose()
        this.chart = null
      },
    }
  }
</script>

<style scoped>

</style>
