<template>
  <div id="app">
    <router-view v-if="isRouterShow"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterShow: true
    }
  },
  methods: {
    async reload () {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
    }
  },
  updated () {
    this.$router.afterEach((to, from, next) => {
      document.getElementById('app').scrollTop = 0
    })
  }
}
</script>

<style>
@import url(./assets/css/main.css);

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
