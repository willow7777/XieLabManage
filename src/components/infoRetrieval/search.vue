<template>
<div class="search">
    <!-- 高级搜索 -->
    <div class="filterTime">
      <div class="filterContent">
        <!-- 普通搜索 -->
        <div class="info-operate">
          <!-- <Button type="primary" style="visibility: hidden;"></Button> -->
          <div class="searchInput">
            <span>信息检索：</span>
            <Form ref="findForm" label-position="right" :model="searchForm" :label-width="150" @submit.native.prevent="filter('1')">
              <FormItem label="搜索内容：">
                <Input v-model="searchForm.searchText" placeholder="输入关键字" style="width: 400px;margin-right: 20px" clearable />
                <Button type="primary" icon="ios-search" @click="filter('1')">搜索</Button>
              </FormItem>
            </Form>
          </div>
        </div>
        <div style="display: flex;align-items: center;margin-top: 20px">
          <span>信息筛选：</span>
          <Form ref="filterForm" label-position="right" :model="form" :label-width="150">
            <FormItem label="选择关键字：">
              <Select v-model="form.keyword" clearable placeholder="请选择" style="width: 300px">
                <Option
                        v-for="item in keywordOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </Option>
              </Select>
            </FormItem>
            <FormItem label="选择发帖日期：">
              <DatePicker
                      v-model="form.date"
                      format="yyyy-MM-dd"
                      type="daterange"
                      placement="bottom-end"
                      placeholder="Select date"
                      style="width: 300px">
              </DatePicker>
            </FormItem>
            <FormItem label="选择采集时间：">
                <DatePicker
                    v-model="form.time"
                    format="yyyy-MM-dd HH:mm"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="Select time"
                    style="width: 300px">
                </DatePicker>
            </FormItem>
            <FormItem label="选择热度：">
              <Select v-model="form.heat" clearable placeholder="请选择" style="width: 300px">
                <Option
                        v-for="item in heatOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </Option>
              </Select>
            </FormItem>
            <FormItem>
              <RadioGroup v-model="form.checkList">
                <div style="display: grid;grid-template-columns: repeat(7, 1fr)">
                  <Radio label="">不限</Radio>
                  <Radio label="twitter">Twitter</Radio>
                  <Radio label="facebook">Facebook</Radio>
                  <Radio label="weibo">微博</Radio>
                  <Radio label="ck101">卡提诺</Radio>
                  <Radio label="eyny">伊莉</Radio>
                  <Radio label="ltn">自由时报</Radio>
                  <Radio label="setn">三立新闻</Radio>
                  <Radio label="1">连登</Radio>
                  <Radio label="2">印度军事论坛</Radio>
                  <Radio label="3">俄罗斯卫星通讯社</Radio>
                  <Radio label="4">纽约时报</Radio>
                  <Radio label="5">亚洲国际新闻</Radio>
                  <Radio label="6">印度时报</Radio>
                  <Radio label="7">瞭望</Radio>
                  <Radio label="8">央广网</Radio>
                  <Radio label="9">搜狐</Radio>
                  <Radio label="10">新浪</Radio>
                  <Radio label="11" :value="true" disabled>ADSB</Radio>
                  <Radio label="12" :value="true" disabled>印度卫生部</Radio>
                  <Radio label="13" :value="true" disabled>失业率</Radio>
                </div>
              </RadioGroup>
              <Button type="primary"
                      @click="filter('2')"
                      style="margin-left: 20px; width: 88px;">
                筛选
              </Button>
              <Button type="primary"
                      @click="reset"
                      style="margin-left: 20px">
                返回默认
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  <!-- 卡片组件 -->
  <search-list :data="searchListDate"
                :totalSize="totalSize"
                :pagenum="pagenum"
                class="info-search-list"
                @update="seniorSearch"
                @updatePage="updatePage">
  </search-list>
</div>
</template>

<script>
import searchList from './components/searchList.vue'

