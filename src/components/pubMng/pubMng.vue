<template>
<div class="usrMng">
    <!-- 添加和搜索用户 -->
    <div class="usrOperate">
        <Button type="primary" @click="addUser()">添加刊物</Button>
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
          <template slot-scope="{ row, index }" slot="date">
            <div>
              {{row.date}}
            </div>
          </template>
          <template slot-scope="{ row, index }" slot="uploadPic">
            <div>
              <Upload
                ref="upload"
                :data="{id: row.id}"
                :on-success="handleSuccess"
                :on-error="handleError"
                action="//121.40.178.147:11180/xlab/publication/addImage">
                <Button icon="ios-cloud-upload-outline">Upload files</Button>
              </Upload>
              <!--              <input type="file" @change="getFile($event)">-->
              <!--              <Button shape="circle" type="info" icon="md-cloud-upload" @click="submit($event,row,index)"></Button>-->
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
                {title: '论文', key: 'nameCh', width: 200},
                {title: '作者', key: 'author', width: 100},
                {title: '日期', slot: 'date', width: 170},
                {title: '简介', key: 'introduce'},
                {title: '封面', slot: 'uploadPic', align: 'center', width: 150},
                {title: '查看', slot: 'viewinfo', align: 'center', width: 130},
                {title: '管理', slot: 'action', align: 'center', width: 150}
            ],
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
        handleSuccess (res, file) {
          // 因为上传过程为实例，这里模拟添加 url
          this.$Message.info(res.msg)
          setTimeout(function () {
            window.location.reload();
          },2000)
        },
        handleError() {
          alert("上传失败,文件不能大于10M")
          window.location.reload();
        },
        /**
         * 获取用户列表，分页
         */
        getUserList () {
            this.axios.post('/api/publication/findAllPublication', {
                'page': String(this.currentPage)
            }).then((res) => {
                console.log(res)
                let data = res.data.data
                this.currentPage = data.pageNum
                this.dataCount = data.totalSize
                this.data = data.content
                // this.data.date = this.data.date.toString().substr(0,10)
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
            this.axios.post('/api/admin/finduser', {
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
                        nameCh: data.nameCh,
                        nameEn: data.nameEn,
                        introduce: data.introduce,
                        author: data.author,
                        journal: data.journal,
                        date: data.date,
                        url: data.url,
                        featured: data.featured
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
                    content: '您确认要删除该条刊物信息吗？',
                    onOk: () => {
                        if (row.accountLevel === 1111) {
                            this.$Message.info('不可删除管理员用户！')
                        } else {
                            this.axios.post('/api/publication/delPublication', {
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
