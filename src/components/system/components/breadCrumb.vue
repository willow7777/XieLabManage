<template>
    <!-- 网站层级结构组件 -->
    <Breadcrumb class="custom-bread-crumb">
        <BreadcrumbItem v-if="$route.name !== 'home'">
            <Icon type="logo-buffer"></Icon> 系统
        </BreadcrumbItem>
        <BreadcrumbItem v-if="$route.name !== 'home'">
<!--            <span :class="$route.meta.icon" style="margin-right: 4px;">{{$route.meta.title}}</span>-->
            <Icon :type="$route.meta.icon" style="margin-right: 4px;" /> {{$route.meta.title}}
        </BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    props: {
        breadCrumbList: {
            type: String
        }
    }
}
</script>

<style lang="stylus" scoped>
.custom-bread-crumb
    display inline
    margin-left 30px
    height 64px
    line-height 64px
</style>
