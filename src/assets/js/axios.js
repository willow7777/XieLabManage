import Vue from 'vue'
import axios from 'axios'
import store from './store'
import router from '@/router/index'
// import ViewUI from 'view-design'
// import 'view-design/dist/styles/iview.css'
// Vue.use(ViewUI);

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {    // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = store.state.token   // 请求头加上token
        }
        return config
    },
    err => {
        return Promise.reject(err);
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        let data = response.data
        if (data.code === 401) {
            // Vue.$Message.newsMng('请重新登录！')
            console.log('请重新登录！')
            store.commit('delToken')
            setTimeout(() => {
                window.location.href = '/'
            }, 2000);
            return
        }
        return response
    },
    error => {
        return Promise.reject(error)
        // if (error.response) {
        //     console.log('axios',error.response)
        //     switch (error.response.code) {
        //         case 401:       // 用户未登录
        //             store.commit('delToken')
        //             router.replace({
        //                 path: 'login',
        //                 query: {redirect: router.currentRoute.fullPath}     // 登录成功后跳入浏览的当前页面
        //             })
        //     }
        // }
        // return Promise.reject(error.response.data)      // 返回接口返回的错误信息
    }
)

export default axios