export default {
    inject: ['reload'],     // 重新加载当前组件
    data () {
        return {
            index: '2',
            form: {                                       // 高级搜索表单数据
              checkList: '',
              keyword: '',
              heat: '',
              date: '',
              time: ''
            },
            searchForm: {
              searchText: '',                               // 搜索关键字
            },
            keywordOptions: [],                                    // 关键字选项
            heatOptions : [
              {value: '0.2', label: '0.0-0.2'},
              {value: '0.4', label: '0.2-0.4'},
              {value: '0.6', label: '0.4-0.6'},
              {value: '0.8', label: '0.6-0.8'},
              {value: '1.0', label: '0.8-1.0'}
            ],
            searchListDate: [],                             // 传递给searchList组件的数据
            pagenum: 1,
            pagesize: 10,     // 每页条数
            totalSize: 100,   // 总数据条数
        }
    },
    computed: {

    },
    components: { searchList },
    methods: {
      updatePage: function (page) {
        this.pagenum = page
        this.seniorSearch()
      },
      filter: function (index) {
        if (index === '1') {  // 智能搜索
          this.index = '1'
        } else {  // 智能筛选
          this.index = '2'
          this.searchForm.searchText = ''
        }
        this.pagenum = 1
        this.pagesize = 10
        this.seniorSearch()
      },
      reset: function () {
        this.reload()
      },
      requestData: function () {
        return {
          keywords: this.form.keyword,
          startcreatetime: this.parseDate(this.form.date[0]),
          endcreatetime: this.parseDate(this.form.date[1]),
          startcrawltime: this.parseTime(this.form.time[0]),
          endcrawltime: this.parseTime(this.form.time[1]),
          resource: this.form.checkList,
          heat: this.form.heat,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        }
      },
      searchData: function (arr) {
        let list = []
        for (let i=0; i<arr.length; i++) {
          list.push({
            idx: arr[i].source.idx,
            title: arr[i].highlight.title,
            text: arr[i].highlight.text,
            createTime: arr[i].source.create_time,
            resource: arr[i].source.resource,
            keywords: arr[i].source.keywords,
            textLength: arr[i].source.text_length,
            url: arr[i].source.url,
            origTitle: arr[i].source.title,
            origText: arr[i].source.text
          })
        }
        return list
      },
      /**
       * 普通搜索
       */
      searchClick () {
      },
      /**
       * 高级搜索
       */
      seniorSearch () {
        // console.log(this.requestData());
        if (this.index === '2') {
          // 默认搜索
          this.axios({
            url: '/api/data/findinfo',
            method: 'post',
            data: this.requestData()
          }).then(result => {
            // console.log(result.data);
            if (result.data.code === 200) {
              this.pagenum = result.data.data.pageNum
              this.searchListDate = result.data.data.content
              this.totalSize = result.data.data.totalSize
              this.$Message.success(result.data.msg)
            } else {
              this.$Message.warning(result.data.msg)
            }
          }).catch(error => {
            console.log(error);
            this.$Message.error('error');
          })
        } else if (this.index === '1') {
          // queryhigh 搜索
          this.axios('/api/search/queryhigh',{
            params: {
                keyword: this.searchForm.searchText,
                pageNo: this.pagenum,
                pageSize: this.pagesize,
                fields: ''
              }
          }).then(result => {
            console.log(this.searchForm.searchText);
            if (result.data.code === 200) {
              this.pagenum = result.data.data.pageNum
              this.searchListDate = this.searchData(result.data.data.content)
              this.totalSize = result.data.data.totalSize
              this.$Message.success(result.data.msg)
            } else {
              this.$Message.warning(result.data.msg)
            }
          }).catch(error => {
            console.log(error);
            this.$Message.error('error');
          })
        }
      },
      /**
       * 解析时间 转换 成 yyyymmdd格式
       * @param (object) obj date对象
       * @returns {string}
       */
      parseDate: function (obj) {
        try {
          const year = obj.getFullYear()
          const month = (obj.getMonth() + 1)>=10 ? (obj.getMonth() + 1) : '0'+(obj.getMonth() + 1)
          const day = (obj.getDate())>=10 ? (obj.getDate()) : '0'+(obj.getDate())
          return year + '-'+ month + '-' + day;
        } catch (e) {
          return '';
        }
      },
      parseTime: function (obj) {
          try {
              const year = obj.getFullYear()
              const month = (obj.getMonth() + 1)>=10 ? (obj.getMonth() + 1) : '0'+(obj.getMonth() + 1)
              const day = (obj.getDate())>=10 ? (obj.getDate()) : '0'+(obj.getDate())
              const hour = (obj.getHours())>10 ? (obj.getHours()) : '0'+(obj.getHours())
              return year + '-'+ month + '-' + day + '-' + hour;
          } catch (e) {
              return '';
          }
      },
      /**
       * 导出数据
       */
      exportInfo (url) {
        this.$Notice.open({
          name: 'exportInfo',
          desc: '正在导出，请稍等',
          duration: 0
        });
		console.log(new Date().toLocaleTimeString())
        this.axios({
          url: url,
          method: 'post',
          data: {
            'startcreatetime': this.requestData().startcreatetime,
            'endcreatetime': this.requestData().endcreatetime,
            'resource': this.requestData().resource,
            'keywords': this.requestData().keywords,
            'startcrawltime': this.requestData().startcrawltime,
            'endcrawltime': this.requestData().endcrawltime,
            'heat': this.requestData().heat,
          },
          responseType: 'blob'
        }).then((response) => {
          // 创建一个新的url，此url指向新建的Blob对象
          let url = window.URL.createObjectURL(new Blob([response.data]))
          // 创建a标签，并隐藏改a标签
          let link = document.createElement('a')
          link.style.display = 'none'
          // a标签的href属性指定下载链接
          link.href = url
          //setAttribute() 方法添加指定的属性，并为其赋指定的值。
          link.setAttribute('download', Date.parse(new Date()) + '.csv')
          document.body.appendChild(link)
          link.click()
          this.$Notice.close('exportInfo')
        }).catch((error) => {this.$Message.error('Error!');this.$Notice.close('exportInfo');console.log(new Date().toLocaleTimeString())})
      }
    },
    created: function () {
      this.seniorSearch()
    },
    mounted () {
        this.axios.get('/api/data/keywordslist').then((res) => {
            res.data.data.map(item => this.keywordOptions.push({ value: item, label: item }))
        }).catch((error) => console.log(error))
    },
}
</script>

<style lang="stylus" scoped>
/**@import './search'*/
.searchInput {
  width :100%;
  display: flex;
  align-items center
  padding-bottom 10px
  // border-bottom 1px dashed #333
  border-bottom 1px solid #e0dede
  /*justify-content:center;*/
}
.searchInput .el-button {
  margin-left: 20px;
}
.filterTime {
  // padding: 15px
  margin-top 20px
}
.filterContent {
  border: 1px solid #ccc;
  padding: 15px
}
.card {
  display flex
  justify-content center
  padding: 15px
  border: 1px solid #ccc;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  /*width: 480px;*/
  width 50%
}


.filterContent .ivu-form-item {
  margin-bottom 5px !important
}
</style>
