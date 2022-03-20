<template>
    <Drawer :closable="false" width="400" v-model="value">
        <p :style="pStyle">{{viewData.username}}</p>
        <p :style="pStyle">基本信息</p>
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">中文名: {{viewData.nameCh}}</i-col>
            </Row>
            <Row>
                <i-col span="12">英文名: {{viewData.nameEn}}</i-col>
            </Row>
          <Row>
                <i-col span="12">作者: {{viewData.author}}</i-col>
            </Row>
        </div>
        <Divider />
        <p :style="pStyle">论文信息</p>
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">出版刊物: {{viewData.journal | filter}}</i-col>
            </Row>
            <Row>
                <i-col span="24">日期: {{viewData.date | filter}}</i-col>
            </Row>
            <Row>
                <i-col span="24">简介: {{viewData.introduce | filter}}</i-col>
            </Row>
        </div>
        <Divider />
        <p :style="pStyle">其他信息</p>
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">主页展示: {{viewData.featured | filter}}</i-col>
            </Row>
          <Row>
            <i-col span="12">论文地址: {{viewData.url}}</i-col>
          </Row>
        </div>
        <img :src="'data:image/png;base64,'+viewData.picture" alt="图片未上传" height="300px" width="250px">
        <Button @click="removeImg(viewData.id)" type="error" shape="circle" icon="md-trash" v-if="viewData.picture!=null">删除</Button>
    </Drawer>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean
        },
        viewData: {
            type: Object
        }
    },
    data () {
        return {
            value: false,
            pStyle: {
                fontSize: '16px',
                color: 'rgba(0,0,0,0.85)',
                lineHeight: '24px',
                display: 'block',
                marginBottom: '16px'
            }
        }
    },
  methods:{
      removeImg(val){
        this.axios.post('/api/publication/delPicture', {
          'id': val
        })
          .then(function (response) {
            alert(response.data.msg)
            setTimeout(function () {
              window.location.reload();
            },1000)
          })
          .catch(function (error) {
            alert(response.data.msg)
            setTimeout(function () {
              window.location.reload();
            },1000)
          });
      }
  },
    watch: {
        show (val) {
            this.value = val
        },
        value (val) {
            if (val == false) this.$emit('mask-close', false)
        }
    },
    filters: {
        filter (val) {
            if (val) return val
            else return '无'
        }
    }
}
</script>

<style lang="stylus" scoped>
.demo-drawer-profile
    font-size: 14px
.demo-drawer-profile .ivu-col
    margin-bottom: 12px

</style>
