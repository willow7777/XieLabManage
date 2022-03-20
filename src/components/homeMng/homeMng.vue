<template>
<div class="usrMng">
    <!-- 用户列表 -->
    <div>
      <div>
        <Input class="content" v-model="contentList.content1" type="textarea" :autosize="{minRows: 5, maxRows:5}" placeholder="在此输入介绍" />
        <Input class="content" v-model="contentList.content2" type="textarea" :autosize="{minRows: 5, maxRows:5}" placeholder="在此输入内容1" />
        <Input class="content" v-model="contentList.content3" type="textarea" :autosize="{minRows: 5, maxRows:5}" placeholder="在此输入内容2" />
        <template>
          <Button style="margin-left: 20px" @click="uploadContent()" type="primary">上传</Button>
        </template>
      </div>
      <div>

      </div>
    </div>
      <div>
          <Upload
            multiple
            type="drag"
            :before-upload="handleBeforeUpload"
            action="">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>背景轮播图</p>
              <p>将图片拖拽至此处或点击上传</p>
            </div>
          </Upload>
          <div align="center">
            <Button @click="setFileList()" type="info" shape="circle" icon="md-checkmark" v-show="this.formObj.fileArr.length>0"></Button>
          </div>
          <img v-for="(item,index) in pictures":key="index" :src="'data:image/png;base64,'+item" height="250px" width="300PX">
          <Button @click="removeImg('homeScroll')" type="error" shape="circle" icon="md-trash" v-if="pictures!=null"></Button>
          <br />
      </div>
      <div class="file-list-box" v-show="formObj.fileArr.length > 0">
        <ul class="file-list">
          <li class="file-item" v-for="(list,index) in formObj.fileArr" :key="index">
            <span >文件名: {{ list.name }}</span>
            <Icon class="file-delete" type="ios-close" size="15" color="red" @click="removeFile(index)"></Icon>
          </li>
        </ul>
      </div>
        <Upload
          multiple
          type="drag"
          :on-success="handleSuccess"
          action="//121.40.178.147:11180/xlab/home/addGroupPhoto">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>内容图</p>
            <p>将图片拖拽至此处或点击上传</p>
          </div>
        </Upload>
          <img :src="'data:image/png;base64,'+ groupPic" alt="请上传内容图片" height="250px" width="250px">
          <Button @click="removeImg('homeGroup')" type="error" shape="circle" icon="md-trash" v-if="groupPic!=''"></Button>
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
            pictures:[],
            groupPic:"",
            contentList: {
              content1:"",
              content2:"",
              content3:""
            },
            list: [
                {title: '标题', key: 'title', width: 200},
                {title: '日期', key: 'date', width: 170},
                {title: '内容', key: 'content'},
                {title: '图片', slot: 'uploadPic', align: 'center', width: 150},
                {title: '查看', slot: 'viewinfo', align: 'center', width: 130},
                {title: '管理', slot: 'action', align: 'center', width: 150}
            ],
            formObj: {
              id: -1,
              fileArr: [],
            },
            fileid: 0,
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
      uploadContent(){
        this.axios.post('/api/home/addHome', {
          'about': this.contentList.content1,
          'research1': this.contentList.content2,
          'research2': this.contentList.content3
        })
          .then((res)=>{
            this.$Message.info(res.data.msg)
            setTimeout(function () {
              window.location.reload();
            },1000)
          })
          .catch((error)=>{
            alert(error.data.msg)
            setTimeout(function () {
              window.location.reload();
            },1000)
          });
      },
      removeImg(val){
        this.axios.post('/api/home/delPicture', {
          'type': val
        })
          .then((res)=>{
            this.$Message.info(res.data.msg)
            setTimeout(function () {
              window.location.reload();
            },1000)
          })
          .catch((error)=>{
            alert(error.data.msg)
            setTimeout(function () {
              window.location.reload();
            },1000)
          });
      },
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
      handleSuccess (res, file) {
        alert(res.msg)
        setTimeout(function () {
          window.location.reload();
        },2000)
      },
      handleError() {
        alert("上传失败,文件不能大于10M")
      },
      setFileList () {
        let formData = new FormData()
        formData.append('id',1)
        for (let i = 0; i < this.formObj.fileArr.length; i++) {
          formData.append('file',this.formObj.fileArr[i])
        }
        this.axios.post('/api/home/addImage', formData)
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
      removeFile (index) {
        this.formObj.fileArr.splice(index, 1);
      },
      /**
         * 获取用户列表，分页
         */
        getUserList () {
            this.axios.post('/api/home/findHome', {
                'page': String(this.currentPage)
            }).then((res) => {
                let data = res.data.data
                this.pictures = res.data.data.content[0].pic
                this.groupPic = res.data.data.content[0].groupPic
                this.contentList.content1 = res.data.data.content[0].about
                this.contentList.content2 = res.data.data.content[0].research1
                this.contentList.content3 = res.data.data.content[0].research2
                this.currentPage = data.pageNum
                this.dataCount = data.totalSize
                this.data = data.content
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
.content
    width 45%
    margin 20px
</style>
