<template>
<div>
    <!-- 侧导航栏组件，可折叠 -->
    <slot></slot>
    <Menu :active-name="$route.name" theme="dark" width="auto" :class="menuitemClasses" @on-select="menuClick" :open-names="openNames">
<!--        <Submenu name="1" class="submenu">-->
<!--          <template slot="title">-->
<!--            <i class="iconfont icon-shujucaijizhongxin" :class="isCollapsed?'menu-icon-collapsed':''"></i>-->
<!--&lt;!&ndash;            <Icon type="ios-paper" />&ndash;&gt;-->
<!--            <span v-if="!isCollapsed">信息采集</span>-->
<!--          </template>-->
<!--          <MenuItem name="crawl" to="/system/crawl">-->
<!--            <Icon type="ios-bug" :class="isCollapsed?'menu-icon-collapsed':''"></Icon>-->
<!--            <span v-if="!isCollapsed">爬虫任务配置</span>-->
<!--          </MenuItem>-->
<!--          <MenuItem name="keywordMng" to="/system/keywordMng">-->
<!--            <Icon type="md-stats" :class="isCollapsed?'menu-icon-collapsed':''"></Icon>-->
<!--            <span v-if="!isCollapsed">历史任务管理</span>-->
<!--          </MenuItem>-->
<!--        </Submenu>-->
<!--        <MenuItem name="search" to="/system/search" v-show="authority == '1111'">-->
<!--          <i class="iconfont icon-search" :class="isCollapsed?'menu-icon-collapsed':''"></i>-->
<!--&lt;!&ndash;          <Icon type="ios-search" :class="isCollapsed?'menu-icon-collapsed':''"></Icon>&ndash;&gt;-->
<!--          <span v-if="!isCollapsed">主页管理</span>-->
<!--        </MenuItem>-->
<!--        <Submenu name="2" class="submenu">-->
<!--          <template slot="title">-->
<!--            <Icon type="md-filing" />-->
<!--            <span v-if="!isCollapsed">信息管理</span>-->
<!--          </template>-->
<!--          <MenuItem name="search" to="/system/search">-->
<!--            <Icon type="ios-search" :class="isCollapsed?'menu-icon-collapsed':''"></Icon>-->
<!--            <span v-if="!isCollapsed">数据检索</span>-->
<!--          </MenuItem>-->
<!--        </Submenu>-->

<!--        <Submenu name="3" class="submenu">-->
<!--          <template slot="title">-->
<!--            <i class="iconfont icon-analysis" :class="isCollapsed?'menu-icon-collapsed':''"></i>-->

<!--            <span v-if="!isCollapsed">数据分析</span>-->
<!--          </template>-->
<!--          <MenuItem name="globalTrend" to="/system/globalTrend">-->
<!--            <i class="iconfont icon-Global"  :class="isCollapsed?'menu-icon-collapsed':''"></i>-->
<!--            <span v-if="!isCollapsed">全局态势</span>-->
<!--          </MenuItem>-->
<!--          <MenuItem name="knowledgeGraph" to="/system/knowledgeGraph">-->
<!--            <i class="iconfont icon-zhishitupu"  :class="isCollapsed?'menu-icon-collapsed':''"></i>-->
<!--            <span v-if="!isCollapsed">演化图谱</span>-->
<!--          </MenuItem>-->
<!--        </Submenu>-->
<!--        <Submenu name="4" class="submenu">-->
<!--            <template slot="title">-->
<!--                <i class="iconfont icon-shujufenxi"  :class="isCollapsed?'menu-icon-collapsed':''"></i>-->
<!--&lt;!&ndash;                <Icon type="md-desktop" />&ndash;&gt;-->
<!--                <span v-if="!isCollapsed">zzzz模型</span>-->
<!--            </template>-->
<!--            <MenuItem name="sentimentAnalysis" to="/system/sentimentAnalysis">-->
<!--                <i class="iconfont icon-baobiao"  :class="isCollapsed?'menu-icon-collapsed':''"></i>-->
<!--                <span v-if="!isCollapsed">情感分析</span>-->
<!--            </MenuItem>-->
<!--            <MenuItem name="conflictAnalysis" to="/system/conflictAnalysis">-->
<!--              <i class="iconfont icon-maodun"  :class="isCollapsed?'menu-icon-collapsed':''"></i>-->
<!--              <span v-if="!isCollapsed">矛盾分析</span>-->
<!--            </MenuItem>-->
<!--            <MenuItem name="loseAnalysis" to="/system/loseAnalysis">-->
<!--              <i class="iconfont icon-gupiao"  :class="isCollapsed?'menu-icon-collapsed':''"></i>-->
<!--              <span v-if="!isCollapsed">失业率分析</span>-->
<!--            </MenuItem>-->
<!--            <MenuItem name="flightAnalysis" to="/system/flightAnalysis">-->
<!--              <i class="iconfont icon-hangbandongtai"  :class="isCollapsed?'menu-icon-collapsed':''"></i>-->
<!--              <span v-if="!isCollapsed">航班分析</span>-->
<!--            </MenuItem>-->
<!--        </Submenu>-->
        <Submenu name="3" class="submenu">
            <template slot="title">
                <i class="iconfont icon-yonghuzhongxin"  :class="isCollapsed?'menu-icon-collapsed':''"></i>
