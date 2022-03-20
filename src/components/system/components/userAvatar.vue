<template>
    <!-- 用户信息导航组件 -->
    <Dropdown @on-click="handleClick">
        <Badge>
            <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
        </Badge>
        <Icon :size="18" type="md-arrow-dropdown"></Icon>
        <DropdownMenu slot="list">
<!--            <DropdownItem name="info">个人信息</DropdownItem>-->
<!--            <DropdownItem name="change">修改密码</DropdownItem>-->
            <DropdownItem name="logout">退出登录</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
export default {
    methods: {
        logout () {
            // console.log(this.$store.state.username)
            this.axios.post('/api/user/logout', {
                'username': this.$store.state.username
            }).then((res) => {      // 清空token，返回login页面
                this.$store.commit('delToken')
                this.$Message.success(res.data.data)
                setTimeout(() => {
                    this.$router.push('/login')
                }, 2000);
            })
        },
        info () {
            this.$router.push({
                name: 'info'
            })
        },
        password () {
            this.$router.push({
                name: 'password'
            })
        },
        handleClick (name) {
            switch (name) {
                case 'logout': this.logout()
                break
                case 'info': this.info()
                break
                case 'change': this.password()
                break
            }
        }
    }
}
</script>
