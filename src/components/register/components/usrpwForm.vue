<template>
<div>
    <h3 class="subheading">注册账号</h3>
        <Form ref="formRegister" :model="formRegister" :rules="ruleRegister">
            <FormItem prop="name">
                <Input v-model="formRegister.name" placeholder="请输入用户名" />
            </FormItem>
            <FormItem prop="passwd">
                <Input v-model="formRegister.passwd" placeholder="请输入密码" type="password"/>
            </FormItem>
            <FormItem prop="re_password">
                <Input v-model="formRegister.re_password" placeholder="请再次确认密码" type="password"/>
            </FormItem>
            <FormItem>
                <Button type="primary" long @click="nextStep('formRegister')">下一步</Button>
            </FormItem>
        </Form>
</div>
</template>

<script>
export default {
    data () {
        return {
            step: 'one',
            formRegister: {
                name: '',
                passwd: '',
                re_password: ''
            },
            ruleRegister: {
                name: [
                    { required: true, message: '用户名不可为空', trigger: 'blur' }
                ],
                passwd: [
                    { required: true, message: '密码不可为空', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur' }
                ],
                re_password: [
                    { required: true, message: '密码不可为空', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        /**
         * 注册下一步，将注册用户名和密码传给usrinfoForm组件
         */
        nextStep (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.formRegister.passwd === this.formRegister.re_password) {
                        this.step = 'two'
                        this.$emit('childFn', this.step)
                        this.$store.state.username = this.formRegister.name
                        this.$store.state.passwd = this.$md5(this.formRegister.passwd)
                        console.log(this.formRegister)
                    } else {
                        this.$Message.error('密码不正确！')
                        setTimeout(() => {
                            this.handleReset(name)
                        }, 2000)
                    }
                } else {
                    this.$Message.error('请填写所有信息!')
                }
            })
        },
        /**
         * 重置表单
         */
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>