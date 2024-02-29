// 引入数据库
const Mysql = require('../model/db');

class StudentAccount{
    // 查询所有账户
    async findAllStudentAccount(req, res) {
      let sqlStr = `select studentNumber, studentName, password, roles from studentInfo`
      let result = await Mysql.base(sqlStr)
      res.status(200).json({
        code: 200,
        message: 'ok',
        data: result
      })
    }
    // 查询分页后的用户
    async findStudentAccountLimit(req, res) {
      let currentPage = parseInt(req.query.currentPage)
      let limit = parseInt(req.query.limit)
      if (currentPage <= 1) currentPage = 1
      let sql = ` select studentNumber, studentName, password, roles from studentInfo`
      let total = await Mysql.base(`select COUNT(*)  from(${sql}) AS total`)
      let sqlStr = `(${sql}) limit ?,?`
      let data = [(currentPage - 1) * limit, limit]
  
      try {
        let result = await Mysql.base(sqlStr, data)
  
        res.status(200).json({
          code: 200,
          message: 'ok',
          data: result,
          currentPage,
          limit,
          total: total[0]['COUNT(*)']
        })
        // } 
      } catch (error) {
        res.status(201).json({
          code: 200,
          message: 'error'
        })
      }
    }
      // 根据账户名查询
  async findStudentAccount(req, res) {
    let { accountName } = req.query
    let sqlStr = ` SELECT studentNumber, studentName, password, roles FROM studentInfo WHERE studentNumber = '${accountName}' `
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
        message: '无此账户',
      })
    }
  }
  // 管理员更改学生密码
  async updateStudentPassword(req, res) {
    let { studentNumber, password } = req.body
    let sqlStr = `update studentInfo set password = ? where studentNumber = ?`
    let data = [password, studentNumber]
    try {
      let result = await Mysql.base(sqlStr, data)
      // console.log(result)
      if (result.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: '修改成功',
        })
      } else {
        // 此语句只有在postman里面没有此用户时 才会触发此语句
        res.status(201).json({
          code: 201,
          message: `修改失败,无此账户`
        })
      }
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: `修改失败，${error.message}`,
      })
    }
  }
 // 管理员修改密码
 async updatePa(req, res) {
  let { id,userPassword } = req.body
  let userSql = `select * from studentInfo where studentNumber = ? and password = ?`
  let userResult = await Mysql.base(userSql, [id, userPassword])
  if(userResult.length !== 0) {
    let idStudent = userResult[0].studentId;
    let editStr = `update studentInfo set password = ? where studentId = ?`
    let editResult = await Mysql.base(editStr, [userPassword, idStudent])
    if (editResult.affectedRows === 1) {
      res.status(200).json({
        code: 200,
        message: '修改成功'
      })
    }
  } else {
    res.status(201).json({
      code: 201,
      message: '修改失败'
    })
  }
}

}

module.exports = new StudentAccount