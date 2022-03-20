<template>
<div class="keyword">
    <div class="search">
        <div class="wordSearch">
          <Form label-position="right" :model="searchForm"  @submit.native.prevent>
            <div style="display: flex;">
              <FormItem >
                <RadioGroup v-model="searchForm.checkTarget">
                  <div style="display: grid;grid-template-columns: repeat(7, 1fr)">
                    <Radio label="">不限</Radio>
                    <Radio label="twitter">Twitter</Radio>
                    <Radio label="facebook">Facebook</Radio>
                    <Radio label="weibo">微博</Radio>
                    <Radio label="ck101">卡提诺</Radio>
                    <Radio label="eyny">伊莉</Radio>
                    <Radio label="ltn">自由时报</Radio>
                    <Radio label="setn">三立新闻</Radio>
                    <Radio label="lihkg">连登</Radio>
                    <Radio label="DFI">印度军事论坛</Radio>
                    <Radio label="sputniknews">俄罗斯卫星通讯社</Radio>
                    <Radio label="nytimes">纽约时报</Radio>
                    <Radio label="ani">亚洲国际新闻</Radio>
                    <Radio label="timesofindia">印度时报</Radio>
                    <Radio label="outlook">瞭望</Radio>
                    <Radio label="cnr">央广网</Radio>
                    <Radio label="sohu">搜狐</Radio>
                    <Radio label="sina">新浪</Radio>
                    <Radio label="11" :label="true" disabled>ADSB</Radio>
                    <Radio label="12" :label="true" disabled>印度卫生部</Radio>
                    <Radio label="13" :label="true" disabled>失业率</Radio>
                  </div>
                </RadioGroup>
              </FormItem>
              <div>
                <Input v-model="searchForm.label" placeholder="请输入搜索内容" style="width: 200px" />
                <Button type="primary" icon="ios-search" @click="searchClick">Search</Button>
              </div>
            </div>

          </Form>
        </div>
    </div>
    <div class="wordTable">
        <!-- <Table :columns="list" :data="data" :loading="loading">
          <template slot-scope="{ row, index }" slot="taskId">
            <span>156</span>
          </template>
          <template slot-scope="{ row, index }" slot="keyword">
            <span>美国疫情</span>
          </template>
          <template slot-scope="{ row, index }" slot="target">
            <span>Twitter</span>
          </template>
          <template slot-scope="{ row, index }" slot="createTime">
            <span>2021.01.05</span>
          </template>
          <template slot-scope="{ row, index }" slot="taskTime">
            <span>-</span>
          </template>
          <template slot-scope="{ row, index }" slot="taskStatus">
            <span>未运行</span>
          </template>
          <template slot-scope="{ row, index }" slot="operator">
            <span>lst</span>
          </template> -->
          <Table :columns="list" :data="data" :loading="loading">
          <template slot-scope="{ row, index }" slot="taskId">
            <span>{{ row.taskId }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="keyword">
            <span>{{ row.keyword }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="target">
            <span>{{ row.target | target }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="createTime">
            <span>{{ row.createTime | createTime}}</span>
          </template>
          <template slot-scope="{ row, index }" slot="taskTime">
            <span>{{ row.taskTime }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="taskStatus">
            <span>{{ row.taskStatus | status }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="operator">
            <span>{{ row.operator }}</span>
          </template>
        </Table>
    </div>

    <!-- 分页 -->
    <div class="page-bottom">
        <Page :total="dataCount"
              :current="currentPage"
              :page-size="pageSize"
              show-elevator
              @on-change="changePage" />
    </div>
    <div class="clear"></div>
</div>
</template>

<script>
export default {
    data () {
        return {
            searchForm: {   // 搜索表单数据
              label: '',  // 输入搜索值
              checkTarget: ''
            },
            dataCount: 10,    // 总数据条数
            currentPage: 1,    // 当前页数
            pageSize: 10,   // 每页条数
            loading: false,
            list: [
                {title: '任务ID', slot: 'taskId'},
                {title: '关键词', slot: 'keyword'},
                {title: '目标网站', slot: 'target'},
                {title: '时间', slot: 'createTime'},
                {title: '任务执行时间', slot: 'taskTime'},
                {title: '任务状态', slot: 'taskStatus'},
                {title: '操作者', slot: 'operator'}
            ],
            data: []
        }
    },
    filters: {
      createTime: function (label) {
        const year = label.substring(0,4)
        const month = label.substring(4,6)
        const day = label.substring(6,8)
        return year + '.' + month + '.' + day
      },
      target: function (label) {
        switch (label) {
          case "zhihu":
            return '知乎'
          case 'weibo':
            return '微博'
          case 'facebook':
            return 'Facebook'
          case 'twitter':
            return 'Twitter'
          case 'setn':
            return '三立新闻'
          case 'ck101':
            return '卡提诺'
          case 'ltn':
            return '自由时报'
          default:
            return '伊莉'
        }
      },
      status: function (label) {
        switch (label) {
          case 0:
            return '未运行'
          case 1:
            return '执行中'
          case -1:
            return '已完成'
          case -2.:
            return '失败'
          default:
            return '未运行'
        }
      }
    },
    // 初始化数据
    created () {
        this.getDate()
    },
    // 接受任务配置界面完成的任务列表
    mounted () {

    },
    watch: {
        currentPage (val) {
          this.getDate()
        },
        'searchForm.checkTarget': function () {
          this.currentPage = 1
          this.getDate()
        }
    },
    methods: {
      searchClick: function () {
        this.currentPage = 1
        this.getDate()
      },
      /**
       * 搜索
       * @params int page 获取第几页
       */
      getDate () {
        this.loading = true
        this.axios('/api/task/findtask',{
            params: {
              keyword: this.searchForm.label,
              target: this.searchForm.checkTarget,
              page: this.currentPage
            }
          }
        ).then( result => {
          this.loading = false
          this.data = result.data.data.content
          this.dataCount = result.data.data.totalSize
          for (let i=0; i<this.data.length; i++) {
            if (this.data[i].taskStatus === -1) {
              this.data[i].taskTime = (( this.data[i].endTime - this.data[i].startTime ) / 60).toFixed(2) + '分钟'
            } else {
              this.data[i].taskTime = '--'
            }
          }
          this.$Message.success('Success');
        }).catch(error=> {
          this.$Message.error('Fail!');
        })
      },
      /**
       * 翻页
       * @param  (int) index 页数
       */
        changePage (index) {
            // 翻页
            // this.getDate (index)
            // console.log(index)
            this.currentPage = index
            // this.axios.post('/api/getHistList', index).then((res) => {
            //     console.log(res)
            //     this.data = res.data.list
            // })
            /*if (index == 1) this.data = this.allData.slice(0, 10)
            else if (index == 2) this.data = this.allData.slice(10, 20)*/
        }
    }
}
</script>

<style lang="stylus" scoped>
.keyword
    min-height 400px
    height 100%
.search
    padding 10px 0
    width 100%
    height 32px
    display inline-table
.wordSearch
    /*float right*/
.wordTable
    position: relative;
    border: 1px solid #dcdee2;
    border-bottom: 0;

.page-bottom
    float right
    margin 20px 0

.clear
    clear both


</style>
