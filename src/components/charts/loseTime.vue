<template>
  <div ref="myChart11" class="trend-container"></div>
</template>

<script>
  let builderJson = {
    "1": 21,
    "2": 240,
    "3": 450,
    "4": 250,
    "5": 230,
    "6": 620,
    "7": 120,
    "8": 80,
    "9": 30,
    "10": 10,
    "11": 72,
    "12": 33
  };
  export default {
    name: "loseTime",
    data() {
      return {

      }
    },
    computed: {},
    watch: {

    },
    created() {
      this.getData()
    },
    mounted() {
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
      init() {
        let that = this
        this.myChart = this.echarts.init(this.$refs.myChart11, "light", {
          height: window.innerHeight / 2,
          width: window.innerWidth * 0.9
        });

        let loseTime = {
          tooltip: {},
          title: [{
            text: '新闻发帖时间',
            textStyle: {
              color: "#000",
              fontSize: 18,
              fontWeight: '600'
            },
            left: '46%',
            textAlign: 'center',
          }],
          grid: [{ //grid属性条形图的主体位置
            top: 50,
            // bottom: '1%',
            left: 70,
            right:230,
            containLabel: true
          }],
          // grid: { //图表位置
          //     x: 25, //左
          //     y: 65, //上
          //     x2: 25, //右
          //     y2: 20, //下
          // },
          xAxis: [{
            name:'新闻数量',
            type: 'value',
            // max:
            splitLine: {
              show: true
            }
          }],
          yAxis: [{
            name:'时间',
            type: 'category',
            data: Object.keys(builderJson),
            axisLabel: {
              interval: 0,
              rotate: 30
            },
            splitLine: {
              show: true
            }
          }, ],
          series: [{
            type: 'bar',
            stack: 'chart',
            z: 3,
            label: {
              normal: {
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#4da8ec',
                shadowColor: '#4da8ec',
                shadowBlur: 0
              }
            },
            data: Object.keys(builderJson).map(function(key) {
              return builderJson[key];
            })
          }]

        }
        this.myChart.setOption(loseTime)
      }
    }
  }
</script>

<style scoped>

</style>
