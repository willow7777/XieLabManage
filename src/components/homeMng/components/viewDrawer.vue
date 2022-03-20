<template>
    <Drawer :closable="false" width="400" v-model="value">
        <p :style="pStyle">{{viewData.username}}</p>
        <p :style="pStyle">基本信息</p>
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">标题: {{viewData.nameCh}}</i-col>
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
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">图片: {{viewData.phone | filter}}</i-col>
            </Row>
        </div>
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
