const express = require('express')
const studentAccount = require('../controller/studentAccount')
const router = express.Router()

// 管理员修改密码接口
router.post('/updateStudentPassword', studentAccount.updateStudentPassword)
// 获取所有学生用户信息
router.get('/findAllStudentAccount', studentAccount.findAllStudentAccount)
// 分页后的用户信息
router.get('/findStudentAccountLimit', studentAccount.findStudentAccountLimit)
// 根据账号名查询账户
router.get('/findStudentAccount', studentAccount.findStudentAccount)


module.exports = router