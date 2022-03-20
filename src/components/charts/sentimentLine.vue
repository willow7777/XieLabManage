<template>
  <div>
    <div ref="myChart2" class="trend-container"></div>
  </div>
</template>

<script>
// let xName = 1;
// let axisX = -1;
export default {
    data () {
        let fontColor = '#afe1ff';

        // console.log(xName)
        return {
            date: '',
            myChart: null,
            form: {
              // topic: '2012總統大選,大家會投馬英九嗎',
              // starttime: '2011-04-05T00:00:00',  //按采集时间筛选——开始
              // granularity: 3     //预测粒度
              topic: '',
              starttime: '',  //按采集时间筛选——开始
              granularity: 1     //预测粒度
            },
            lineData: {
                // backgroundColor: 'rgba(50,69,99,1)',
                // title: {
                //   left: 'center',
                //   x:'300px',
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                  show:true,
                  x:'center',
                  y:'',
                  // itemStyle:{
                  //   itemHeight:10,
                  //   itemWidth:10
                  // },
                  textStyle: {
                      color: 'black',
                      fontSize:14
                  },
                  data: ['支持占比','紧张程度']
                },
                grid: {
                    left: '3%',
                    right: '8%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    name:"时间",
                    nameTextStyle:{
                      fontSize:16,
                      padding:15,
                    },
                    type: 'category',
                    boundaryGap: false,
                    axisLabel:{
                      color: 'black',
                      fontSize:14
                    },
                    axisLine:{
                      show:true,
                      lineStyle:{
                        color:'black',
                        width:1
                      }
                    },
                    axisTick:{
                      show:false,
                    },
                    splitLine:{
                      show:true,
                      lineStyle:{
                        color:'#afe1ff'
                      }
                    },
                    data: ['01-01', '01-08', '01-15', '01-22', '01-29', '02-05', '02-12', '02-19',
                    '02-26', '03-05', '03-12', '03-19', '03-26'],
                },
                yAxis: {
                    name: '占比',
                    nameTextStyle:{
                      padding:10,
                      fontSize:14
                    },
                    nameLocation: 'end',
                    type: 'value',
                    axisLabel : {
                      formatter: '{value}',
                      textStyle:{
                        color:'black',
                        fontSize:14
                      }
                    },
                    axisLine:{
                      lineStyle:{
                        color:'black',
                        width:1
                      }
                    },
                    axisTick:{
                      show:false,
                    },
                    splitLine:{
                      show:true,
                      lineStyle:{
                        color:'#afe1ff'
                      }
                    }
                },
                series: [
                    {
                        name: '支持占比',
                        type: 'line',
                        smooth: true,  //关键点，为true是不支持虚线，实线就用true
                        itemStyle: {
                          normal: {
                            color:'#3A84FF',
                            lineStyle: {
                              color: "#3A84FF",
                              width:2
                            },
                          }
                        },
                        markPoint:{
                          pointStyle:{
                            normal: {
                              color:'#ff2d51'
                            }
                          },
                          data:[
                            {name:'最大值', xAxis:-1, yAxis:0},
                            // {name:'最小值', type:'min'},
                          ]
                        },
                        //  markLine: {
                        //     lineStyle: {
                        //         normal: {
                        //             type: 'solid',
                        //             width:3,
                        //             color:'#ff2d51'
                        //         }
                        //     },
                        //     data: [
                        //         {
                        //             xAxis: 12,
                        //         }
                        //     ]
                        // },
                        // data:[]
                        data: [0.719, 0.376, 0.13,0.55,0.4,0.44,0.16,0.322,0.78,0.244,0.56,0.244,0.23,0.699,0.534]
                    },
                    // {
                    //   name: '支持',
                    //   type: 'line',
                    //   smooth: false,
                    //   itemStyle: {
                    //     normal: {
                    //       color:'#2fca95',
                    //       lineStyle: {
                    //         color: "#2fca95",
                    //         width:3,
                    //         type:'dotted'
                    //       },
                    //     }
                    //   },
                    //   data:[]
                    //   // data: ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 1034, 1299, 1499]
                    // },
                    // {
                    //     name: '中立',
                    //     type: 'line',
                    //     smooth: true,
                    //     itemStyle: {
                    //       normal: {
                    //         color:'#3A84FF',
                    //         lineStyle: {
                    //           color: "#3A84FF",
                    //           width:2
                    //         },
                    //       }
                    //     },
                    //     data:[]
                    //     // data: [150, 232, 201, 154, 190, 330, 410, 544, 531, 701, 695, 672]
                    // },
                    // {
                    //   name: '中立',
                    //   type: 'line',
                    //   smooth: false,
                    //   itemStyle: {
                    //     normal: {
                    //       color:'#3A84FF',
                    //       lineStyle: {
                    //         color: "#3A84FF",
                    //         width:3,
                    //         type:'dotted'
                    //       },
                    //     }
                    //   },
                    //   data:[]
                    //   // data: ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 672, 621, 567]
                    // },
                    {
                        name: '紧张程度',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                          normal: {
                            color: 'rgba(255,80,124,1)',
                            lineStyle: {
                              color: "rgba(255,80,124,1)",
                              width:2
                            },
                          }
                        },
                       data: [0.32,0.56,0.719, 0.376, 0.13,0.55,0.4,0.44,0.16,0.322,0.78,0.244,0.56,0.244,0.23]
                    },
                    // {
                    //   name: '反对',
                    //   type: 'line',
                    //   smooth: false,
                    //   itemStyle: {
                    //     normal: {
                    //       color: 'rgba(255,80,124,1)',
                    //       lineStyle: {
                    //         color: "rgba(255,80,124,1)",
                    //         width:3,
                    //         type:'dotted'
                    //       },
                    //     }
                    //   },
                    //   data:[]
                    //   // data: ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 583, 585, 602]
                    // }
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
      flag () {
        this.init()
      },
      getForm (newVal, oldVal) {
        this.form = newVal
        this.getData()
      }
    },
    created () {
      // this.getData()
    },
    mounted () {
        this.init()
    },
    beforeDestroy() {
        if (!this.myChart) {
            return
        }
        setTimeout(() => {
          this.myChart.dispose();
          this.myChart = null
        }, 200);
    },
    methods: {
        // getData(){
        //   this.axios.post('/api/search/getgraph/predict/linechart', JSON.stringify(this.form),
        //       {headers:{'Content-Type':'application/json;charset=UTF-8'}}).then(result => {
        //     console.log("linePredictData:",result.data.data)
        //
        //
        //     // this.option.xAxis.data = []
        //     this.lineData.series[0].data = []   //index0-11有值 后12 13无值
        //     this.lineData.series[1].data = []   //index0-10无值 后11 12 13有值  result.data.data.coordinate[0]
        //     this.lineData.series[2].data = []   //index0-11有值 后12 13无值
        //     this.lineData.series[3].data = []    //index0-10无值 后11 12 13有值  result.data.data.coordinate[1]
        //     this.lineData.series[4].data = []    //index0-11有值 后12 13无值
        //     this.lineData.series[5].data = []    //index0-10无值 后11 12 13有值  result.data.data.coordinate[2]
        //
        //     if (result.data.code == 200){
        //       if(result.data.data.coordinate.length > 1) {
        //           console.log("1：",result.data.data.coordinate[0][0])
        //           this.lineData.series[0].markPoint.data[0].xAxis = result.data.data.node   //横坐标标记点
        //           this.lineData.xAxis.name = "粒度("+result.data.data.xTimeName+"小时)"      //坐标单位
        //           for(let i=0;i<=11;i++){
        //               this.lineData.series[0].data[i] = result.data.data.coordinate[0][i]   //支持
        //               this.lineData.series[2].data[i] = result.data.data.coordinate[1][i]   //中立
        //               this.lineData.series[4].data[i] = result.data.data.coordinate[2][i]   //反对
        //           }
        //           for(let j=0;j<=10;j++){
        //               this.lineData.series[1].data[j] = '-'
        //               this.lineData.series[3].data[j] = '-'
        //               this.lineData.series[5].data[j] = '-'
        //           }
        //           for(let k=11;k<=13;k++){
        //               this.lineData.series[1].data[k] = result.data.data.coordinate[0][k]
        //               this.lineData.series[3].data[k] = result.data.data.coordinate[1][k]
        //               this.lineData.series[5].data[k] = result.data.data.coordinate[2][k]
        //           }
        //           console.log(this.lineData.series[0].data)
        //           console.log(this.lineData.series[1].data)
        //
        //         this.flag = true
        //         // this.$Loading.finish();
        //         this.$Message.success(
        //           {
        //             content:'预测曲线更新完成',
        //             duration: 3,
        //             closable: true
        //           }
        //         );
        //         // this.$Spin.hide()
        //         this.$store.state.isSpinShow = false
        //         // this.$store.state.isDisable = false
        //         this.myChart.clear()
        //         this.init()
        //       }
        //       else if(result.data.data.coordinate.length === 1){
        //         this.$Message.info({
        //           content: '此时间段内无数据，请重新选择',
        //           top:100,
        //           duration: 5,
        //           closable: true
        //         });
        //         // this.$Spin.hide()
        //         this.$store.state.isSpinShow = false
        //         // this.$store.state.isDisable = false
        //         this.myChart.clear()
        //         this.init()
        //         // this.$Loading.error();
        //       }
        //       // else if(result.data.data === null){
        //       //   console.log("null")
        //       //   this.$store.state.isSpinShow = false
        //       // }
        //     }
        //     else if(result.data.code == 201) {
        //       console.log('异常201')
        //       this.$Message.info({
        //         content: '操作正在执行，请勿重复操作',
        //         top:100,
        //         duration: 5,
        //         closable: true
        //       });
        //       this.$store.state.isSpinShow = false   // 关闭遮罩
        //       this.$Notice.destroy()
        //     }
        //     else if(result.data.code == 202) {
        //       console.log('异常202')
        //       this.$Message.info({
        //         content: '预测数据为空！请重新选择',
        //         top:100,
        //         duration: 5,
        //         closable: true
        //       });
        //       this.$store.state.isSpinShow = false   // 关闭遮罩
        //       this.$Notice.destroy()
        //     }
        //     else if(result.data.code == 203) {
        //       console.log('异常203')
        //       this.$Message.info({
        //         content: '请求超时',
        //         top:100,
        //         duration: 5,
        //         closable: true
        //       });
        //       this.$store.state.isSpinShow = false   // 关闭遮罩
        //       this.$Notice.destroy()
        //     }
        //   }).catch((error) => console.log(error))
        // },
        init () {
            let that = this
            this.myChart = this.echarts.init(this.$refs.myChart2, "", {
                height: window.innerHeight / 2,
                width: window.innerWidth * 0.775,
            });
            this.myChart.setOption(this.lineData)
            window.onresize = this.myChart.resize;
            // 点击折现图的点 触发sendDate方法
            this.myChart.on('click', function (param) {   //这个param是一个点的信息
                that.sendDate(param)  //获取到点的横坐标
                // that.sendDate(param)  //获取到点的横坐标
                console.log('param:',param)
            })

        },
        sendDate (val) {
            // console.log("val:",val)
            let sum = 0
            let arr = []
            if(val.dataIndex<=11){
                arr.push(this.lineData.series[0].data[val.dataIndex],this.lineData.series[2].data[val.dataIndex],this.lineData.series[4].data[val.dataIndex])
            }
            else{
                arr.push(this.lineData.series[1].data[val.dataIndex],this.lineData.series[3].data[val.dataIndex],this.lineData.series[5].data[val.dataIndex])
            }
            console.log("arr:",arr)
            arr.forEach((item,index)=>{
                sum += item
            })
            console.log("sum:",sum)
            arr.unshift(sum)
            this.$store.state.changeRatePredict = arr
            // console.log('sendDate', this.$store.state.changeRatePredict)
        }
    }
    // watch: {
    //     date (val) {
    //         console.log(val)
    //         this.$store.state.changeRatePredict= val
    //     }
    // }
}
</script>
