<template>
<div>
    <div class="input-content">
        <Input v-model="username" prefix="ios-contact" placeholder="请输入用户名" style="width:100%" />
        <div style="margin-top:20px;"></div>
        <Input v-model="password" prefix="md-lock" placeholder="请输入密码" type="password" style="width:100%" />
    </div>
    <Button type="primary" long @click="login()">登录</Button><br>
</div>
</template>

<script>
export default {
    data () {
        return {
            username: '',
            password: '',
            view: 'loginForm',
            remember: false
        }
    },
    props: {
        userName: {
            type: String
        },
        rememberusr: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        userName (name) {
            this.username = name
        },
        rememberusr (val) {
            this.remember = val
        }
    },
    methods: {
        /**
         * 跳转至注册账户页面
         */
        // register () {
        //     this.$router.push('/register')
        // },
        /**
         * 用户忘记密码，切换至找回密码组件
         */
        findPassword () {
            this.view = 'findpwForm'
            this.$emit('childFn', this.view)
            console.log(this.view)
        },
        /**
         * 设置cookie，用户勾选“记住用户名”，将username存储至cookie
         */
        setCookie (c_name, exdays) {
            let exdate = new Date()     // 设置保存天数
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
            window.document.cookie = "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString()  //字符串拼接cookie
        },
        /**
         * 登录账户，发送登录鉴权请求
         * @param {string} username 用户名
         * @param {string} passwd 密码，前端MD5加密
         * @param {string} token token鉴权
         * @param {number} account_level 账号权限，4位二进制，第四位账号管理权限，1-管理员，0-普通用户
         */
        login () {
            if (this.username == '' || this.password == '') {
                this.$Message.error('请填完整信息！')
            } else {
                this.axios.post('/api/user/login', {
                    'username': this.username,
                    'passwd': this.$md5(this.password)
                    // 'passwd': this.password
                }).then((res) => {
                    if (res.data.code === 200) {
                        console.log(res)
                        this.$store.state.token = res.data.data.token          // vuex全局存储token值
                        this.$store.state.username = this.username      // vuex全局存储username值
                        // let userid = res.data.account_level.toString()      // 用户身份，accountLevel，1111为管理员，1110为普通用户
                        // if (userid.substring(userid.length - 1) == '1') this.$store.state.authority = '1'
                        if (this.remember == true) {         // 勾选记住用户名，存储到cookie
                            this.setCookie(this.username, 1)
                        }
                        sessionStorage.setItem('username', this.username)   // 将username存储到sesstionStorage
                        sessionStorage.setItem('Authorization', res.data.data.token) // 将token存储到sesstionStorage
                        sessionStorage.setItem('authority', res.data.data.accountLevel)    // 将用户身份存储到sesstionStorage
                        this.$Message.success('登录成功！')
                        setTimeout(() => {
                            this.$router.push('/system/usrMng')
                        }, 2000)
                    } else {
                        this.$Message.error('登录失败！')
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }
}
</script>
