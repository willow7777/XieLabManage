<template>
    <Drawer :closable="false" width="400" v-model="value">
        <p :style="pStyle">{{viewData.username}}</p>
        <p :style="pStyle">基本信息</p>
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">标题: {{viewData.title}}</i-col>
            </Row>
            <Row>
                <i-col span="12">时间: {{viewData.date}}</i-col>
            </Row>
        </div>
        <Divider />
        <p :style="pStyle">新闻部分</p>
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">内容: {{viewData.content | filter}}</i-col>
            </Row>
        </div>
        <Divider />
        <p :style="pStyle">图片</p>
        <img v-for="(item,index) in viewData.pics":key="index" :src="'data:image/png;base64,'+item" height="250px" width="250px">
      <Button @click="removeImg(viewData.id)" type="error" shape="circle" icon="md-trash" v-if="viewData.pics!=null"></Button>
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
      this.axios.post('/api/news/delPicture', {
        'id': val
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
