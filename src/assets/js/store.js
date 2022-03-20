import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 全局状态管理
const store = new Vuex.Store({
    state: {
        token: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '',      // 全局存储token
        authority: sessionStorage.getItem('authority') ? sessionStorage.getItem('authority') : '',  // 全局存储用户权限
        username: '',   // 全局存储username
        passwd: '',     // 存储加密password，注册后清空
        changeRatePredict: '',
        mapData: [],
        changeRate: [],
        chartForm: {},
        chartDate: '',
        chartFormPredict:{},

        targetNet: '',   //目标网站

        iframeSrc:'',
        iframeTitle: ''
    },
    getters: {
      getMapData (state) {
        return state.mapData
      }
    },
    mutations: {
        delToken (state) {
            state.token = ''
            sessionStorage.removeItem('Authorization')
        }
    },
    actions: {
    setTheme (context, value) {     // 异步修改主题 theme
      context.commit('changeTheme', value)
    },
  }
});

export default store
