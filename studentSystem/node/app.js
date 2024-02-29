const express = require('express');

// 引入 cors 跨域
const cors = require('cors');
// 引入路由
const router = require('./router')
// 注册 express
const app = express()

// 使用跨域
app.use(cors())

// 获取 post 请求 body 参数
app.use(express.urlencoded({ extended: false }))
// 允许使用 json 
app.use(express.json())

// 使用路由 并且访问时必须加前缀  '/api/user'
app.use('/api/admin',router.studentAdminAccount)
app.use('/api/role',router.rolesAdmin)
app.use('/api/student',router.studentSystem)
app.use('/api/score',router.studentScore)
app.use('/api/stu',router.studentAccount)
app.use('/api/course',router.course)
app.use('/api/message',router.message)

// 开启服务
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})
