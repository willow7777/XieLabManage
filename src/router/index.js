import Vue from 'vue'
import Router from 'vue-router'
import '../assets/css/fonts/iconfont.css' //iconfont
Vue.use(Router)


export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'Login - 登录'
            },
            component: resolve => require(['@/components/login/login'], resolve)
        },
        // {
        //   path: '/register',
        //   name: 'register',
        //   meta: {
        //     title: '注册'
        //   },
        //   component: resolve => require(['@/components/register/register'], resolve)
        // },
        {
            path: '/system',
            name: 'system',
            component: resolve => require(['@/components/system/system'], resolve),
            //   beforeEnter: (to, from, next) => {
            //     if (to.path === '/login') {
            //       next();
            //     } else {
            //       let token = sessionStorage.getItem('Authorization');
            //       if (!token || token === 'null' || token === '') {
            //         next('/login');
            //       } else {
            //         next();
            //       }
            //     }
            //   },
            children: [{
                    path: 'usrMng',
                    name: 'usrMng',
                    meta: {
                        icon: 'ios-people',
                        title: '成员管理'
                    },
                    component: resolve => require(['@/components/usrMng/usrMng'], resolve)
                },
                {
                    path: 'crawl',
                    name: 'crawl',
                    meta: {
                        icon: 'ios-bug',
                        title: '爬虫任务配置'
                    },
                    component: resolve => require(['@/components/crawl/crawl'], resolve)
                },
                {
                    path: 'keywordMng',
                    name: 'keywordMng',
                    meta: {
                        icon: 'md-stats',
                        title: '历史任务管理'
                    },
                    component: resolve => require(['@/components/keywordMng/keywordMng'], resolve)
                },
                {
                    path: 'search',
                    name: 'search',
                    meta: {
                        icon: 'md-filing',
                        title: '数据检索'
                    },
                    component: resolve => require(['@/components/infoRetrieval/search'], resolve)
                },
                {
                    path: 'globalTrend',
                    name: 'globalTrend',
                    meta: {
                        icon: 'ios-color-filter',
                        title: '全局态势'
                    },
                    component: resolve => require(['@/components/knowledgeGraph/globalTrend'], resolve)
                },
                {
                    path: 'knowledgeGraph',
                    name: 'knowledgeGraph',
                    meta: {
                        icon: 'ios-color-filter',
                        title: '知识图谱',
                        // link: 'https://www.bilibili.com/'
                        // link: 'http://kglab.tpddns.cn:10000/spa/container/kgms_dbtu0k39_graph_default/ae1dc8b05db04fffa4a4fa5c3de17441/graph/?hideHeader=true'
                    },
                    component: resolve => require(['@/components/knowledgeGraph/knowledgeGraph'], resolve)
                },
                {
                    path: 'sentimentAnalysis',
                    name: 'sentimentAnalysis',
                    meta: {
                        icon: 'ios-color-filter',
                        title: '情感分析'
                    },
                    component: resolve => require(['@/components/dataAnalysis/sentimentAnalysis'], resolve)
                },
                {
                    path: 'conflictAnalysis',
                    name: 'conflictAnalysis',
                    meta: {
                        icon: 'ios-color-filter',
                        title: '矛盾分析'
                    },
                    component: resolve => require(['@/components/dataAnalysis/conflictAnalysis'], resolve)
                },
                {
                    path: 'loseAnalysis',
                    name: 'loseAnalysis',
                    meta: {
                        icon: 'ios-color-filter',
                        title: '失业率分析'
                    },
                    component: resolve => require(['@/components/dataAnalysis/loseAnalysis'], resolve)
                },
                {
                    path: 'flightAnalysis',
                    name: 'flightAnalysis',
                    meta: {
                        icon: 'ios-color-filter',
                        title: '航班分析'
                    },
                    component: resolve => require(['@/components/dataAnalysis/flightAnalysis'], resolve)
                },
                {
                    path: 'newsMng',
                    name: 'newsMng',
                    meta: {
                        icon: 'md-bookmark',
                        title: '新闻管理'
                    },
                    component: resolve => require(['@/components/newsMng/newsMng'], resolve)
                },
                {
                    path: 'pubMng',
                    name: 'pubMng',
                    meta: {
                        icon: 'md-list-box',
                        title: '刊物管理'
                    },
                    component: resolve => require(['@/components/pubMng/pubMng'], resolve)
                },
                {
                    path: 'homeMng',
                    name: 'homeMng',
                    meta: {
                        icon: 'md-home',
                        title: '主页管理'
                    },
                    component: resolve => require(['@/components/homeMng/homeMng'], resolve)
                }
            ]
        },
    ],
    mode: 'hash', // 项目打包，需使用 hash 模式，否则使用 history 模式会切换不了路由
    linkActiveClass: 'active' // 设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置
})