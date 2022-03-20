<template>
<div id="login" class="login-bg">
    <div class="login-con">
        <h2>XIE LAB管理员系统</h2>
        <!-- 动画切换登录、找回密码子组件 -->
        <transition name="right" mode="out-in" translate="">
            <component :is="view" @childFn="parentFn" :userName="username" :rememberusr="rememberusr"></component>
        </transition>
    </div>
</div>
</template>


<script>
import loginFormVue from './components/loginForm.vue'
import findpwFormVue from './components/findpwForm.vue'

export default {
    data () {
        return {
            view: 'loginForm',
            username: '',
            rememberusr: false
        }
    },
    components: {
        'loginForm': loginFormVue,
        'findpwForm': findpwFormVue
    },
    mounted () {
        this.getCookie()
    },
    methods: {
        parentFn (value) {
            this.view = value
        },

        /**
         * 读取cookie
         */
        getCookie () {
            if (document.cookie.length > 0) {
                let arr = document.cookie.split('; ')
                for (let i = 0; i < arr.length; i++) {
                    let arr2 = arr[i].split('=')
                    if (arr2[0] == 'username') {
                        this.username = arr2[1]
                        this.rememberusr = true
                    }
                }
            }
        },
        /**
         * 清除cookie
         */
        clearCookie () {
            this.setCookie('', '', -1)
        }
    }
}
</script>

<style lang="stylus" >
.login-con
    h2
        font-size: 32px;
        color:#fff;
        margin-bottom 40px
    position: absolute;
    left: 50%;
    top: 30%;
    width: 350px;
    text-align: center;
    transform: translate(-50%, 0);
.input-content
    margin-bottom 30px
    .get-code-input .ivu-input
        border-right 1px solid #e2e2e2
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    .get-code
        width 10%
        float right
        height 32px
        line-height 32px
        background #f3f3f3
        cursor pointer
.info
    display: flex;
    justify-content: space-between;
    margin-bottom 30px
    span
        font-size: 14px;
        color #fff;
        cursor pointer


// 定义进入前与离开后状态
.right-enter, .right-leave-to
    transform: translate3d(100%, 0, 0)
    opacity 0
// 定义离开前与进入后状态
.right-leave, .right-enter-to
    transform: translate3d(0, 0, 0)
    opacity 1
// 定义进出过程
.right-enter-active, .right-leave-active
    transition: all .5s
    // transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);

</style>
