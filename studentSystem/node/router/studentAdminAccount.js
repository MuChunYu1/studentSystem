const express = require('express')
const studentAdminAccount = require('../controller/studentAdminAccount')
const router = express.Router()

// 登录接口
router.post('/login', studentAdminAccount.login)
// 注册接口
router.post('/register', studentAdminAccount.register)
// 修改密码接口
router.post('/editPassword', studentAdminAccount.editPassword)
// 获取所有用户信息
router.get('/findAllUserAccount', studentAdminAccount.findAllUserAccount)
// 分页后的用户信息
router.get('/findAccount', studentAdminAccount.findAccount)
// 添加账户
router.post('/addAccount', studentAdminAccount.addAccount)
// 修改账户
router.put('/updateAccount', studentAdminAccount.updateAccount)
// 删除账户
router.delete('/deleteAccount', studentAdminAccount.deleteAccount)
// 删除选中账户
router.delete('/batchDeleteAccount', studentAdminAccount.batchDeleteAccount)
// 根据账号名查询账户
router.get('/findUserAccount', studentAdminAccount.findUserAccount)


module.exports = router