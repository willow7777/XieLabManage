<template>
  <div>
    <div class="header">
<!--      <van-nav-bar-->
<!--        left-arrow-->
<!--        @click-left="onClickLeft"-->
<!--      ></van-nav-bar>-->
<!--      <van-icon name="cross" class="close" @click="closeTab" />-->
    </div>
    <div id="iframe-container">
      <iframe :src="link" scrolling="auto" frameborder="0" class="trend-container2" id="iframe"></iframe>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'

export default {
  name: "knowledgeGraph",
  data(){
    return {
      link:'http://kglab.tpddns.cn:10000/spa/container/kgms_bj73rc51_graph_177c8becc98/68f6166805ab4cd7a7abf313a7bd44a6/explore'
    }
  },
  mounted() {
    let iframe = document.getElementById('iframe')
    NProgress.start()

    iframe.onload = function() {
      NProgress.done()
    }
  },
  created() {
  },
  methods: {
    // onClickLeft() {
    //   this.$router.go(-1)
    //   NProgress.done()
    // },
    //
    // closeTab() {
    //   this.$router.replace('knowledgeGraph')
    //   NProgress.done()
    // }
  }
}
</script>

<style scoped>
.trend-container2 {
  position: relative;
  width: 100%;
  min-height: 750px;
  padding-bottom: 16px;
}
</style>
