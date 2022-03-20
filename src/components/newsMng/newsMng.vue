<template>
<div class="usrMng">
    <!-- 添加和搜索用户 -->
    <div class="usrOperate">
        <Button type="primary" @click="addUser()">添加新闻</Button>
<!--        <div class="usrSearch">-->
<!--            <Input v-model="searchVal" placeholder="请输入查询账号" clearable style="width: 200px" @keyup.enter.native="searchClick" />-->
<!--            <Button type="primary" icon="ios-search" @click="searchClick()">Search</Button>-->
<!--        </div>-->
    </div>

    <!-- 用户列表 -->
    <div class="usrTable">
        <Table :columns="list" :data="data" :loading="loading">
            <template slot-scope="{ row }" slot="username">
                <span>{{ row.username }}</span>
            </template>
            <template slot-scope="{ row }" slot="authority">
                <span>{{ row.authority }}</span>
            </template>
            <template slot-scope="{ row }" slot="tel">
                <span>{{ row.tel | filter }}</span>
            </template>
          <template slot-scope="{ row, index }" slot="uploadPic">
            <div>
              <Upload
                multiple
                ref="upload"
                :data="{id: row.id}"
                :before-upload="handleBeforeUpload"
                :on-success="handleSuccess"
                :on-error="handleError"
                action="">
                <Button icon="ios-cloud-upload-outline">Upload</Button>
              </Upload>
            </div>
            <div>
              <Button @click="setFileList(row, index)"  v-show="formObj.fileArr.length>0" type="info" shape="circle" icon="md-checkmark"></Button>
            </div>
            <div class="file-list-box" v-show="formObj.fileArr.length > 0">
              <ul class="file-list">
                <li class="file-item" v-for="(list,index) in formObj.fileArr" :key="index">
                  <span >文件名: {{ list.name }}</span>
                  <Icon class="file-delete" type="ios-close" size="15" color="red" @click="removeFile(index)"></Icon>
                </li>
              </ul>
            </div>
          </template>
            <template slot-scope="{ row, index }" slot="viewinfo">
                <Button @click="viewInfo(row, index)">详细信息</Button>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <div>
                    <Button @click="handleEdit(row, index)" type="info" shape="circle" icon="md-create"></Button>
                    <Button @click="remove(row, index)" type="error" shape="circle" icon="md-trash"></Button>
                </div>
            </template>
        </Table>
    </div>

    <!-- 添加用户弹窗组件 -->
    <create-drawer :show="createUser" :edit-data="editData" @on-close="closeDrawer"></create-drawer>

    <!-- 查看用户信息弹窗组件 -->
    <view-drawer :show="viewUser" :view-data="viewData" @mask-close="closeDrawer"></view-drawer>

    <!-- 分页 -->
    <div class="page-bottom">
        <Page :total="dataCount"
              :current="currentPage"
              :page-size="pageSize"
              show-elevator
              @on-change="changePage" />
    </div>
</div>
</template>

<script>
import createDrawer from './components/createDrawer'
import viewDrawer from './components/viewDrawer'

