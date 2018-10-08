# 分布式任务系统

> 实现分布式的checklist，实现workspace, taskgroup, task, member的操作，实现分布式操作记录任务，集中式通知显示任务进度和状态的功能，因为往往在工作中，个人会完成自己的事情，最后需要被汇报给上级。

### 客户端(命令)

##### 设置 (`gask config`)

默认打印出所有的配置，可以使用`gask config get <key>`设置某一个key的值，使用`gask config set <key> <value>`来设置某个key的值,可以设置的key有

.....

##### login (`gask login`)

登录某个远程，只有登录某个远程，才能获取这个远程的某个workspace信息, 如果没有信息则注册

- [ ] 输入账号
- [ ] 输入密码
- [ ] 输入邮箱
- [ ] 将登录信息和账号信息存储

##### 创建workspace (`gask init <name>`)

- [ ] 为workspace命名
- [ ] 如果远程不唯一需要选择一个远程
- [ ] 为workspace创建一个标识码

##### 创建taskgroup (`gask tg create`)

##### 完成taskgroup (`gask tg achive`)

##### 删除taskgroup (`gask tg delete`)

##### 创建任务 (`gask task create`)

##### 移动任务 (`gask task move`)

##### 删除任务 (`gask task delete`)

##### 完成任务 (`gask task achive`)

##### 分配任务 (`gask task asign`)

### 服务端
