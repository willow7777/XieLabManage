export default {
    props: {
        username: {
            type: String
        }
    },
    data () {
        return {
            selectUrl: '',
            modal2: false,
            inputUrl: '',
            warningMsg: true,  // 显示警告信息
            searchKey: '',      // 搜索关键词
            searchValue: '',    // 输入搜索值
            title: '',          // 弹窗标题
            index: '',          // 用于存储正在操作的某行数据的行号
            modal: false,       // ”添加任务“弹窗显示/隐藏
            loading: false,     // 表格是否为加载模式
            editIndex: -1,      // 当前聚焦的输入框的行数
            editKeyword: '',    // 输入修改关键词
            isSwitch: false,        // 开关状态是否修改成功
            inputVal: '',       // 输入添加关键词
            indeterminate: true,    // 复选框状态，控制样式
            checkAll: false,    // 是否全选
            oldKeyword: '',     // 存储修改前旧关键词
            oldTargets: '',     // 存储修改前旧目标网站
            checkAllGroup: [],  // 全选list数据
            data: [],           // 表格展示数据list
            dataAll: [],        // 储存所有list
            list: [             // 表格每列内容设置
                {title: '任务', slot: 'task', align: 'center', width: 100},
                {title: '关键词', slot: 'keyword'},
                {title: '目标网站', slot: 'targets'},
                {title: '时间', slot: 'createTime'},
                // {title: '配置', slot: 'action1', align: 'center'},
                {title: '操作', slot: 'action2', align: 'center'},
                {title: '开关', slot: 'taskStatus', align: 'center', width: 150}
            ],
            searchList: [       // 搜索内容分类-下拉选项
                {key: 'keyword', title: '关键词'},
                {key: 'targets', title: '目标网站'}
            ],
            taskgroupArr: [false, false, false, false, false, false, false, false, false, false,
                           false, false, false, false, false, false, false, false, false, false]
        }
    },

    created () {
        this.loading = true
        this.getList()
    },

    methods: {
        inputUrlOk() {
          if (this.inputUrl && this.selectUrl) {
            this.axios({
              url: '/api/task/addnewtask',
              method: 'post',
              data: {
                targets: this.selectUrl.toString(),
                url: this.inputUrl,
                taskgroup: this.getTaskgroup().toString()
              }
            }).then(result => {
              if (result.data.code === 200) {
                this.$Message.success('添加成功')
              } else {
                this.$Message.error(result.data.msg)
              }
            }).catch(error => {
              this.$Message.error('添加失败！')
            })
            // let b = this.inputUrl.indexOf(".");
            // let e = this.inputUrl.indexOf(".", b + 1);
            // this.target = e === -1 ? '' : this.inputUrl.substring(b+1, e)
          } else {
            this.$Message.error("URL为空")
            this.$nextTick(() => {
              this.modal2 = true
            })
          }
        },
        /**
         * 弹窗中复选框全选
         */
        handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.checkAllGroup = ['twitter', 'facebook', 'weibo', 'ck101', 'eyny', 'ltn', 'setn',
                                      'lihkg','DFI','sputniknews','nytimes','ani','timesofindia','outlook',
                                      'cnr','sohu','sina'];
            } else {
                this.checkAllGroup = [];
            }
        },
        /**
         * 已选复选框列表
         */
        checkAllGroupChange (data) {
            console.log(data)
            if (data.length === 8) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
        },
        /**
         * 打开添加任务弹窗
         */
        addClick () {
            if (this.data.length == 20) {
                this.$Message.error('已达到任务最大上限20条！')
            } else {
                this.modal = true
                this.title = '新添加任务'
                this.inputVal = ''
                this.checkAllGroup = []
                this.indeterminate = false
            }
        },
        /**
         * 打开配置目标网站弹窗
         */
        showInfo (row, index) {
            if (row.taskStatus == false){
                this.index = index
                this.title = '目标网站配置'
                this.warningMsg = true
                this.inputVal = row.keyword
                this.modal = true
                let targetsArray = []
                targetsArray = row.targets.split(', ').map((item) => this.handleTargets(item))
                console.log('targetsArray',targetsArray)
                this.checkAllGroup = targetsArray
            } else {
                this.$Message.error("请暂停当前任务后操作！")
            }
        },
        /**
         * 随机生成32位字符串
         */
        randomString (n) {
            let str = '0123456789'
            let tmp = ''
            for (let i=0; i<n; i++) {
                tmp += str.charAt(Math.floor(Math.random() * str.length))
            }
            return tmp
        },
        /**
         * 获取新建任务taskgroup
         */
        getTaskgroup () {
            let tmp = 0
            for (let i=0; i<20; i++) {
                if (this.taskgroupArr[i] == false) {
                    tmp = i
                    break
                }
            }
            return tmp
        },
        /**
         * 关闭弹窗
         */
        modalCancel () {
            this.modal = false
        },
        /**
         * 搜索查询信息
         */
        searchClick () {
            this.dataAll = this.data
            this.data = this.handleSearch()
        },
        /**
         * 筛选输入搜索字段，根据搜索分类筛选出查询内容
         */
        handleSearch () {
            if (this.searchValue) {
                return this.data.filter((item) => {
                    if (this.searchKey == 'keyword' && item.keyword.indexOf(this.searchValue) > -1) { return item }
                    else if (this.searchKey == 'targets' && item.targets.toLowerCase().indexOf(this.searchValue) > -1) { return item }
                })
            }
            return this.data
        },
        /**
         * 列表任务修改操作
         */
        handleEdit (row, index) {
            if (row.taskStatus == 0) {
                this.editIndex = index
                this.editKeyword = row.keyword
                this.oldKeyword = row.keyword
                this.oldTargets = row.targets
                this.showInfo(row, index)
            } else {
                this.$Message.error("请暂停当前任务后操作！")
            }
        },
        /**
         * 切换开关之前，弹窗确认是否切换
         */
        beforeChange () {
            return new Promise((resolve) => {
                this.$Modal.confirm({
                    title: '切换确认',
                    content: '您确认要切换爬虫任务开关状态吗？',
                    onOk: () => {
                        // if (this.isSwitch == true)
                        console.log('ref',this.$refs.swvalue)
                        resolve();
                    }
                });
            });
        },
        /**
         * 调用Notice通知提醒
         */
        getNotice (msg, time) {
            this.$Notice.info({
                title: '任务开关请求通知',
                desc: msg,
                duration: time
            })
        },
        /**
         * 将获取到任务列表，处理成界面展示形式
         */
        handleList (arr) {
            return {
                keyword: arr[0].keyword,
                createTime: arr[0].createTime,
                taskGroup: arr[0].taskGroup,
                taskStatus: arr[0].taskStatus,
                targets: arr.map((item) => this.handleTargets(item.target)).join(', '),
                taskId: arr.map((item) => item.taskId).join(', ')
            }
        },
        /**
         * 目标网站中英转换
         */
        handleTargets (val) {
            switch (val) {
                case 'twitter': return 'Twitter';  case 'Twitter': return 'twitter'
                case 'facebook': return 'Facebook';  case 'Facebook': return 'facebook'
                case 'weibo': return '微博';  case '微博': return 'weibo'
                case 'zhihu': return '知乎';  case '知乎': return 'zhihu'
                case 'ck101': return '卡提诺';  case '卡提诺': return 'ck101'
                case 'eyny': return '伊莉';  case '伊莉': return 'eyny'
                case 'ltn': return '自由时报';  case '自由时报': return 'ltn'
                case 'setn': return '三立新闻';  case '三立新闻': return 'setn'
            }
        },
        /**
        * 用于初始化获取爬虫任务列表数据，向服务器发送查询请求
        * @param {sting} taskId 后端爬虫任务编号
        * @param {sting} target 目标网站
        * @param {sting} keyword 关键词
        * @param {number} taskStatus 任务状态，1-执行中，0-暂停
        * @param {sting} taskGroup 前端分组显示编号
        */
        getList () {
            this.data = []
            this.axios.post('/api/task/findtask', {
                'msg': null
            }).then((response) => {
                if (response.data.code === 200) {
                    console.log(response.data)
                    let res = response.data.data
                    for (let i=0; i<res.length; i++) {
                        let keyword = res[i][0].keyword
                        let createTime = res[i][0].createTime
                        let taskStatus = res[i][0].taskStatus
                        let taskGroup = res[i][0].taskGroup
                        let taskId = res[i].map((item) => item.taskId).join(', ')
                        let targets = res[i].map((item) => this.handleTargets(item.target)).join(', ')
                        this.data.push({
                            taskId: taskId,
                            keyword: keyword,
                            createTime: createTime,
                            targets: targets,
                            taskStatus: taskStatus,
                            taskGroup: taskGroup
                        })
                        // 将 taskgroupArr[taskGroup] 写为 true
                        this.taskgroupArr[taskGroup] = true
                    }
                } else {
                    this.$Message.warning(response.data.msg)
                }
                console.log()
                this.dataAll = this.data
                this.loading = false
            }).catch((error) => {
                setTimeout(() => {      // 无数据或者请求超时
                    this.loading = false
                    this.$Message.error('任务列表加载失败！')
                }, 10000);
            })
       },
        /**
         * 弹窗点击确认按钮，用于向服务器发出添加任务请求，用于绑定某行目标网站配置修改
         * @param {sting} taskId 后端爬虫任务编号
         * @param {sting} target 目标网站
         * @param {sting} keyword 关键词
         * @param {number} taskStatus 任务状态，1-执行中，0-暂停
         * @param {sting} taskGroup 前端分组显示编号
         *
         * @param {sting} targets 目标网站列表
         */
        modalOk () {        // 判断弹窗中内容是否为空
            if (this.checkAllGroup.length !== 0 && this.inputVal !== '') {
                if (this.title == '新添加任务') {           // 确认添加新任务，并发送给后台添加信息
                    console.log(this.inputVal, this.checkAllGroup)
                    let new_targets = this.checkAllGroup.join(', ')
                    let taskGroup = (this.getTaskgroup()).toString()
                    this.axios.post('/api/task/addnewtask', {
                        'username': this.username,
                        'keyword': this.inputVal,
                        'targets': new_targets,
                        'taskgroup': taskGroup,
                    }).then((response) => {
                        this.$Message.success('爬虫任务添加成功！')
                        // console.log(response)
                        setTimeout(() => {
                            let res = response.data.data
                            let list = this.handleList(res)
                            this.data.push({
                                taskId: list.taskId,
                                keyword: list.keyword,
                                createTime: list.createTime,
                                targets: list.targets,
                                taskStatus: list.taskStatus,
                                taskGroup: list.taskGroup
                            })
                        }, 1500);
                    }).catch((error) => {
                        console.log(error)
                        this.$Message.error("添加任务失败！请重试。")
                    })
                }
                else if (this.title == '目标网站配置') {        // 确认修改该行任务的目标网站
                    console.log(this.index)
                    let new_keyword = this.inputVal
                    let new_targets = this.checkAllGroup.join(', ')
                    // this.data[this.index].targets = new_targets
                    this.handleSave(this.index, new_keyword, new_targets)
                }
                this.modal = false
                console.log(this.checkAllGroup)
            } else {
                this.modal = true
                this.$Message.error('内容不能为空！')
            }
        },
        /**
         * 列表任务保存修改，向服务器发出修改请求
         * @param {sting} taskId 后端爬虫任务编号
         * @param {sting} newkeyword 修改后关键词
         * @param {sting} newtargets 修改后目标网站列表
         */
        handleSave (index, new_keyword, new_targets) {
            if (this.editKeyword == '') {
                this.$Message.error('内容不能为空！')
            } else {
                // let rownum = index + 1
                // return new Promise(() => {
                    // this.$Modal.confirm({
                    //     title: '确认修改',
                    //     content: '您确认完成任务task ' + rownum + ' 修改并提交关键词信息？',
                    //     onOk: () => {
                            this.editIndex = -1
                            this.data[index].keyword = this.editKeyword
                            this.axios.post('/api/task/updatetask', {
                                'username': this.username,
                                'taskId': this.data[index].taskId,
                                'newkeyword': new_keyword,
                                'newtargets': new_targets,
                                // 'taskGroup': this.data[index].taskGroup,
                            }).then((res) => {
                                console.log(res)
                                if (res.data.code == 200) {
                                    this.data[index].keyword = new_keyword
                                    this.data[index].targets = new_targets.split(', ').map((item) => this.handleTargets(item)).join(', ')
                                    this.$Message.success('成功修改任务配置！')
                                } else {
                                    // this.data[index].keyword = this.oldKeyword
                                    // this.data[index].targets = this.oldTargets
                                    this.$Message.error(res.data.extend)
                                    // this.editIndex = index
                                }
                            }).catch((error) => {       // 如果修改失败，获取原来未修改的数据
                                this.$Message.error('修改失败！')
                                // this.editIndex = index
                            })
                    //     }
                    // });
                // });
            }
        },
        /**
         * 列表任务删除操作，向服务器发出删除请求
         * @param {sting} taskId 后端爬虫任务编号
         * @param {sting} target 目标网站
         */
        remove (index) {
            if (this.data[index].taskStatus == 0) {     // 任务暂停状态，才能删除
                return new Promise(() => {
                    let rownum = index + 1
                    this.$Modal.confirm({
                        title: '确认删除',
                        content: '您确认要停止并删除任务' + rownum + '吗？',
                        onOk: () => {
                            this.axios.post('/api/task/removetask', {
                                'taskId': this.data[index].taskId,
                            }).then((res) => {          // 任务全部删除成功，前端清空该行数据
                                console.log(res)
                                setTimeout(() => {
                                    this.data.splice(index, 1)
                                }, 1000);
                                this.$Message.success('成功删除该爬虫任务！')
                            }).catch((error) => {
                                console.log(error)
                                this.$Message.info('任务删除失败，请重试！')
                            })
                        }
                    });
                });
            } else (
                this.$Message.info('请暂停该任务才能执行删除操作！')
            )
        },
        /**
         * 打开/关闭爬虫任务时，向服务器发送指令
         * @param {sting} taskId 后端爬虫任务编号
         * @param {sting} target 目标网站
         * @param {number} taskStatus 任务状态，1-执行中，0-暂停
         * @param {sting} taskGroup 前端分组显示编号
         */
        ifOpen ($event, row, index) {
            console.log($event, row, index)
            // this.Bus.emit('addTask', 'task 4')
            let extent = ''
            if ($event == 0) {      // 关闭开关，暂停该行所有任务
                this.axios.post('/api/task/stopcrawler', {
                    'username': this.username,
                    'taskId': this.data[index].taskId,
                    'taskGroup': this.data[index].taskGroup,
                }).then((res) => {         // 获取暂停成功的任务
                    this.getNotice('爬虫任务暂停请求成功，请耐心等待15秒！', 15)
                    setTimeout(() => {
                        this.getList()
                    }, 15000);
                }).catch((error) => {
                    console.log(error)
                    this.getNotice('爬虫任务暂停请求出错，请重试！', 3)
                    this.getList()
                })
            } else {                // 打开开关，开启该行所有任务
                if (this.editIndex != index) {
                    this.axios.post('/api/task/startcrawler', {
                        'username': this.username,
                        'taskId': this.data[index].taskId,
                        'taskGroup': this.data[index].taskGroup,
                    }).then((res) => {     // 获取开启成功的任务
                        if (res.data.code == 200) {
                            this.getNotice('爬虫任务启动请求成功，请耐心等待15秒！', 15)
                            setTimeout(() => {
                                this.getList()
                            }, 15000);
                        } else {
                            this.$Message.warning(res.data.msg)
                        }
                    }).catch((error) => {
                        console.log(error)
                        this.getNotice('爬虫任务启动请求出错，请重试！', 3)
                        this.getList()
                    })
                } else {
                    this.$Message.error('请保存修改配置后再开启任务')
                }
            }
        },
        /**
         * 数据加密，
         */
        syncClick () {
            this.axios.get('/api/data/sync').then((res) => {
                this.$Message.success('同步成功！')
            }).catch((error) => this.$Message.error('同步失败！请重试。'))
        }
    },

    watch: {
        /**
         * 监听搜索分类选项
         */
        searchKey (val) {
            console.log(val)
        },
        /**
         * 当输入关键词搜索清空时，显示原列表所有数据
         */
        searchValue (val) {
            if (val == '') {
                this.data = this.dataAll
                console.log(this.dataAll)
            }
        }
    },

    filters: {
        createTime: function (value) {
            const year = value.substring(0,4)
            const month = value.substring(4,6)
            const day = value.substring(6,8)
            return year + '.' + month + '.' + day
        }
    }
}
