const express = require('express')
const studentSystem = require('../controller/studentSystem');

const router = express.Router()

// 查询所有学生
router.get('/findAllStudentInfo',studentSystem.findAllStudentInfo)

// 根据姓名查询学生
router.get('/findStudentNameInfo',studentSystem.findStudentNameInfo)

// 根据学号查询学生
router.get('/findStudentNumberInfo',studentSystem.findStudentNumberInfo)

// 添加学生
router.post('/addStudentInfo',studentSystem.addStudent)

// 修改学生
router.put('/updateStudentInfo',studentSystem.updateStudent)

// 删除学生
router.delete('/deleteStudentInfo',studentSystem.deleteStudent)

// 批量删除学生
router.delete('/batchDeleteStudentInfo',studentSystem.batchDeleteStudent)

// 分页查询
router.get('/findPageStudent',studentSystem.findPageStudent)

// 用于收集照片
router.post('/test',studentSystem.test)

module.exports = router