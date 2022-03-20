<template>
  <div ref="myChart6" class="trend-container"></div>
</template>

<script>
  export default {
    data () {
      return {
        myChart6: null,
        form: {
          topic: '',
          poststarttime: '',  //按发帖时间筛选——开始
          postendtime: '',  //按发帖时间筛选——结束
          starttime: '',  //按采集时间筛选——开始
          endtime: ''     //按采集时间筛选——结束
        },
        peopleActData:{
          // backgroundColor: 'rgba(50,69,99,1)',
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },

          legend: {
            // x:'center',
            // y:'10',
            data: ['发帖数', '回帖数', '潜水值']
          },

          grid: [{
            right: '50%'
          }, {
            left: '50%'
          },{
            bottom: '2%',
            containLabel: true
          }],
          xAxis: [{
            type: 'value',
            gridIndex: 0,
            inverse: true,
          }, {
            type: 'value',
            gridIndex: 1
          }],

          yAxis: [{
            gridIndex: 0,
            type: 'category',
            axisTick:{
              show:false
            },
            // data:[]
            data : ['热度人物1', '热度人物2', '热度人物3', '热度人物4','热度人物5','热度人物6','热度人物7','热度人物8','热度人物9','热度人物10']
          }, {
            gridIndex: 1,
            axisTick:{
              show:false
            },
            type: 'category',
            // data:[],
            data : ['热度人物1', '热度人物2', '热度人物3', '热度人物4','热度人物5','热度人物6','热度人物7','热度人物8','热度人物9','热度人物10'],
            position:'right'
          }],

          series: [
          {
            type: 'bar',
            name: '发帖数',
            barWidth: 20,
            xAxisIndex: 1,
            yAxisIndex: 1,
            stack:'总量',
            label: {
              show: true,
              position: 'insight'
            },
            itemStyle: {
              normal: {
                color: '#003366',
                shadowColor: '#003366',
                shadowBlur: 0
              }
            },
            data: [28,32, 32, 31, 34, 90, 30, 32,87,11]
            // data:[]
          },
          {
            type: 'bar',
            name: '回帖数',
            barWidth: 18,
            stack:'总量',
            xAxisIndex: 1,
            yAxisIndex: 1,
            label: {
              show: true,
              position: 'right'
            },
            itemStyle: {
              normal: {
                color: '#4999D5',
                shadowColor: '#4999D5',
                shadowBlur: 0
              }
            },
            // data:[]
            data: [80,20, 102, 101, 134, 290, 130, 120,87,111]

          },
          {
            type: 'bar',
            name: '潜水值',
            barWidth: 20,
            label: {
              show: true,
              position: 'left'
            },
            itemStyle: {
              normal: {
                color: '#99CCFF',
                shadowColor: '#99CCFF',
                shadowBlur: 0
              }
            },
            // data:[]
            data: [298,320, 252, 301, 334, 290, 330, 290,290,203]
          },
          ]
        }
      }
    },
    computed: {
      getForm () {
        return this.$store.state.chartForm
      }
    },
    watch: {
      flag() {
        this.init()
      },
      getForm (newVal, oldVal) {
        this.form = newVal
        this.getData()
      }
    },
    created() {
      this.getData()
    },
    mounted () {
      this.init()
    },
    beforeDestroy() {
      if (!this.myChart) {
        return
      }
      setTimeout(() => {
        this.myChart.dispose()
        this.myChart = null
      }, 200);
    },
    methods: {
      /**获取数据**/
      getData() {
        this.axios({
          url:'/api/search/getgraph/behavior/user',
          method: 'post',
          data: this.form
        }).then( result => {
          console.log('resPeopleActive:',result.data.data.coordinate)
          this.peopleActData.yAxis[0].data = []
          this.peopleActData.yAxis[1].data = []
          this.peopleActData.series[0].data = []
          this.peopleActData.series[1].data = []
          this.peopleActData.series[2].data = []
          if (result.data.code === 200 && result.data.data.coordinate.length !== 0) {
            for (let i=0;i<result.data.data.coordinate.length;i++) {
              this.peopleActData.yAxis[0].data[i] = result.data.data.coordinate[i].name   // y坐标——热度用户名字
              this.peopleActData.yAxis[1].data[i] = result.data.data.coordinate[i].name   // y坐标——热度用户名字
              this.peopleActData.series[0].data[i] = result.data.data.coordinate[i].y.records_count  //records_count发帖数
              this.peopleActData.series[1].data[i] = result.data.data.coordinate[i].y.posts_count     //posts_count回帖数
              this.peopleActData.series[2].data[i] = result.data.data.coordinate[i].y.dive_meter  //dive_meter潜水值
            }
            this.flag = true
            this.myChart.clear()
            this.init()
          } else {
            // this.$Message.info('未查到相关数据！')
            // this.myChart.clear()
            this.flag = false
            this.init()
          }
        }).catch( error => {})
      },
      init () {
        let that = this
        this.myChart = this.echarts.init(this.$refs.myChart6, "light", {
          height: window.innerHeight / 2,
          width: window.innerWidth * 0.800
        });
        this.myChart.setOption(this.peopleActData)
        // this.myChart.on('click', function (param) {
        //   that.sendDate(param.name)
        // })
      }
    }
  }
</script>

<style scoped>

</style>
