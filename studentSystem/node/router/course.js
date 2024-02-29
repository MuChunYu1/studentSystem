const express = require('express');
const course = require('../controller/course')

const router = express.Router()
// 查询所有课程
router.get('/findAllCourse',course.findAllCourse)

// 分页查询
router.get('/findPageCourse',course.findPageCourse)

// 添加课程
router.post('/addCourse', course.addCourse)
// 修改课程
router.put('/updateCourse', course.updateCourse)
// 删除课程
router.delete('/deleteCourse', course.deleteCourse)
// 删除选中课程
router.delete('/batchDeleteCourse', course.batchDeleteCourse)
// 根据课程号查询课程
router.get('/findCourse', course.findCourse)

module.exports = router