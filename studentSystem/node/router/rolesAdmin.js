const express = require('express')
const rolesAdmin = require('../controller/rolesAdmin')
const router = express.Router()

// 查询权限数据
router.get('/findRole',rolesAdmin.findRole)

// 更新权限数据
router.put('/updateAuth',rolesAdmin.updateAuth)

// 删除角色
router.delete('/deleteRole',rolesAdmin.deleteRole)

module.exports = router