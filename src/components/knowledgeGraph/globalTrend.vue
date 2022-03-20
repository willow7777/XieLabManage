<template>
  <div>
    <Row :gutter="16" style="margin-bottom: 20px">
      <Card shadow>
       <global-chart></global-chart>
      </Card>
    </Row>
    <!--返回默认按钮-->
    <Button type="primary" @click="backDefault"  style="margin-bottom: 14px;">返回默认</Button>
    <!-- 卡片组件 -->
    <news-card-list :data="chartNewsData"
                 :totalSize="totalSize"
                 :pagenum="pageNum"
                 @update="getCardListData"
                 @updatePage="updatePage">
    </news-card-list>
  </div>
</template>

<script>
import globalChart from "../charts/globalChart";
import newsCardList from "./components/newsCardList";

export default {
  name: "entityBuild",
  components:{
    newsCardList,
    globalChart,
  },

  data() {
    return {
      chartNewsData: [],  //传递给new-card-list的数据
      pageNum: 1,     //初始在第几页
      pageSize: 10,   //一页显示几个
      totalSize: 70,   //总数据条数

      chartDate:''     // 传给后端的日期数据
    }
  },
  computed:{
    getDate(){
      return this.$store.state.chartDate
    }
  },
  watch:{
    getDate(newVal, oldVal){
      this.chartDate = newVal
      this.getCardListData()
    }
  },
  created() {
    this.getCardListData()
  },
  methods:{
    // 返回默认按钮方法
    backDefault: function () {
      this.chartDate = ''
      this.$store.state.chartDate = this.chartDate
    },
    // 更新翻页数据
    updatePage: function (page) {
      this.pageNum = page
      this.getCardListData()
    },
    requestData: function () {
      return {
        chartDate: this.chartDate,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
    },
    // 从后端获取数据
    getCardListData () {
      console.log('看看拿到数据了没:',this.requestData());
      this.axios({
        url: '/api/global/listData',
        method: 'post',
        data: this.requestData()
      }).then(result => {
        console.log(result.data);
        if (result.data.code === 200 && result.data.data!==null) {
          this.pageNum = result.data.data.pageNum
          this.chartNewsData = result.data.data.content
          this.totalSize = result.data.data.totalSize
          this.$Message.success(result.data.msg)
        } else {
          this.$Message.warning(result.data.msg)
          this.pageNum = 1;
          this.chartNewsData = ''
          this.totalSize = ''
        }
      }).catch(error => {
        console.log(error);
        this.$Message.error('error');
      })
    },
  }
}
</script>

<style lang="stylus" scoped>

.searchInput .el-button {
  margin-left: 20px;
}

.text {
  font-size: 14px;
}

.filterContent .ivu-form-item {
  margin-bottom 5px !important
}
</style>