export default {
    components: { createDrawer, viewDrawer },
    data () {
        return {
            loading: false,     // 表格是否为加载模式
            dataCount: 1,    // 总数据条数
            currentPage: 1,    // 当前页数
            pageSize: 10,   // 每页条数
            // index: 0,
            createUser: false,
            viewUser: false,
            editData: {},
            viewData: {},
            searchVal: '',  // 输入搜索值
            list: [
                {title: '标题', key: 'title', width: 200},
                {title: '日期', key: 'date', width: 170},
                {title: '内容', key: 'content'},
                {title: '图片', slot: 'uploadPic', align: 'center'},
                {title: '查看', slot: 'viewinfo', align: 'center', width: 200},
                {title: '管理', slot: 'action', align: 'center', width: 150}
            ],
            formObj: {
              id: -1,
              fileArr: [],
            },
            fileMaxTip: false,
            data: [],
            // editIndex: -1,  // 当前聚焦的输入框的行数
            // editauthority: ''  // 权限输入框
            token: this.$store.state.token
        }
    },

    created () {
        this.loading = true
        this.getUserList()
    },

    methods: {
      // 文件上传
      handleBeforeUpload (file) {
        // 文件类型校验
        let type = (file.name.substr(file.name.lastIndexOf("."))).toLowerCase(); // .jpg
        let imgType = type.split('.')[1] // jpg
        let imgFileTypeArr = ['jpg','png']
        let checkType = imgFileTypeArr.some((item) => {
          return item === imgType
        })
        if (!checkType) {
          this.$Message.info('只支持.jpg .png格式');
          return false
        }
        // 文件大小校验
        const checkMax = file.size < 5242880;
        if(!checkMax){
          this.$Message.info('单个文件不能大于5MB');
          return false;
        }
        // 文件名称重复校验
        let nameArr = this.formObj.fileArr.map((item) => {
          return item.name
        })
        let isRepeat = nameArr.indexOf(file.name)
        if (isRepeat !== -1) {
          this.$Message.info('文件名称不能重复');
          return false;
        }

        if (this.formObj.fileArr.length >= 4) {
          this.fileMaxTip = true
          return false;
        }

        this.formObj.fileArr.push(file);
        return false;
      },
      // 文件上传
      setFileList (row, index) {
        let formData = new FormData()
        formData.append('id',row.id)
        for (let i = 0; i < this.formObj.fileArr.length; i++) {
          formData.append('file',this.formObj.fileArr[i])
        }
        this.axios.post('/api/news/addImage', formData)
          .then((data) => {
            console.log(data)
            if (data.data.code===200){
              this.$Message.info(data.data.msg)
              this.formObj.fileArr=[]
              this.formObj.id=-1
              setTimeout(function () {
                window.location.reload();
              },2000)
            }else{
              alert(data.data.msg)
              window.location.reload();
            }
          }).catch( (error) => {
          console.log(error)
        });
      },
        // // 其他参数
        // // formData.append("type", 1);
        // api.feedbackManage.feedbackUpload(formData).then(res => {
        //   if (res.status === 200) {
        //     this.formObj.fileArr = []
        //   }
        // }).catch(() => {
        //
        // });
      removeFile (index) {
        this.formObj.fileArr.splice(index, 1);
      },
      handleSuccess (res, file) {
        this.$Message.info(res.msg)
        setTimeout(function () {
          // window.location.reload();
        },2000)
      },
      handleError() {
        alert("上传失败,文件不能大于10M")
      },
      /**
         * 获取用户列表，分页
         */
        getUserList () {
            this.axios.post('/api/news/findAllNews', {
                'page': String(this.currentPage)
            }).then((res) => {
                console.log(res)
                let data = res.data.data
                this.currentPage = data.pageNum
                this.dataCount = data.totalSize
                this.data = data.content
                for (var key in this.data){
                  if( this.data[key].date!=null)
                    this.data[key].date = this.data[key].date.substr(0,10)
                  }
                this.data.forEach((item, index, arr) => {
                    item.authority = this.getAuthority(item.accountLevel)
                    // if (item.tel == '') item.tel = '无'

                });
                this.loading = false
            }).catch((error) => {
                console.log(error)
                setTimeout(() => {      // 无数据或者请求超时
                    this.loading = false
                    // this.$router.go(0);
                }, 10000);
                this.$Message.error('用户列表加载失败！')
            })
        },
        /**
         * 根据accountLevel显示用户身份，1-管理员，0-普通用户
         */
        getAuthority (val) {
            if (val === 1111) return '管理员'
            else return '普通用户'
        },
        /**
         * 搜索查询信息
         */
        searchClick () {
            console.log(this.searchVal)
            this.axios.post('/api/news/findAllNews', {
                'username': this.searchVal,
                'token': this.token
            }).then((res) => {
                if (res.data.code === 200) {
                    this.data = []
                    let data = res.data.data
                    let authority = this.getAuthority(data.accountLevel)
                    console.log(authority)
                    this.data.push({
                        id: data.id,
                        title: data.title,
                        content: data.content,
                        date: data.date
                    })
                } else {
                    this.$Message.error('未查询到该账号！请重新输入完整的账号。')
                }
                // this.data.forEach((item, index, arr) => {
                //     item.authority = this.getAuthority(item.accountLevel)
                // });
            }).catch((error) => {
                this.data = []
                // this.$Message.error('error')
            })
        },

        /**
         * 添加用户，点击显示createDrawer子组件
         */
        addUser () {
            this.createUser = true
            this.editData = {}
        },
        /**
         * 关闭弹窗，从子组件接收到的值false赋值给show
         */
        closeDrawer (val) {
            this.createUser = val
            this.viewUser = val
        },
        /**
         * 查看用户详细信息
         */
        viewInfo (row, index) {
            this.viewUser = true
            this.viewData = row
        },

        /**
         * 上传图片
         */
        uploadPic(row, index){
          this.viewData = row

          console.log('row',row)
        },
      uploadPhoto (e) {
        // 利用fileReader对象获取file
        var file = e.target.files[0];
        var filesize = file.size;
        var filename = file.name;
        // 2,621,440   2M
        if (filesize > 2101440) {
          // 图片大于2MB

        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {

          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          var imgcode = e.target.result;
          this.formInline.img=imgcode
          console.log(this.formInline.img);
        }
      },

      /**
         * 修改操作
         */
        handleEdit (row, index) {
            this.index = index
            this.createUser = true
            this.editData = row
            console.log('row',row)
        },
        // /**
        //  * 成功修改后，表格数据更新
        //  */
        // changeSuccess (newrow, index) {
        //     this.list[index] = row
        // },
        /**
         * 删除某个普通账号
         * @param {string} username 用户名
         * @param {string} token 用户标识
         */
        remove (row, index) {
            return new Promise(() => {
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '您确认要删除该条新闻吗？',
                    onOk: () => {
                        if (row.accountLevel === 1111) {
                            this.$Message.info('不可删除管理员用户！')
                        } else {
                            this.axios.post('/api/news/delNews', {
                                'id': row.id,
                                'token': this.token
                            }).then((res) => {
                                this.data.splice(index, 1)
                                this.$Message.success('删除成功！')
                            }).catch((error) => {
                                console.log(error)
                            })
                        }
                    }
                });
            });
        },
        /**
         * 分页
         */
        changePage (index) {
            console.log('string',String(index))
            this.currentPage = index
            // this.data = []
            this.getUserList()
        }
    },

    // 监听输入搜索数据
    watch: {
        searchVal (val) {
            if (val === '') this.getUserList('1')
        }
    },
    // 文本格式化，值为空时过滤成“无”
    filters: {
        filter (val) {
            if (val) return val
            else return '无'
        }
    }
}
</script>

<style lang="stylus" scoped>
.usrMng
    min-height 400px
    padding-bottom 72px
.usrOperate
    padding 10px 0
    width 100%
.usrSearch
    // padding-left 70%
    float right
.usrTable
    position: relative;
    border: 1px solid #dcdee2;
    border-bottom: 0;
.page-bottom
    float right
    margin 20px 0
</style>
