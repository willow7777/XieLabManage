<template>
  <div>
    <div ref="myChart" class="trend-container"></div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            // rate1: 37,
            // rate2: 33,
            // rate3: 30,
          myChart: null,
          myCirclePredict : {
            // backgroundColor: 'rgba(50,69,99,1)',
            series: [{
              name: '第一个圆环',
              type: 'pie',
              clockWise: false,
              radius: ['60%', '80%'],
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  shadowBlur: 0,
                  shadowColor: '#203665'
                }
              },
              hoverAnimation: false,
              center: ['15%', '50%'],
              data: [{
                value: 37,
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: 'black',
                        align: 'center',
                        fontSize: 35,
                        fontWeight: 'bold'
                      },
                      b: {
                        color: 'black',
                        align: 'center',
                        fontSize: 16
                      }
                    },
                    formatter: function (params) {
                      return '{b|支持}\n\n' + '{a|' + params.value + '%}'
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                      fontSize: '12',
                      fontWeight: 'normal',
                      color: 'black'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#86c9f4',
                    shadowColor: '#86c9f4',
                    shadowBlur: 0
                  }
                }
              }, {
                value: 100,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: '#263a53'
                  },
                  emphasis: {
                    color: '#263a53'
                  }
                }
              }]
            },
              {
                name: '第二个圆环',
                type: 'pie',
                clockWise: false,
                radius: ['60%', '80%'],
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                    shadowBlur: 0,
                    shadowColor: '#203665'
                  }
                },
                hoverAnimation: false,
                center: ['50%', '50%'],
                data: [{
                  value: 41,
                  label: {
                    normal: {
                      rich: {
                        a: {
                          color: 'black',
                          align: 'center',
                          fontSize: 35,
                          fontWeight: 'bold'
                        },
                        b: {
                          color: 'black',
                          align: 'center',
                          fontSize: 16
                        }
                      },
                      formatter: function (params) {
                        return '{b|中立}\n\n' + '{a|' + params.value + '%}'
                      },
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: '12',
                        fontWeight: 'normal',
                        color: 'black'
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#3a91d2',
                      shadowColor: '#3087d6',
                      shadowBlur: 0
                    }
                  }
                }, {
                  value: 100,
                  name: 'invisible',
                  itemStyle: {
                    normal: {
                      color: '#263a53'
                    },
                    emphasis: {
                      color: '#263a53'
                    }
                  }
                }]
              },
              {
                name: '第三个圆环',
                type: 'pie',
                clockWise: false,
                radius: ['60%', '80%'],
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                    shadowBlur: 0,
                    shadowColor: '#203665'
                  }
                },
                hoverAnimation: false,
                center: ['85%', '50%'],
                data: [{
                  value: 22,
                  label: {
                    normal: {
                      rich: {
                        a: {
                          color: 'black',
                          align: 'center',
                          fontSize: 35,
                          fontWeight: 'bold'
                        },
                        b: {
                          color: 'black',
                          align: 'center',
                          fontSize: 16
                        }
                      },
                      formatter: function (params) {
                        return '{b|反对}\n\n' + '{a|' + params.value + '%}'
                      },
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: '12',
                        fontWeight: 'normal',
                        color: 'black'
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#005fa6',
                      shadowColor: '#005fa6',
                      shadowBlur: 0
                    }
                  }
                }, {
                  value: 100,
                  name: 'invisible',
                  itemStyle: {
                    normal: {
                      color: '#263a53'
                    },
                    emphasis: {
                      color: '#263a53'
                    }
                  }
                }]
              }
            ]
          }
        }
    },
    created() {
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
            this.myChart.dispose()
            this.myChart = null
        }, 200);
    },
    methods: {
        /**获取数据**/
        // getData() {
        //     this.axios({
        //         url:'/api/search/getgraph/predict/cycleChart',
        //         method: 'post',
        //     }).then( result => {
        //         console.log('resPredictCircle:',result.data)
        //         if (result.data.code === 200 && result.data.data.length !== 0) {
        //             this.myCirclePredict.series[0].data[0].value = result.data.data[0]
        //             this.myCirclePredict.series[0].data[1].value = 100-result.data.data[0]
        //             this.myCirclePredict.series[1].data[0].value = result.data.data[1]
        //             this.myCirclePredict.series[1].data[1].value = 100-result.data.data[1]
        //             this.myCirclePredict.series[2].data[0].value = result.data.data[2]
        //             this.myCirclePredict.series[2].data[1].value = 100-result.data.data[2]
        //             this.myChart.clear()
        //             this.init()
        //         } else {
        //             // this.$Message.newsMng('未查到相关数据！')
        //             // this.myChart.clear()
        //             this.flag = false
        //             this.init()
        //         }
        //     }).catch( error => {})
        // },
        init() {
            let that = this
            // this.sendData([53, 14, 37])
            this.myChart = this.echarts.init(this.$refs.myChart, "default", {
                height: window.innerHeight / 4.2,
                width: window.innerWidth * 0.775
            });

            this.myChart.setOption(this.myCirclePredict)
            window.onresize = this.myChart.resize;
        },
    },
    computed: {
        // 获取真实百分比
        getDate () {
            return this.$store.state.changeRatePredict
        }
    },
    watch: {
        getDate: {
            handler (newvalue, oldvalue) {
                let that = this
                console.log("newvalue:",newvalue)
                let sum = newvalue[0]
                // this.title = newvalue[1]
                // var a = newvalue.split('/')
                // console.log('a:', a)

                // 目前只有俩数据 20% 53% 27% 和 44 36 20
                // 之后要根据真实数据计算出百分比并返回
                // parseInt(a[1])%2 ? this.sendData([20, 53, 27]) : this.sendData([44, 36, 20])
                newvalue.map((item, index) => {
                  if (index !== 0) {
                    let rate = Math.round(item / sum * 100)
                    that.myCirclePredict.series[index - 1].data[0].value = rate
                    that.myCirclePredict.series[index - 1].data[1].value = 100 - rate
                  }
                })
                this.init()
            }
        },
    }
}
</script>
