<template>
  <div ref="myChart5" class="trend-container" style="margin-left: 25px; "></div>
</template>

<script>
    // 年龄段
    let builderJson = {
        "1-10岁": 0,
        "11-20岁": 0,
        "21-30岁": 0,
        "31-40岁": 0,
        "41-50岁": 0,
        "51-60岁": 0,
        "61-70岁": 0,
        "71-80岁": 0,
        "81-90岁": 0,
        "91-100岁": 0,
        "未知": 0
    };
    // 性别
    let downloadJson = {
        "男性": 0,
        "女性": 0,
        "未知": 0
    };
    // 血型
    let themeJson = {
        "A型": 0,
        "B型": 0,
        "AB型": 0,
        "O型": 0,
        "未知": 0,
        "其他": 0,
    };
    export default {
        data() {
            return {
                flag: false,
                date: '',
                myChart5: null,
                form:{
                  source: '',   //目标网站
                },

            }
        },
        computed: {
            getForm() {
                return this.$store.state.chartForm
            }
        },
        watch: {
            getForm(newVal, oldVal) {
                this.form = newVal
                // 年龄数据
                this.getAgeData()
                // 性别数据
                this.getGenderData ()
                // 血型数据
                this.getBloodData ()
            }
        },
        created() {
            // 年龄数据
            this.getAgeData ()
            // 性别数据
            this.getGenderData ()
            // 血型数据
            this.getBloodData ()
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
            /**获取年龄数据**/
            getAgeData () {
              this.axios({
                url: '/api/userInfoStatistic/ageStatistic',
                method: 'post',
                data: this.form
              }).then( result => {
                console.log("年龄数据",result)
                if (result.data.code === 200 && result.data.data[0].length !==0) {
                  let ageList = result.data.data[0]
                  console.log('ageList:',ageList)
                  let ageValue = [];
                  // 遍历年龄json 获取每个key对应的value,存入ageValue数组
                  for(let key in ageList){
                    ageValue.push(ageList[key])
                  }
                  console.log("ageValue:",ageValue)
                  // 年龄段添加数据
                  builderJson['1-10岁'] = ageValue[0]
                  builderJson['11-20岁'] = ageValue[1]
                  builderJson['21-30岁'] = ageValue[2]
                  builderJson['31-40岁'] = ageValue[3]
                  builderJson['41-50岁'] = ageValue[4]
                  builderJson['51-60岁'] = ageValue[5]
                  builderJson['61-70岁'] = ageValue[6]
                  builderJson['71-80岁'] = ageValue[7]
                  builderJson['81-90岁'] = ageValue[8]
                  builderJson['91-100岁'] = ageValue[9]
                  builderJson['未知'] = ageValue[10]

                  this.flag = true
                  this.myChart.clear()
                  this.init()
                } else {
                  // this.$Message.info('未查到相关数据！')
                  // this.myChart.clear()
                  this.init()
                  this.flag = false
                }
              }).catch( error => {})
            },
            /**获取性别数据**/
            getGenderData () {
              this.axios({
                url: '/api/userInfoStatistic/genderStatistic',
                method: 'post',
                data: this.form
              }).then( result => {
                console.log("性别数据:",result.data.data)
                if (result.data.code === 200 && result.data.data.length !==0 ) {
                  let genderList = result.data.data

                  // 性别添加数据
                  downloadJson['保密'] = genderList.unknown
                  downloadJson['男性'] = genderList.male
                  downloadJson['女性'] = genderList.female

                  this.flag = true
                  this.myChart.clear()
                  this.init()
                } else {
                  this.init()
                  this.flag = false
                }
              }).catch( error => {})
            },
            /**获取血型数据**/
            getBloodData () {
              this.axios({
                url: '/api/userInfoStatistic/bloodGroupStatistic',
                method: 'post',
                data: this.form
              }).then( result => {
                console.log("血型数据:",result.data.data)
                if (result.data.code === 200 && result.data.data.length !== 0) {
                  let bloodList = result.data.data

                  //血型添加数据
                  themeJson['A型'] = bloodList.A
                  themeJson['AB型'] = bloodList.AB
                  themeJson['B型'] = bloodList.B
                  themeJson['其他'] = bloodList.others
                  themeJson['O型'] = bloodList.O
                  themeJson['未知'] = bloodList.unknown


                  this.flag = true
                  this.myChart.clear()
                  this.init()
                } else {
                  // this.$Message.info('未查到相关数据！')
                  // this.myChart.clear()
                  this.init()
                  this.flag = false
                }
              }).catch( error => {})
            },
            init() {
                let that = this
                this.myChart = this.echarts.init(this.$refs.myChart5, "light", {
                    height: window.innerHeight / 1.6,
                    width: window.innerWidth * 0.775
                });

                let PeopleData = {
                    tooltip: {},
                    title: [{
                        text: '用户年龄分布',
                        textStyle: {
                            color: "#000", //00ffff
                            fontSize: 16,
                            fontWeight: '600'
                        },

                        subtext: '总计 ' + Object.keys(builderJson).reduce(function(all, key) {
                            return all + parseInt(builderJson[key]);
                        }, 0),
                        left: '30%',
                        textAlign: 'center',
                        subtextStyle: {
                            color: 'black',
                        }
                    }, {
                        text: '用户性别/血型分布',
                        textStyle: {
                            color: "#000",
                            fontSize: 16,
                            fontWeight: '600'
                        },
                        //text: '性别',
                        subtext: '总计 ' + Object.keys(downloadJson).reduce(function(all, key) {
                            return all + parseInt(downloadJson[key]);
                        }, 0),
                        left: '85%',
                        textAlign: 'center',
                        subtextStyle: {
                            color: '#000',
                        }
                    }, {
                        //text: '血型',
                        subtext: '总计 ' + Object.keys(themeJson).reduce(function(all, key) {
                            return all + parseInt(themeJson[key]);
                        }, 0),
                        left: '85%',
                        top: '52%',
                        textAlign: 'center',
                        subtextStyle: {
                            color: '#000'
                        }
                    }],
                    grid: [{
                        top: 50,
                        width: '60%',
                        // height:'100%',
                        bottom: '1%',
                        left: 30,
                        containLabel: true
                    }],
                    xAxis: [{
                        type: 'value',
                        // max:
                        splitLine: {
                            show: false
                        }
                    }],
                    yAxis: [{
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
                        },

                        {
                            type: 'pie',
                            radius: [0, '33%'],
                            center: ['85%', '31%'],
                            color: ['#86c9f4', '#4da8ec', '#3a91d2', '#315f97'],
                            data: Object.keys(downloadJson).map(function(key) {
                                return {
                                    name: key.replace('.js', ''),
                                    value: downloadJson[key]
                                }
                            })
                        }, {
                            type: 'pie',
                            radius: [0, '33%'],
                            center: ['85%', '82%'],
                            color: ['#14365c','#aad5f8', '#50aef6', '#2c86c9', '#005fa6', '#315f97', ],
                            data: Object.keys(themeJson).map(function(key) {
                                return {
                                    name: key.replace('.js', ''),
                                    value: themeJson[key]
                                };
                            })
                        }
                    ]
                }
                this.myChart.setOption(PeopleData)

            }
        }
    }
</script>

<style scoped>

</style>
