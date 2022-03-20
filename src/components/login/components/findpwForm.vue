<template>
<div>
    <div class="input-content">
        <Input v-model="username" prefix="ios-contact" placeholder="请输入用户名" style="width:100%" /> 
        <div style="margin-top:20px;"></div>
        <!-- <div> -->
        <Input v-model="email" prefix="ios-mail" placeholder="请输入注册邮箱" style="width:90%" class="get-code-input"/>
        <div class="get-code">
            <Icon type="ios-send" slot="suffix" size="20" @click="getCode" v-show="show"/>
            <span slot="append" v-show="!show">{{count}} s</span>
        </div>
        <div style="margin-top:20px;"></div>
        <Input v-model="code" prefix="ios-apps" placeholder="请输入验证码" style="width:100%" /> 
    </div>
    <Button type="primary" long @click="sendEmail()">找回密码</Button>
    <Button long @click="returnLogin()">返回登录</Button>
</div>
</template>

<script>
export default {
    data () {
        return {
            view: 'findpwForm',
            username: '',
            email: '',
            code: '',
            count: 0,
            show: true,
            timer: null
        }
    },
    mounted () {        // 获取username值
        this.username = this.$parent.username
    },
    methods: {
        /**
         * 返回登录，切换至登录组件
         */
        returnLogin () {
            this.view = 'loginForm'
            this.$emit('childFn', this.view)
        },
        /**
         * 获取邮件验证码，60s倒计时
         */
        countdown () {
            const TIME_COUNT = 60   // 设置时间为60s
            if (!this.timer) {
                this.count = TIME_COUNT
                this.show = false
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count --
                    } else {
                        this.show = true
                        clearInterval(this.timer)
                        this.timer = null
                    }
                }, 1000)
            }
        },
        /**
         * 发送邮件获取验证码
         * @param {string} username 用户名
         * @param {string} email 电子邮箱
         */
        getCode () {
            if (this.username == '' || this.email == '') {
                this.$Message.error('请填完整信息！')
            } else {
                this.axios.post('/api/user/findpassword/submit', {
                    'username': this.username,
                    'email': this.email
                }).then((res) => {
                    console.log(res)
                    if (res.data.code === 200) {
                        this.$Message.info('已发送邮件')
                        this.countdown()
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        /**
         * 上传邮箱验证码找回密码
         * @param {string} username 用户名
         * @param {string} verificationcode 验证码
         */
        sendEmail () {
            if (this.username == '' || this.email == '') {
                this.$Message.error('请填完整信息！')
            } else {
                this.axios.post('/api/user/findpassword/submitverificationcode', {
                    'username': this.username,
                    'verificationcode': this.code
                }).then((res) => {
                    console.log(res)
                    if (res.data.code === 200) {
                        this.$Message.info('已发送邮件')
                        setTimeout(() => {
                            this.view = 'loginForm'
                            this.$emit('childFn', this.view)
                            console.log(this.view)
                        }, 2000)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }
}
</script>

