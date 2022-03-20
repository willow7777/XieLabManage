<template>
  <div>
    <div ref="myChart6" class="trend-container"></div>
  </div>
</template>

<script>
export default {
  name: "globalChart",
  data() {
    return{
      myFlightChartData:{
        backgroundColor: '#fff',
        title: {
          text: "航班异常指数",
          // textAlign:'center',
          // textVerticalAlign:'middle',
          left: 'center',
          top: "18px",
          textStyle: {
            color: "#000",
            fontSize: 18,
            fontWeight: '600'
          }
        },

        color: ['#3A84FF','rgba(255,80,124,1)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            },
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['异常指数','紧张程度'],
          textStyle: { //图例文字的样式
            color: '#000',
            fontSize: 16
          },
          x:'right',
          y:'',
          orient: 'vertical',
          icon: "roundRect",
          show: true,
          left: '85%',
          top: 25,
        },
        xAxis: {
          name:'日期',
          nameTextStyle:{
            padding:10,
            fontSize:18
          },
          type: 'category',
          boundaryGap:false,
          data: ['01-01', '01-02', '01-03',  '01-04',  '01-05',  '01-06',  '01-07',  '01-08',
            '01-09',  '01-10',  '01-11',  '01-12',  '01-13','01-14','01-15','01-16','01-17','01-18'],
          // splitLine: {
          //   show: false
          // },
          axisLabel:{
            color: 'black',
            fontSize:14
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle:{
              color:'black',
              width:1
            }
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:'#afe1ff'
            }
          }
        },
        yAxis: {
          type: 'value',
          name:'占比',
          nameTextStyle:{
            padding:10,
            fontSize:18
          },
          nameLocation: 'end',
          // max: max_value>=100? max_value + 100: max_value+10,
          // max: max_value > 100 ? max_value * 2 : max_value + 10,
          // interval: 10,
          // nameLocation: "center",
          axisLabel : {
            formatter: '{value}',
            textStyle:{
              color:'black',
              fontSize:14
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#F3F4F4'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show:true,
            lineStyle:{
              color:'black',
              width:1
            }
          },

        },
        series: [
          {
            name: '异常指数',
            type: 'line',
            smooth: true,  //关键点，为true是不支持虚线，实线就用true
            itemStyle: {
              normal: {
                lineStyle: {
                  width:2
                },
              }
            },
            data: [0.699,0.13,0.55,0.4,0.44,0.16,0.244,0.55,0.4,0.322,0.78,0.244,0.56,0.16,0.322,0.78,0.53,0.62]
          },
          {
            name: '紧张程度',
            type: 'line',
            smooth: true,
            data: [0.2,0.244,0.23,0.699,0.13,0.55,0.4,0.44,0.16,0.244,0.55,0.4,0.322,0.78,0.244,0.56,0.16,0.322,0.78]
          }
        ]
      }
    }
  },
  created() {
    //this.getData();
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let that = this
      this.myChart = this.echarts.init(this.$refs.myChart6, "", {
        height: window.innerHeight / 1.3,
        width: window.innerWidth * 0.8,
      });
      this.myChart.setOption(this.myFlightChartData)
      window.onresize = this.myChart.resize;
    },
  },
}
</script>

<style scoped>

</style>
