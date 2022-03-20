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
                <i-col span="12">职位: {{viewData.rank}}</i-col>
            </Row>
        </div>
        <Divider />
        <p :style="pStyle">成员介绍</p>
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">地址: {{viewData.address | filter}}</i-col>
            </Row>
            <Row>
                <i-col span="24">介绍: {{viewData.introduction | filter}}</i-col>
            </Row>
            <Row>
                <i-col span="24">兴趣: {{viewData.hobby | filter}}</i-col>
            </Row>
        </div>
        <Divider />
        <p :style="pStyle">联系方式</p>
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">电话: {{viewData.phone | filter}}</i-col>
            </Row>
          <Row>
            <i-col span="12">电子邮箱: {{viewData.email}}</i-col>
          </Row>
        </div>
        <img :src="'data:image/png;base64,'+viewData.picture" alt="图片未上传" height="30%" width="60%">
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
            this.axios.post('/api/user/delPicture', {
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
