<template>
  <div>
    <div ref="myChart" style="width: 100%;height: 400px"></div>
  </div>
</template>

<script>
export default {
  name: "globalChart",
  data() {
    return{
      flag: true,
      myChart: null,
      myGlobalChartData:{
        backgroundColor: '#fff',
        title: {
          text: "全局态势",
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

        color: ['#4a7ee8'],
        tooltip: {
          formatter: function(params) {
            let res = params[0].name + '<br/>紧张程度为：'
            let texts = ''
            if (params[0].value==1) {
              texts = '低风险'
            } else if (params[0].value==2) {
              texts = '中风险'
            } else if (params[0].value==3) {
              texts = '高风险'
            }
            res = res + texts;
            return res
          },
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
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        dataZoom: [
          {
            show: false,
            realtime: false,
            // type: 'inside',
            start: 0,
            end: 20,
            zoomLock:true,
            // filterMode: 'filter'
            zoomOnMouseWheel:true, //如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。
            moveOnMouseMove:true,
          },
          {
            type: 'inside',
            realtime: false,
            // disabled:true,``1
            start: 0,
            end: 50,
            // zoomLock:true,
            zoomOnMouseWheel:'ctrl', //如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。
          }
        ],
        legend: {
          data: ['紧张程度'],
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
          type: 'category',
          data:[],
          // data: ['2020-5-2','2020-5-5','2020-5-9','2020-6-6','2020-6-15','2020-6-19','2020-6-22','2020-6-30','2020-7-6',
          //   '2020-7-6','2020-7-7','2020-7-7','2020-7-10','2020-7-12','2020-7-13','2020-7-14','2020-7-17\\18',
          //   '2020-7-20','2020-7-21','2020-7-27','2020-7-27','2020-7-29','2020-8-1','2020-8-12','2020-8-14',
          //   '2020-8-18','2020-8-21','2020-8-24','2020-8-25','2020-8-27','2020-8-29','2020-8-30','2020-8-31',
          //   '2020-9-2','2020-9-3','2020-9-3','2020-9-4','2020-9-5','2020-9-7','2020-9-8','2020-9-9','2020-9-10',
          //   '2020-9-11','2020-9-12','2020-9-14','2020-9-15','2020-9-20','2020-9-23','2020-9-24','2020-9-28',
          //   '2020-9-30','2020-10-1','2020-10-6','2020-10-12','2020-10-16','2020-10-17','2020-10-18','2020-10-19',
          //   '2020-10-27','2020-10-27','2020-11-7','2020-11-9','2020-11-11','2020-11-13','2020-11-16','2020-11-25',
          //   '2020-11-26','2020-12-1'],
          // splitLine: {
          //   show: false
          // },
          axisLabel:{
            interval:6,
            rotate:40
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true
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
          name:'紧张程度',
          nameTextStyle:{
            padding:10,
            fontSize:14
          },
          nameLocation: 'end',
          // max: max_value>=100? max_value + 100: max_value+10,
          // max: max_value > 100 ? max_value * 2 : max_value + 10,
          // interval: 10,
          // nameLocation: "center",
          axisLabel: {
            color: '#999',
            textStyle: {
              fontSize: 14,
              fontWeight:400,
              color:function (value) {
                if(value==1){
                  return 'rgba(140,198,63,1)'
                }
                else if (value==2) {
                  return 'rgba(247,147,30,1)'
                }
                else if (value==3) {
                  return 'rgba(193,39,45,1)'
                }
              }
            },
            formatter: function (value) {
              let texts = [];
              if(value == 1){
                texts.push('低风险');
              }
              else if (value == 2 ){
                texts.push('中风险');
              }
              else if (value == 3) {
                texts.push('高风险');
              }
              return texts;
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
            show: false
          },

        },
        series: [
          {
            name: '紧张程度',
            type: 'line',
            smooth: true,
            data:[],
            // data: ['0.8','0.9','0.9','0.3','0.9','0.7','0.3','0.3','0.4','0.6','0.2',
            //   '0.4','0.2','0.4','0.6','0.5','0.3','0.6','0.6','0.6','0.5','0.7','0.6',
            //   '0.6','0.5','0.7','0.4','0.5','0.4','0.6','0.4','0.4','0.4','0.2','0.2',
            //   '0.2','0.3','0.2','0.3','0.5','0.4','0.4','0.2','0.3','0.4','0.5','0.7',
            //   '0.1','0.3','0.7','0.1','0.7','0.6','0.7','0.2','0.4','0.3','0.7','0.3',
            //   '0.6','0.3','0.7','0.1','0.1','0.7','0.6','0.5','0.6']
          }
        ]
      }
    }
  },
  computed:{
  },
  watch:{
    flag () {
      this.init()
    }
  },
  created() {
    this.getData();
  },
  mounted () {
    this.init()
  },
  beforeDestroy() {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  },
  methods: {
    //获取数据
    getData(){
      this.axios({
        url: '/api/global/attitude',
        method: 'get',
      }).then( result => {
        this.myGlobalChartData.xAxis.data = [];   //横坐标时间
        this.myGlobalChartData.series[0].data = [];  //紧张指数
        console.log("globalData:",result.data)
        if(result.data.code === 200 && result.data.data.length!==0) {
          console.log('确认进入if');
          for(let i=0;i<result.data.data.dates.length;i++){
            this.myGlobalChartData.xAxis.data[i] = result.data.data.dates[i].substr(0,10);   //日期
            this.myGlobalChartData.series[0].data[i] = result.data.data.ranks[i];  //紧张指数
          }
          this.flag = true;
          this.myChart.clear();
          this.init();
        }
      }).catch((error) => console.log(error))
    },
    init () {
      let that = this
      if (this.$refs.myChart && this.flag) {
        this.myChart = this.echarts.init(this.$refs.myChart)
        this.myChart.setOption(this.myGlobalChartData, true)
        window.onresize = this.myChart.resize;
        // 点击折线图的点 触发sendDate方法
        this.myChart.on('click',function (params) {
          console.log('x-params:',params.name)
          that.sendDate(params)
          // this.$store.state.chartDate = params.name
        })
      }
    },
    // 发送日期
    sendDate(val) {
      let chartDate = ''
      chartDate = val.name
      console.log("chartDate:",chartDate)
      this.$store.state.chartDate = chartDate
    },
  },
}
</script>

<style scoped>

</style>