<!--                <Icon type="ios-clipboard" />-->
                <span v-if="!isCollapsed">管理中心</span>
            </template>
            <MenuItem name="usrMng" to="/system/usrMng" v-show="authority == '1111'">
                <Icon type="md-people" :class="isCollapsed?'menu-icon-collapsed':''"></Icon>
                <span v-if="!isCollapsed">成员管理</span>
            </MenuItem>
            <MenuItem name="pubMng" to="/system/pubMng" v-show="authority == '1111'">
                <Icon type="md-list-box" :class="isCollapsed?'menu-icon-collapsed':''"></Icon>
                <span v-if="!isCollapsed">刊物管理</span>
            </MenuItem>
            <MenuItem name="newsMng" to="/system/newsMng" v-show="authority == '1111'">
                <Icon type="md-bookmark" :class="isCollapsed?'menu-icon-collapsed':''"></Icon>
                <span v-if="!isCollapsed">新闻管理</span>
            </MenuItem>
            <MenuItem name="homeMng" to="/system/homeMng" v-show="authority == '1111'">
              <Icon type="md-home" :class="isCollapsed?'menu-icon-collapsed':''"></Icon>
              <span v-if="!isCollapsed">主页管理</span>
            </MenuItem>
        </Submenu>
    </Menu>
</div>
</template>

<script>
import knowledgeGraph from "../../knowledgeGraph/knowledgeGraph";

export default {
    data () {
        return {
            authority: sessionStorage.getItem('authority'),
            graphItems: {
                name:'知识图谱',
                path:'knowledgeGraph'
            }
        }
    },
    props: ['isCollapsed'],
    computed: {
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
        openNames () {
            switch (this.$route.name) {
                case 'crawl': return ['1']
                break
                case 'keywordMng': return ['1']
                break

                case 'globalTrend': return  ['3']
                break
                case 'knowledgeGraph': return  ['3']
                break

                case 'stanceDetect': return ['4']
                break
                case 'conflictAnalysis': return ['4']
                break
                case 'loseAnalysis': return ['4']
                break
                case 'flightAnalysis': return ['4']
                break

                case 'usrMng': return ['5']
                break
                case 'userInfo': return ['5']
                break
                case 'updatePassword': return ['5']
                break
            }
        }
    },
    methods: {
        menuClick (name) {
            console.log('name', name)
            console.log(this.$route.meta)
            // this.$emit()
            // if(name == 'knowledgeGraph') {
            //   this.gotoPage(this.graphItems.path)
            //   console.log(this.$store.state.iframeSrc);
            // }
        },
        // onClickLeft() {
        //   this.$router.go(-1);
        // },
        // gotoPage(path){
        //   this.$router.push(path);
        //
        //   this.$store.state.iframeSrc = this.$route.meta.link
        //   this.$store.state.iframeTitle = this.$route.meta.title
        // },
        // beforeunloadFn() {
        //   // console.log('刷新或关闭：',e)
        //   console.log("path:",this.$route.path)
        //   if(this.$route.path == '/system/knowledgeGraph') {
        //     this.gotoPage(this.graphItems.path)
        //   }
        // }
    },
    created() {
      // window.addEventListener('beforeunload', this.beforeunloadFn())
    },
    mounted() {
      //window.addEventListener('beforeunload', this.beforeunloadFn())
    },
    destroyed() {
      // window.removeEventListener('beforeunload', this.beforeunloadFn())
    }
}
</script>

<style lang="stylus" scoped>
.menu-icon-collapsed
    font-size 20px
</style>
