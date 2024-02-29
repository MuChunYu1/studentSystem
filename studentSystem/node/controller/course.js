const Mysql = require('../model/db')

class Course {
  // 查询所有课程
  async findAllCourse(req, res) {
    let sqlStr = "select * from course"
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

  // 分页查询
  async findPageCourse(req, res) {
    let limit = parseInt(req.query.limit)
    let currentPage = parseInt(req.query.currentPage)
    // 当最后一条删除后 currentPage - 1 * limit  === 负数
    if (currentPage < 1) currentPage = 1
    // 统计数量 Sql
    let sqlStr = `select count(*) as total from course`
    // 因为分页中是以 0 开始查询，所以减一，
    // 公式： 当前页 * 页面展示数量
    let data = [(currentPage - 1) * limit, limit]
    let findResult = await Mysql.base(sqlStr, data)
    // 捕获错误： 作用不让程序停止执行
    try {
      // 分页查询 
      let sqlTotal = `select * from course limit ?,?`
      // 操作 mysql
      let result = await Mysql.base(sqlTotal, data)
      // 调用方法
      // if(result.length !== 0){
      res.status(200).json({
        code: 200,
        message: 'ok',
        data: result,
        currentPage,
        limit,
        total: findResult[0].total
      })
      // }
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: '查询数据返回错误'
      })
    }
  }
  // 增加课程
  async addCourse(req, res) {
    let { courseId, course, xf, teacher } = req.body
    // 定义 SQL 语句　
    let sqlStr = `select * from course where courseId = '${courseId}'`
    let sql = 'insert into course(courseId, course, xf, teacher) values(?,?,?,?)'
    // 定义携带参数,
    let data = [courseId, course, xf, teacher]
    // 查询数据 sql
    let result = await Mysql.base(sqlStr)
    // 判断id是否已经存在
    if (result.length === 0) {
      // 添加数据 sql
      let addResult = await Mysql.base(sql, data)
      if (addResult.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: '添加成功',
        })
      }
    } else {
      res.status(201).json({
        code: 201,
        message: '添加失败，课程已存在'
      })
    }
  }
  // 修改课程
  async updateCourse(req, res) {
    let { courseId, course, xf, teacher } = req.body
    let sqlStr = `update course set course=?,xf=?,teacher=? where courseId = ?`
    let data = [course, xf, teacher, courseId]
    try {
      let result = await Mysql.base(sqlStr, data)
      if (result.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: '修改成功',
        })
      } else {
        // 此语句只有在postman里面没有此课程时 才会触发此语句
        res.status(201).json({
          code: 201,
          message: `修改失败,无此课程`
        })
      }
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: `修改失败，${error.message}`,
      })
    }
  }
  // 删除课程
  async deleteCourse(req, res) {
    let { courseId } = req.query
    let sqlStr = `delete from course where courseId = '${courseId}'`
    try {
      let result = await Mysql.base(sqlStr)
      if (result.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: '删除成功',
        })
      }
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: `删除失败，${error.message}`,
      })
    }
  }
  // 批量删除课程
  async batchDeleteCourse(req, res) {
    let courseIdArr = req.query.courseIdArr.split(',');
    let courseIdStr = courseIdArr.map(item => `'${item}'`).join(',');
    let sqlStr = `delete from course where courseId IN(${courseIdStr})`
    console.log(sqlStr);
    try {
      let result = await Mysql.base(sqlStr)
      console.log(result);
      if (result.affectedRows >= 1) {
        res.status(200).json({
          code: 200,
          message: '批量删除成功'
        })
      }
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: '批量删除失败'
      })
    }
  }
  // 根据课程名查询
  async findCourse(req, res) {
    let { course } = req.query
    let sqlStr = `SELECT * FROM course WHERE course LIKE '%${course}%' `
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
        message: '无此课程',
      })
    }
  }
}

// 将此构造函数暴露出去
module.exports = new Course