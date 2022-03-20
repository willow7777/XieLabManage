<template>
    <Drawer title="添加刊物" v-model="value" width="500" :mask-closable="false" :styles="styles">
        <Form ref="formData" :model="formData" :rules="ruleInfo" :label-width="110">
            <FormItem label="中文名" prop="nameCh">
                <Input v-model="formData.nameCh" placeholder="请输入中文名" />
            </FormItem>
            <FormItem label="英文名" prop="nameEn">
                <Input v-model="formData.nameEn" placeholder="请输入英文名" />
            </FormItem>
<!--            <FormItem label="英文名" prop="nameEn" v-show="Object.keys(editData).length === 0">-->
<!--                <Input v-model="formData.nameEn" placeholder="请输入英文名" type="password"/>-->
<!--            </FormItem>         -->
            <FormItem label="作者" prop="author">
                <Input v-model="formData.author" placeholder="请输入英文名" />
            </FormItem>
<!--            <FormItem label="证件类型" prop="certType">-->
<!--                <Select v-model="formData.certType" placeholder="请选择证件类型 (选填)">-->
<!--                    <Option value="身份证">身份证</Option>-->
<!--                    <Option value="护照">护照</Option>-->
<!--                    <Option value="工作证">工作证</Option>-->
<!--                    <Option value="军官证">军官证</Option>-->
<!--                </Select>-->
<!--            </FormItem>-->
            <FormItem label="出版刊物" prop="journal">
                <Input v-model="formData.journal" placeholder="请输入出版刊物" />
            </FormItem>
            <FormItem label="日期" prop="date">
                <DatePicker type="date" placeholder="Select date" style="width: 300px" @on-change="getDateTime"></DatePicker>
            </FormItem>
            <FormItem label="简介" prop="introduce">
                <Input v-model="formData.introduce" placeholder="请输入论文简介" />
            </FormItem>
            <FormItem label="主页展示" prop="featured">
              <i-switch v-model="formData.featured"/>
            </FormItem>
            <FormItem label="论文地址" prop="url">
                <Input v-model="formData.url" placeholder="请输入论文地址" />
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="onClose()">Cancel</Button>
            <Button type="primary" @click="submit('formData')">Submit</Button>
        </div>
    </Drawer>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean
        },
        editData: {
            type: Object,
            default: {}
        }
    },
    data () {
        return {
            value: false,
            mailSuffix: [],
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            formData: {
                username: '',
                passwd: '',
                tname: '',
                certType: '',
                certId: '',
                tel: '',
                email: '',
                location: '',
                group: '',
                position: '',
                accountlevel: 1110,
                token: ''
            },
            ruleInfo: {
                username: [
                    { required: true, message: '请填写新添账号名', trigger: 'blur' }
                ],
                passwd: [
                    { required: true, message: '密码不可为空', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur' }
                ],
                tname: [
                    { required: true, message: '请填写真实姓名', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请填写电子邮箱', trigger: 'blur' },
                ],
                tel: [
                    { required: false, message: '请填写手机号码', trigger: 'blur' },
                    { type: 'string', len: 11, message: '请输入11位手机号', trigger: 'blur' }
                ],
                certType: [
                    { required: false, message: '请选择证件类型', trigger: 'change' }
                ],
                certId: [
                    { required: false, message: '请填写证件号码', trigger: 'blur' }
                ],
                location: [
                    { required: false, message: '请填写所在地', trigger: 'blur' }
                ],
                group: [
                    { required: false, message: '请填写单位（公司）', trigger: 'blur' }
                ],
                position: [
                    { required: false, message: '请填写职称', trigger: 'blur' }
                ]
            },
            oldFormData: {}
        }
    },

    computed: {
        // 将输入密码MD5加密
        passwd () {
            return this.$md5(this.formData.passwd)
        },
        token () {
            return this.$store.state.token
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
        onClose () {
            this.$emit('on-close', false)
            this.formData = this.oldFormData
            // console.log(this.oldFormData)
        },
      getDateTime: function (time) {
        this.formData.date = time;
      },
        submit (name) {
            // if (this.oldFormData.passwd !== this.formData.passwd) {
            //     this.formData.passwd = this.passwd
            // }
          console.log(this.formData)
            this.formData.token = this.token
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (Object.keys(this.editData).length !== 0) { this.updatePublication() }
                    else { this.addPublication() }
                } else {
                    this.$Message.error('请填写所有信息!');
                }
            })
        },
        change (featured) {
          this.$Message.info('开关状态：' + featured);
        },
        /**
         * 调用添加新账号接口
         */
        addPublication () {
            // console.log('form',typeof(this.formData))
            this.axios.post('/api/publication/addPublication', JSON.stringify(this.formData), {
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }).then((res) => {
                console.log(res)
                if (res.data.code === 200) {
                    this.$Message.success('刊物信息创建成功！')
                } else {
                    this.$Message.error(res.data.msg)
                }
                // 刷新页面 or 调用getUserList*******************
                setTimeout(() => {
                    this.$parent.getUserList()
                }, 1500);
                this.$emit('on-close', false)
            }).catch((error) => {
                console.log(error)
                this.$Message.error('刊物信息创建失败！')
            })
        },
        /**
         * 调用修改账号信息接口
         */
        updatePublication () {
            let form = this.formData
            delete form.authority
            delete form._index
            delete form._rowKey
            this.axios.post('/api/publication/updatePublication', JSON.stringify(this.formData), {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
                }).then(result => {
              this.$parent.getUserList()
              // this.$parent.changeSuccess(result.data.data, this.index)
              this.$Message.success(result.data.msg);
              this.$emit('on-close', false)
            }).catch(error => {
              console.log('error', error)
              this.$Message.error('修改失败！');
            })
        }
    },

    watch: {
        show (val) {
            this.value = val
        },
        editData (val) {
            this.formData = { ...val }
            this.oldFormData = JSON.parse(JSON.stringify(this.formData))
            console.log('edit', val)
        },
        value (val) {
            if (val == false) {
                this.$emit('on-close', false)
                this.formData = this.oldFormData
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.demo-drawer-footer
    width 100%
    position: absolute
    bottom 0
    left 0
    border-top 1px solid #e8e8e8
    padding 10px 16px
    text-align right
    background #fff

</style>
