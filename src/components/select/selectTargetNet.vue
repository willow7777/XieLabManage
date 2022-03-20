<template>
    <div>
        <Form ref="form" :model="form" :rules="ruleValidate" inline style="margin-left: 110px">
            <FormItem label="选择目标网站："  prop="source">
                <Select v-model="form.source" clearable placeholder="请选择" style="width: 340px">
                    <Option
                        v-for="item in targetNetOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="filterBtn('form')" icon="ios-search" style="margin-top: 34px;margin-left: 5px;width: 90px">筛选</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    // props: { name: String },
    data () {
        return {
            form: {
              source: '',  //目标网站
            },

            // 目标网站列表
            targetNetOptions: [
              {value: 'twitter', label: 'Twitter'},
              {value: 'facebook', label: 'Facebook'},
              {value: 'weibo', label: '微博'},
              {value: 'ck101', label: '卡提诺'},
              {value: 'eyny', label: '伊莉'},
              {value: 'ltn', label: '自由时报'},
              {value: 'setn', label: '三立新闻'},
              {value: 'lihkg', label: '连登'},
              {value: 'DFI', label: '印度军事论坛'},
              {value: 'sputniknews', label: '俄罗斯卫星通讯社'},
              {value: 'nytimes', label: '纽约时报'},
              {value: 'outlook', label: '瞭望'},
              {value: 'timesofindia', label: '印度时报'},
              {value: 'cnr', label: '央广网'},
              {value: 'sina', label: '新浪'},
              {value: 'sohu', label: '搜狐'},
              {value: 'ani', label: '亚洲国际新闻'}
            ],

            ruleValidate: {
              source: [
                { required: true, message: '请选择目标网站', trigger: 'change' }
              ],
            }
        }
    },
    mounted () {
        //从后端获取目标网站选项部分
        // this.axios.get('/api/data/topiclist').then((res) => {
        //     console.log("resSelect",res.data)
        //     res.data.data.map(item => this.targetNetOptions.push({ value: item, label: item }))
        // }).catch((error) => console.log(error))
    },
    computed: {
      watchTopic () {
        return this.form.source
      }
    },
    watch: {
    },
    methods: {
        filterBtn (name) {
          console.log('name',name)
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$store.state.chartForm = this.requestData()
              this.$Message.success(
                {
                  content:'发送请求成功!',
                  duration:1,
                }
              );
            } else {
              this.$Message.error('请求失败，请检查是否完整填写表单!');
            }
          })
        },
        requestData: function () {
            if(this.form.source===undefined){
              this.form.source = ''
            }
            return {
              source: this.form.source,
            }
        },
    }
}
</script>
<style scoped>
</style>
