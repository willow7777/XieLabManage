<template>
  <div ref="myChart12" class="trend-container"></div>
</template>

<script>
  // 新闻来源
  let downloadJson = {
    "Twitter": 1024,
    "自由时报": 787,
    "三立新闻": 220
  };
  // 新闻媒体国别
  let countryJson = {
    "中国": 385,
    "美国": 656,
    "印度": 289,
    "其他": 334
  };
  //新闻媒体类别
  let sortJson={
    "官方媒体": 283,
    "主流媒体": 146,
    "其他媒体": 321
  }

  export default {
    name:"conflictForm",
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
        this.myChart = this.echarts.init(this.$refs.myChart12, "light", {
          height: window.innerHeight / 2.3,
          width: window.innerWidth * 0.8
        });

        let loseFrom = {
          tooltip: {},
          title: [
            {
              text: '新闻来源分布',
              left: '20%',
              top: '5%',
              textAlign: 'center',

            },
            {
              text: '新闻媒体国别分布',
              left: '50%',
              top: '5%',
              textAlign: 'center',
            },{
              text: '新闻媒体类型分布',
              left: '80%',
              top: '5%',
              textAlign: 'center',
            }
          ],
          series: [
            {
              type: 'pie',
              radius: '45%',
              center: ['20%', '45%'],
              color: ['#86c9f4', '#4da8ec', '#315f97'],
              data: Object.keys(downloadJson).map(function(key) {
                return {
                  name: key.replace('.js', ''),
                  value: downloadJson[key]
                }
              })
            },
            {
              type: 'pie',
              radius: '45%',
              center: ['50%', '45%'],
              color: ['#86c9f4', '#4da8ec', '#3a91d2', '#005fa6'],
              data: Object.keys(countryJson).map(function(key) {
                return {
                  name: key.replace('.js', ''),
                  value: countryJson[key]
                };
              })
            },
            {
              type: 'pie',
              radius: '45%',
              center: ['80%', '45%'],
              color: ['#86c9f4', '#4da8ec', '#3a91d2'],
              data: Object.keys(sortJson).map(function(key) {
                return {
                  name: key.replace('.js', ''),
                  value: sortJson[key]
                };
              })
            }
          ]
        }
        this.myChart.setOption(loseFrom)
      }
    }
  }
</script>

<style scoped>

</style>
