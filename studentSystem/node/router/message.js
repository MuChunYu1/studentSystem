const express = require('express');
const message = require('../controller/message')

const router = express.Router()
// 查询所有信息
router.get('/findAllMessage',message.findAllMessage)

// 分页查询
router.get('/findPageMessage',message.findPageMessage)

// 添加信息
router.post('/addMessage', message.addMessage)

// 修改信息
router.put('/updateMessage', message.updateMessage)

// 删除信息
router.delete('/deleteMessage', message.deleteMessage)

// 删除选中信息
router.delete('/batchDeleteMessage', message.batchDeleteMessage)

// 根据类型查询信息
router.get('/findMessage', message.findMessage)

// 根据状态查询信息
router.get('/findStateMessage', message.findStateMessage)

module.exports = router