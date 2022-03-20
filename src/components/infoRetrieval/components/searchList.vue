<template>
  <div>
    <!-- 添加卡片按钮 -->
    <div class="addCard">
      <div>
        <Button type="primary" @click="download('/api/data/exportinfo')">全部导出</Button>
        <input type="file" ref="uploadRef" @change="uploadChange" style="display: none;" accept=".csv,.xlsx, application/vnd.openxmlformats-officedocument
                .spreadsheetml.sheet, application/vnd.ms-excel">
      </div>
      <Button style="float:right;" @click="addIsShow=true" type="primary">手动插入</Button>
    </div>
    <div class="cardWrapper">
      <!-- 循环卡片 -->
      <Card class="cardItem" v-for="(item, index) in data" :key="index">
        <div>
          <p class="cardContent partContent" style="text-indent:2em">
            <!-- {{ item.text }} -->
            <span v-html="item.text"></span>
          </p>
          <p style="color: #673AB7;">
            <span v-if="item.createTime">
              发帖日期：{{ item.createTime | createTime }}
            </span>
            <span style="margin-left: 20px" v-if="item.crawlTime">
              采集时间：{{ item.crawlTime | crawlTime }}
            </span>
            <span style="margin-left: 20px" v-if="item.resource">
              目标网站来源：{{ item.resource | resource }}
            </span>
            <span style="margin-left: 20px" v-if="item.keywords">
              关键词：{{ item.keywords }}
            </span>
            <span style="margin-left: 20px" v-if="item.textLength">
              内容字数：{{ item.textLength }}
            </span>
          </p>
        </div>
        <div slot="title" style="display: flex;justify-content: space-between">
          <div>
            <h3>
              <span v-html="item.title"></span>
              <span style="font-size: 12px; margin-left: 10px">
                <a href="javascript:void(0)" @click="tiggerContent(index)" class="text">展开内容</a>
              </span>
              <span style="font-size: 12px; margin-left: 20px">
                <a :href="item.url" target="_blank">原始链接</a>
              </span>
            </h3>
          </div>
          <div class="operation">
            <span @click="edit(index)">编辑</span>
            <span @click="del(index)">删除</span>
          </div>
        </div>
      </Card>
    </div>
    <!-- 编辑卡片对话框 -->
    <Modal v-model="editIsShow" title="edit" @on-ok="editSubmit" @on-cancel="editCancel" :mask-closable="false"
      :z-index=999999>
      <Form :model="editFormData" label-position="top">
        <FormItem label="内容">
          <Input type="textarea" :rows="6" v-model="editFormData.content"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 添加卡片对话框 -->
    <Modal v-model="addIsShow" title="add" @on-ok="addSubmit" @on-cancel="addCancel" :mask-closable="false" :z-index=999999>
      <Form ref="addFormRef" :model="addFormData" label-position="top" :rules="addRuleValidate">
        <FormItem label="时间">
          <DatePicker v-model="addFormData.time" type="date" format="yyyy-MM-dd" placeholder="Select date"></DatePicker>
        </FormItem>
        <FormItem label="标题">
          <Input v-model="addFormData.title"></Input>
        </FormItem>
        <FormItem label="来源">
          <Select v-model="addFormData.source">
            <Option value="weibo">微博</Option>
            <Option value="facebook">Facebook</Option>
            <Option value="twitter">Twitter</Option>
            <Option value="setn">三立新闻</Option>
            <Option value="ck101">卡提诺</Option>
            <Option value="ltn">自由时报</Option>
            <Option value="eyny">伊莉</Option>
            <Option value="其他">其他</Option>
          </Select>
        </FormItem>
        <FormItem label="内容(必填)" prop="content">
          <Input type="textarea" :rows="6" v-model="addFormData.content"></Input>
        </FormItem>
      </Form>
    </Modal>
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
      pagenum: Number
    }, // 接收父级传递的数据
    data() {
      return {
        editIsShow: false, // 是否显示编辑对话框
        addIsShow: false, // 是否显示添加对话框
        editFormData: { // 编辑表单数据
          content: '',
          index: null,
          id: null
        },
        // dataCount: this.data.length,    // 总数据条数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页条数
        addFormData: { // 添加表单数据
          source: '',
          time: '',
          title: '',
          content: ''
        },
        addRuleValidate: { // 验证添加卡片
          content: [{
            required: true,
            message: '必填项',
            trigger: 'blur'
          }]
        }
      }
    },
    filters: {
      createTime: function(value) {
        return value.substring(0, 10)
      },
      crawlTime: function(value) {
        return value.substring(0, 10) + ' ' + value.substring(11, 16)
      },
      resource: function(value) {
        if (value == 'twitter') return 'Twitter';
        else if (value == 'facebook') return 'Facebook';
        else if (value == 'weibo') return '微博';
        else if (value == 'ck101') return '卡提诺';
        else if (value == 'eyny') return '伊莉';
        else if (value == 'ltn') return '自由时报';
        else if (value == 'setn') return '三立新闻';
      }
    },
    methods: {
      uploadChange: function(event) {
        let param = new FormData(); //创建form对象
        param.append('file', event.target.files[0]);
        this.axios({
          url: '/api/data/upload',
          method: 'post',
          data: param
        }).then(result => {
          if (result.data.code === 200) {
            this.$Message.success('成功');
          } else if (result.data.code === 500232) {
            this.$Message.error('文件类型错误，仅支持XLS，XLSX文件');
          } else {
            this.$Message.error('文件上传失败');
          }
        }).catch(error => {
          this.$Message.error('error');
        })
      },
      /**
       * 导入
       */
      handleUpload: function() {
        this.$refs.uploadRef.click()
      },
      /**
       * 导出数据
       */
      download(url) {
        this.$parent.exportInfo(url)
      },
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
       * 删除卡片
       * @param  (int) index 卡片索引
       */
      del: function(index) {
        this.axios({
          url: '/api/data/removeinfo',
          method: 'post',
          data: {
            idx: this.data[index].idx,
          }
        }).then(result => {
          console.log(result);
          this.$emit("update")
          if (result.data.code === 200) {
            this.$Message.success('success');
          } else {
            this.$Message.error('error');
          }
        }).catch(error => {
          this.$Message.error('error');
        })
      },
      /**
       * 编辑卡片
       * @param (int) index 卡片索引
       */
      edit: function(index) {
        this.editIsShow = true;
        this.editFormData.id = this.data[index].idx;
        if (this.data[index].origText) {
          this.editFormData.content = this.data[index].origText;
        } else {
          this.editFormData.content = this.data[index].text;
        }
      },
      /**
       * 编辑提交
       */
      editSubmit: function() {
        this.axios({
          url: '/api/data/updateinfo',
          method: 'post',
          data: {
            idx: this.editFormData.id,
            text: this.editFormData.content
          }
        }).then(result => {
          if (result.data.code === 200) {
            this.$Message.success('success');
          } else {
            this.$Message.error('error');
          }
          this.$emit("update")
        }).catch(error => {
          this.$Message.error('error');
        })
        this.editFormData.content = '';
        this.editFormData.index = null;
        this.editFormData.id = null;
      },
      /**
       * 编辑取消
       */
      editCancel: function() {
        this.editFormData.content = '';
        this.editFormData.index = null;
      },
      /**
       * 添加提交
       */
      addSubmit: function() {
        this.$refs.addFormRef.validate((valid) => {
          if (valid) {
            this.addFormData.time = this.parseDate(this.addFormData.time)
            this.axios({
              url: '/api/data/addnewinfo',
              method: 'post',
              data: {
                userid: 123456,
                text: this.addFormData.content,
                resource: this.addFormData.source,
                title: this.addFormData.title,
                createtime: this.addFormData.time,
                keywords: '手动插入',
              }
            }).then(result => {
              console.log(result);
              this.$Message.success('Success');
            }).catch(error => {
              this.$Message.error('Fail!');
            })
            this.addFormData = {
              source: '',
              time: '',
              title: '',
              content: ''
            }
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
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
       * 添加取消
       */
      addCancel: function() {
        this.$refs.addFormRef.resetFields();
      },
      /**
       * 数据加密，
       */
      syncClick() {
        this.$Notice.open({
          name: 'synchronizeData',
          desc: '正在同步数据，请稍等',
          duration: 0
        });
        this.axios.get('/api/data/sync').then((res) => {
          // if (res.data.code == 200) {
          this.$Message.success('同步成功！')
          this.$Notice.close('synchronizeData')
          // }
        }).catch((error) => {
          this.$Message.error('同步失败！请重试。');
          this.$Notice.close('synchronizeData')
        })
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
      pagenum(val) {
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
