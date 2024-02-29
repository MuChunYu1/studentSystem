
// 引入数据库
const Mysql = require('../model/db');
const jwt = require('jsonwebtoken');

class User {
  // 登录业务
  async login(req, res) {
    let { userName, userPassword } = req.body
    // 定义 SQL 语句　
    let sqlStrAdmin = `select userName, userPassword from studentAdminAccount where id = ? and userPassword = ?`
    let sqlStrStudent = `select studentNumber, password from studentInfo where studentNumber = ? and password = ?`
    // 定义携带参数
    let data = [userName, userPassword]
    try {
      // 查询数据库
      let resultAdmin = await Mysql.base(sqlStrAdmin, data)
      let resultStudent = await Mysql.base(sqlStrStudent, data)
      // 定义 token
      let str = 'zhe shi yi ge jia mi mi yao'
      // 尽量不携带密码
      let token = jwt.sign({ userName }, str, { expiresIn: '40s' });
      // 查看数据库是否有该数据 有登录成功（同时携带token），反之登录失败
      if (resultAdmin.length !== 0 || resultStudent.length !== 0) {
        res.status(200).send({
          code: 200,
          message: '登录成功',
          token
        })
      } else {
        res.status(201).send({
          code: 201,
          message: '登录失败，账号或密码错误',
        })
      }
    } catch (error) {
      res.status(201).send({
        code: 201,
        message: '登录失败，此账号不存在',
      })
    }
  }
  // 注册业务
  async register(req, res) {
    let { userName, userPassword } = req.body
    // 定义 SQL 语句　
    let sqlStrAdmin = `select * from studentAdminAccount where userName = '${userName}'`
    let sqlAdmin = 'insert into studentAdminAccount(userName,userPassword) values(?,?)'
    // 定义携带参数
    let data = [userName, userPassword]
    // 查询数据 sql
    let resultAdmin = await Mysql.base(sqlStrAdmin)
    // console.log(result)
    if (resultAdmin.length === 0) {
      // 添加数据 sql
      let addResultAdmin = await Mysql.base(sqlAdmin, data)
      // 当添加成功 影响一行时
      if (addResultAdmin.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: '注册成功',
        })
      }
    } else {
      res.status(201).json({
        code: 201,
        message: '注册失败，账户已存在'
      })
    }
  }
  // 修改密码
  async editPassword(req, res) {
    /*
      1、查询数据是否有此账户，
      2、有则进行下一步修改，
      3、无则返回用户账号不存或旧密码错误
    */
    let { userName, oldPassword, newPassword } = req.body
    let userSqlAdmin = `select * from studentAdminAccount where userName = ? and userPassword = ?`
    let userResultAdmin = await Mysql.base(userSqlAdmin, [userName, oldPassword])
    let userSqlStudent = `select * from studentInfo where studentNumber = ? and password = ?`
    let userResultStudent = await Mysql.base(userSqlStudent, [userName, oldPassword])
    if (userResultAdmin.length !== 0) {
      // 查询到的数据返回已数组形式展示
      let idAdmin = userResultAdmin[0].id;
      let editStrAdmin = `update studentAdminAccount set userPassword = ? where id = ?`
      let editResultAdmin = await Mysql.base(editStrAdmin, [newPassword, idAdmin])
      if (editResultAdmin.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: '修改成功'
        })
      }
    } else if (userResultStudent.length !== 0) {
      let idStudent = userResultStudent[0].studentId;
      let editStrStudent = `update studentInfo set password = ? where studentId = ?`
      let editResultStudent = await Mysql.base(editStrStudent, [newPassword, idStudent])
      if (editResultStudent.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: '修改成功'
        })
      }
    } else {
      res.status(201).json({
        code: 201,
        message: '用户不存在或旧密码输入错误'
      })
    }
  }
  // 查询所有账户
  async findAllUserAccount(req, res) {
    let sqlStr = `select id,userName,userPassword,roles from studentAdminAccount`
    let result = await Mysql.base(sqlStr)
    res.status(200).json({
      code: 200,
      message: 'ok',
      data: result
    })
  }
  // 查询分页后的用户
  async findAccount(req, res) {
    let currentPage = parseInt(req.query.currentPage)
    let limit = parseInt(req.query.limit)
    if (currentPage <= 1) currentPage = 1
    let sql = `select id,userName,userPassword,roles from studentAdminAccount `
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
  // 增加用户
  async addAccount(req, res) {
    let { id, userName, userPassword } = req.body
    // roles 接收的是数组， 往mysql里面加的时候必须转字符串（如果数组里面只有一个值，则直接可以添加）
    let roles = req.body.roles.join(',')
    // 定义 SQL 语句　
    let sqlStr = `select * from studentAdminAccount where id = '${id}'`
    let sql = 'insert into studentAdminAccount(id,userName,userPassword,roles) values(?,?,?,?)'
    // 定义携带参数
    let data = [id, userName, userPassword, roles]
    // 查询数据 sql
    let result = await Mysql.base(sqlStr)
    // 判断id是否已经存在
    if (result.length === 0 ) {
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
        message: '添加失败，账户已存在'
      })
    }
  }
  // 修改账户
  async updateAccount(req, res) {
    let { id, userName, userPassword } = req.body
    // 此处使用 join(',') 将数组转字符串后 第一个元素也会产生一个 ,号， 此时使用 substring 方法从索引为 1 的开始
    let roles = req.body.roles.join(',')
    roles[0] === ',' ? roles = roles.substring(1) : roles = roles
    // console.log(roles)
    // let a = req.body.roles.join(',').substring(1)
    let sqlStr = `update studentAdminAccount set userName=?,userPassword=?,roles = ? where id = ?`
    let data = [userName, userPassword, roles, id]
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
  // 删除账户
  async deleteAccount(req, res) {
    let { userId } = req.query
    let sqlStr = `delete from studentAdminAccount where id = '${userId}'`
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
  // 批量删除账户
  async batchDeleteAccount(req, res) {
    let userIdArr = req.query.userIdArr
    let sqlStr = `delete from studentAdminAccount where id in(${userIdArr})`
    try {
      let result = await Mysql.base(sqlStr)
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
  // 根据账户名查询
  async findUserAccount(req, res) {
    let { accountName } = req.query
    let sqlStr = `SELECT id, userName, userPassword, roles FROM studentAdminAccount WHERE id = '${accountName}'
    UNION 
    SELECT studentNumber , studentName, password, roles FROM studentInfo WHERE studentNumber = '${accountName}' `
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
  
}

module.exports = new User()