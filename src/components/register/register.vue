<template>
<div class="login-bg">
    <div class="register-con">
        <h2>数据采集与信息推送</h2>
        <transition name="right" mode="out-in" translate="">
            <component :is="step" @childFn="parentFn"></component>
        </transition>
    </div>
</div>
</template>


<script>
import usrpwFormVue from './components/usrpwForm.vue'
import usrinfoFormVue from './components/usrinfoForm.vue'

export default {
    data () {
        return {
            step: 'one',
            formOne: {}
        }
    },
    components: {
        'one': usrpwFormVue,
        'two': usrinfoFormVue
    },
    methods: {
        parentFn (value) {
            this.step = value
        }
    }
}
</script>

<style lang="stylus" >
.register-con
    h2
        font-size: 32px;
        color:#fff;
        margin-bottom 24px
    position: absolute;
    left: 50%;
    top: 20%;
    width: 350px;
    text-align: center;
    transform: translate(-50%, 0);
.subheading
    color: #ffffff
    margin-bottom 12px
    font-size 16px

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
   
</style>