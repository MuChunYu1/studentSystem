const Mysql = require('../model/db')

class StudentScore {
  // 查询所有学生成绩
  async findAllStudentScore(req, res) {
    let sqlStr = "select studentNumber,studentName,course.courseId,course,score from studentInfo,course,studentScore where studentInfo.studentNumber=studentScore.studentId and course.courseId=studentScore.courseId"
    let result = await Mysql.base(sqlStr)
    if (result.length !== 0) {

      res.status(200).json({
        code: 200,
        message: 'ok',
        data: result
      })
    } else {
      res.status(201).json({
        code: 201,
        message: '请求失败'
      })
    }
  }
  // 获取分页学生成绩
  async findPageStudentScore(req, res) {
    let currentPage = parseInt(req.query.currentPage)
    // 解决分页只有1页同时删除最后一条数据报警告问题
    // 当最后一条删除后 currentPage - 1 * limit  === 负数
    if (currentPage < 1) currentPage = 1
    let limit = parseInt(req.query.limit)
    // 统计所有学生数量
    let sqlStr = 'select count(*) as total from studentScore'
    let data = [(currentPage - 1) * limit, limit]
    // 查询返回的都是以数组形式展开
    try {
      let totalResult = await Mysql.base(sqlStr)
      let sqlLimit = 'select studentNumber,studentName,course,score from studentInfo,course,studentScore where studentInfo.studentNumber=studentScore.studentId and course.courseId=studentScore.courseId limit ?,?'
      let limitResult = await Mysql.base(sqlLimit, data)
      res.status(200).json({
        code: 200,
        message: 'ok',
        data: limitResult,
        currentPage,
        limit,
        total: totalResult[0].total
      })
      // }
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: `数据加载失败`,
      })
    }
  }
  // 根据学号查成绩
  async findStudentNumber(req, res) {
    let { studentNumber } = req.query
    let sqlStr = `select studentNumber,studentName,course,score,studentScore.courseId from studentInfo,course,studentScore where studentInfo.studentNumber=studentScore.studentId and course.courseId=studentScore.courseId and studentNumber ='${studentNumber}'`
    let result = await Mysql.base(sqlStr)
    if (result.length !== 0) {
      res.status(200).json({
        code: 200,
        message: 'ok',
        data: result
      })
    } else {
      res.status(201).json({
        code: 201,
        message: '无此学生信息',
      })
    }
  }
  // 查询不及格成绩
  // async findStudentFailScore(req,res){
  //   let {subject,score} = req.query
  //   let sqlStr = `select * from studentScore where ${subject} < ${score}`
  //   let result = await Mysql.base(sqlStr)
  //   if(result.length !== 0){
  //     res.status(200).json({
  //       code:200,
  //       message:'ok',
  //       data:result
  //     })
  //   }else{
  //     res.status(200).json({
  //       code:200,
  //       message:'此课程暂无低于此分数得学生',
  //     })
  //   }
  // }
  // 根据课程和分数查询成绩
  async findStudentSubjectScore(req, res) {
    let { subject, score } = req.query || undefined
    let result = void 0;
    // 当传递过来得分数大于 2 的时候 说明用户正在查找 某一区间 的学生
    // 当传递过来得分数小于 2 的时候 说明用户正在查找 >60 或 <60 的学生
    if (score.length > 2) {
      let scoreArr = score.split(',')
      console.log(subject);
      let sqlStr = `select studentNumber,studentName,course,score from studentInfo,course,studentScore where studentInfo.studentNumber=studentScore.studentId and course.courseId=studentScore.courseId and course.course='${subject}' and studentScore.score>= ${scoreArr[0]} and studentScore.score<= ${scoreArr[1]}`
      result = await Mysql.base(sqlStr)
    } else {
      let sqlStr = `select studentNumber,studentName,course,score from studentInfo,course,studentScore where studentInfo.studentNumber=studentScore.studentId and course.courseId=studentScore.courseId and course.course='${subject}' and studentScore.score< ${score}`
      result = await Mysql.base(sqlStr)
    }
    if (result.length !== 0) {
      res.status(200).json({
        code: 200,
        message: 'ok',
        data: result
      })
    } else {
      res.status(200).json({
        code: 200,
        message: '此课程暂无低于此分数得学生',
      })
    }

  }
  // 添加成绩
  async addStudentScore(req, res) {
    let { studentName, ps, ai, ae, html_css, javascript, node, vue } = req.body
    let sqlStr = `insert into studentScore(studentName,ps,ai,ae,html_css,javascript,node,vue) values ?`
    // 利用二维数组， 此时 sql value 只需一个占位符（？）即可 
    let data = [[studentName, ps, ai, ae, html_css, javascript, node, vue]]
    try {
      let result = await Mysql.base(sqlStr, [data])
      if (result.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: '添加成功',
        })
      }
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: `添加失败,${error.message}`,
      })
    }

  }
  // 修改成绩
  async updateStudentScore(req, res) {
    let { studentNumber, scores } = req.body
    let promises = [];
    for(let i = 0; i < scores.length; i++){
      let sqlStr = `update studentScore set score='${scores[i].value}' where studentScore.studentId='${studentNumber}' and studentScore.courseId='${scores[i].id}'`
      promises.push(Mysql.base(sqlStr));
    }
    try {
      let results = await Promise.all(promises);
      for (let result of results) {
        if (result.affectedRows !== 1) {
          res.status(201).json({
            code: 201,
            message: `修改失败,${error.message}`,
          })
          return;
        }
      }
      res.status(200).json({
        code: 200,
        message: '修改成功',
      })
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: `修改失败,${error.message}`,
      })
    }
  }
  // 删除成绩
  async deleteStudentScore(req, res) {
    let { studentId } = req.query
    let sqlStr = `delete from studentScore where studentId = ${studentId}`
    try {
      let result = await Mysql.base(sqlStr)
      if (result.affectedRows >= 1) {
        res.status(200).json({
          code: 200,
          message: '删除成功',
        })
      }
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: `删除失败,${error.message}`,
      })
    }
  }
  // 批量删除成绩
  async batchDeleteStudentScore(req, res) {
    let studentIdArr = req.query.studentIdArr.split(',')
    let sqlStr = `delete from studentScore where studentId in(${studentIdArr})`
    try {
      let result = await Mysql.base(sqlStr)
      if (result.affectedRows >= 1) {
        res.status(200).json({
          code: 200,
          message: '删除成功',
        })
      }
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: '批量删除失败,请选择需要删除得数据',
      })
    }
  }
  // 增加选课
  async addStudentCourse(req, res) {
    let { courseId,studentId } = req.body
    // 定义 SQL 语句　
    let sqlStr = `select * from studentScore where courseId = '${courseId}' and studentId = '${studentId}'`
    let sql = 'insert into studentScore(courseId,studentId,score) values(?,?,0)'
    // 定义携带参数
    let data = [courseId,studentId]
    // 查询数据 sql
    let result = await Mysql.base(sqlStr)
    // 判断id是否已经存在
    if (result.length === 0 ) {
      // 添加数据 sql
      let addResult = await Mysql.base(sql, data)
      if (addResult.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: '选课成功',
        })
      }
    } else {
      res.status(201).json({
        code: 201,
        message: '选课失败，课程已存在'
      })
    }
  }
  // 删除选课
  async delStudentCourse(req, res) {
    let { courseId,studentId } = req.body
    // 定义 SQL 语句　
    let sqlStr = `delete from studentScore where studentId = '${studentId}' and courseId = '${courseId}' `
    try {
      let result = await Mysql.base(sqlStr)
      if (result.affectedRows >= 1) {
        res.status(200).json({
          code: 200,
          message: '删除成功',
        })
      }
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: `删除失败,${error.message}`,
      })
    }
  }
}

// 将此构造函数暴露出去
module.exports = new StudentScore