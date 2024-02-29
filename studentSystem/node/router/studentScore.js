const express = require('express');
const studentScore = require('../controller/studentScore')

const router = express.Router()
// 查询所有学生成绩
router.get('/findAllStudentScore',studentScore.findAllStudentScore)

// 分页查询所有学生成绩
router.get('/findPageStudentScore',studentScore.findPageStudentScore)

// 根据学号查找成绩
router.get('/findStudentNumber',studentScore.findStudentNumber)

// 根据课程查找不及格成绩 findStudentSectionScore
// router.get('/findStudentFailScore',studentScore.findStudentFailScore)

// 根据课程和分数查找成绩 
router.get('/findStudentSubjectScore',studentScore.findStudentSubjectScore)

// 添加学生成绩
router.post('/addStudentScore',studentScore.addStudentScore)

// 修改学生成绩
router.post('/updateStudentScore',studentScore.updateStudentScore)

// 删除学生成绩
router.delete('/deleteStudentScore',studentScore.deleteStudentScore)

// 批量删除学生成绩
router.delete('/batchDeleteStudentScore',studentScore.batchDeleteStudentScore)

// 增加选课
router.post('/addStudentCourse',studentScore.addStudentCourse)
// 删除学生选课
router.post('/delStudentCourse',studentScore.delStudentCourse)

module.exports = router