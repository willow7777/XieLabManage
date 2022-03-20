<template>
<div>
    <h3 class="subheading">完善个人信息</h3>
        <Form ref="formInfo" :model="formInfo" :rules="ruleInfo">
            <FormItem prop="tname">
                <Input v-model="formInfo.tname" placeholder="请输入真实姓名" />
            </FormItem>
            <FormItem prop="certType">
                <Select v-model="formInfo.certType" placeholder="请选择证件类型 (选填)">
                    <Option value="身份证">身份证</Option>
                    <Option value="护照">护照</Option>
                    <Option value="工作证">工作证</Option>
                </Select>
            </FormItem>
            <FormItem prop="certId">
                <Input v-model="formInfo.certId" placeholder="请输入证件号码 (选填)" />
            </FormItem>
            <FormItem prop="tel">
                <Input v-model="formInfo.tel" placeholder="请输入手机号" />
            </FormItem>
            <FormItem prop="email">
                <!-- <Input v-model="formInfo.email" placeholder="请输入电子邮箱" /> -->
                <AutoComplete v-model="formInfo.email" @on-search="autoEmail" placeholder="请输入电子邮箱">
                    <Option v-for="item in mailSuffix" :value="item" :key="item">{{ item }}</Option>
                </AutoComplete>
            </FormItem>
            <FormItem prop="location">
                <Input v-model="formInfo.location" placeholder="请输入所在地 (选填)" />
            </FormItem>
            <FormItem prop="group">
                <Input v-model="formInfo.group" placeholder="请输入单位（公司）" />
            </FormItem>
            <FormItem prop="position">
                <Input v-model="formInfo.position" placeholder="请输入职称 (选填)" />
            </FormItem>
            <FormItem>
                <Button type="primary" long @click="handleSubmit('formInfo')">立即注册</Button>
            </FormItem>
        </Form>
</div>
</template>

<script>
export default {
    data () {
        return {
            step: 'two',
            username: this.$store.state.username,
            passwd: this.$store.state.passwd,
            mailSuffix: [],
            formInfo: {
                tname: '',
                certType: '',
                certId: '',
                tel: '',
                email: '',
                location: '',
                group: '',
                position: ''
            },
            ruleInfo: {
                tname: [
                    { required: true, message: '请填写真实姓名', trigger: 'blur' }
                ],
                certType: [
                    { required: false, message: '请选择证件类型', trigger: 'change' }
                ],
                certId: [
                    { required: false, message: '请填写证件号码', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请填写手机号码', trigger: 'blur' },
                    { type: 'string', len: 11, message: '请输入11位手机号', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请填写电子邮箱', trigger: 'blur' },
                    // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                ],
                location: [
                    { required: false, message: '请填写所在地', trigger: 'blur' }
                ],
                group: [
                    { required: true, message: '请填写单位（公司）', trigger: 'blur' }
                ],
                position: [
                    { required: false, message: '请填写职称', trigger: 'blur' }
                ]
            }
        }
    },

    methods: {
        /**
         * 自动完成邮箱后缀
         */
        autoEmail (value) {
            this.mailSuffix = !value || value.indexOf('@') >= 0 ? [] : [
                value + '@qq.com',
                value + '@sina.com',
                value + '@163.com'
            ];
        },
        /**
         * 当注册表单非空时，提交注册信息
         */
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.register()
                } else {
                    this.$Message.error('请填写所有信息!');
                }
            })
        },
        /**
         * 提交注册信息，向服务器发送注册请求
         * @param {string} username 用户名
         * @param {string} passwd 密码，MD5加密
         * @param {string} tname 真实姓名
         * @param {string} certId 证件号码（非必须）
         * @param {string} certType 证件类型（非必须）
         * @param {string} tel 手机号
         * @param {string} email 电子邮箱
         * @param {string} location 所在地（非必须）
         * @param {string} group 单位/公司
         * @param {string} position 职称（非必须）
         * @param {string} accountlevel 账号权限，前端默认值1110
         */
        register () {
            this.axios.post('/api/user/register', {
                'username': this.username,
                'passwd': this.passwd,
                'tname': this.formInfo.tname,
                'certId': this.formInfo.certId,
                'certType': this.formInfo.certType,
                'tel': this.formInfo.tel,
                'email': this.formInfo.email,
                'location': this.formInfo.location,
                'group': this.formInfo.group,
                'position': this.formInfo.position,
                'accountLevel': 1110
            }).then((res) => {
                console.log(res)
                this.$Message.success('注册成功！');
                setTimeout(() => {
                    this.$router.push('/login')     // 注册成功，转至登录界面
                }, 1500);
                this.$store.state.passwd = ''   // 注册成功，清空全局存储passwd值
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>