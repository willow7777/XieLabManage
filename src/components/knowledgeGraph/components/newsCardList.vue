<template>
  <div>
    <!-- 添加卡片按钮 -->
    <div class="cardWrapper">
      <!-- 循环卡片 -->
      <Card class="cardItem" v-for="(item, index) in data" :key="index">
        <div>
          <p class="cardContent partContent" style="text-indent:2em">
            <!-- {{ item.text }} -->
            <span v-html="item.text"></span>
          </p>
          <p style="margin-top: 5px">
            <span v-if="item.remark" style="color: #673AB7;">
              备注内容：{{ item.remark }}
            </span>
            <span v-if="item.tension" style="color:#FF1F00; margin-left: 10px">
              紧张程度：{{ item.tension | tension }}
            </span>
          </p>
        </div>
        <div slot="title" style="display: flex;justify-content: space-between">
          <div>
            <h3>
              <span v-html="item.date.substr(0,10)+' 新闻事件'"></span>
              <span style="font-size: 13px; margin-left: 10px">
                <a href="javascript:void(0)" @click="tiggerContent(index)" class="text">展开内容</a>
              </span>
              <span style="font-size: 13px; margin-left: 20px">
                <a :href="item.url" target="_blank">原始链接</a>
              </span>
            </h3>
          </div>
        </div>
      </Card>
    </div>
    <!-- 分页 -->
    <div class="page-bottom">
      <Page :total="totalSize" :current="currentPage" :page-size="pageSize" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: Array,
      totalSize: Number,
      pageNum: Number
    }, // 接收父级传递的数据
    data() {
      return {
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页条数
      }
    },
    filters: {
      date: function(value) {
        return value.substring(0, 10)
      },
      tension: function (value) {
        if(value>=0.8 && value<=1){
          return '高风险'
        }else if(value>=0.4 && value<=0.7) {
          return '中风险'
        }else if(value>=0.1 && value<=0.3) {
          return '低风险'
        }
      }
    },
    methods: {
      /**
       * 翻页
       * @param  (int) index 页数
       */
      changePage(index) {
        // 翻页
        this.currentPage = index
        this.$emit("updatePage", index)
      },
      /**
       * 卡片显示全部内容
       * @param (int) index 卡片索引
       */
      tiggerContent: function(index) {
        const cardContent = document.getElementsByClassName('cardContent')[index];
        const text = document.getElementsByClassName('text')[index];
        if (this.VerificationClass(cardContent.classList)) {
          cardContent.classList.remove('partContent');
          text.innerText = '折叠内容';
        } else {
          cardContent.classList.add('partContent');
          text.innerText = '展开内容';
        }
      },
      /**
       * 验证卡片是否有 partContent 这个class
       * @param （array) array class数组
       * @returns {boolean}
       * @constructor
       */
      VerificationClass: function(array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].indexOf('partContent') >= 0) {
            return true;
          }
        }
        return false;
      },
      /**
       * 解析时间 转换 成 yyyy.m.dd格式
       * @param (object) obj date对象
       * @returns {string}
       */
      parseDate: function(obj) {
        try {
          const year = obj.getFullYear()
          const month = (obj.getMonth() + 1) > 10 ? (obj.getMonth() + 1) : '0' + (obj.getMonth() + 1)
          const day = (obj.getDate()) > 10 ? (obj.getDate()) : '0' + (obj.getDate())
          return year + '-' + month + '-' + day
        } catch (e) {
          return '';
        }
      },
      init: function() {
        // this.axios.
      }
    },
    created: function() {
      this.init()
    },
    watch: {
      pageNum(val) {
        this.currentPage = val
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .search-list-item {
    padding: 16px
    margin: 10px
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;

    .search-list-item:hover {
      box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
      border-color: #eee;
    }
  }

  .ivu-list-item-meta {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  .addCard {
    display flex
    padding: 15px 0
    justify-content space-between
  }

  .cardWrapper {
    width: 100%;
    // padding:15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between
  }

  .cardItem {
    width: 100%;
    // padding: 15px;
    box-sizing: border-box;
    // margin-top: 20px
    margin-bottom 16px
  }

  .partContent {
    width 80%
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  .LoadMoreWrapper {
    text-align center padding 15px
  }

  .LoadMoreWrapper span:hover {
    cursor pointer
  }
  .operation {
	min-width: 60px
  }
  .operation:hover {
    cursor pointer
  }

  .page-bottom
    display flex
    justify-content flex-end
    width 100%
    background-color #fff
    padding-right 50px
  .ivu-upload {
    display inline-block !important
  }
</style>
