const Mysql = require('../model/db')

class Message {
  // 查询所有信息
  async findAllMessage(req, res) {
    let sqlStr = "select * from message"
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
  async findPageMessage(req, res) {
    let limit = parseInt(req.query.limit)
    let currentPage = parseInt(req.query.currentPage)
    // 当最后一条删除后 currentPage - 1 * limit  === 负数
    if (currentPage < 1) currentPage = 1
    // 统计数量 Sql
    let sqlStr = `select count(*) as total from message`
    // 因为分页中是以 0 开始查询，所以减一，
    // 公式： 当前页 * 页面展示数量
    let data = [(currentPage - 1) * limit, limit]
    let findResult = await Mysql.base(sqlStr, data)
    // 捕获错误： 作用不让程序停止执行
    try {
      // 分页查询 
      let sqlTotal = `select * from message limit ?,?`
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
  // 增加信息
  async addMessage(req, res) {
    let { userId,userName, issue, detail } = req.body
    // 定义 SQL 语句　
    let sql = 'insert into message(userId,userName, issue, detail,createTime) values(?,?,?,?,NOW())'
    // 定义携带参数,
    let data = [userId,userName, issue, detail]
    // 添加数据 sql
    let addResult = await Mysql.base(sql, data)
    if (addResult.affectedRows === 1) {
      res.status(200).json({
        code: 200,
        message: '添加成功',
      })
    } else {
      res.status(201).json({
        code: 201,
        message: '添加失败'
      })
    }
  }
  // 修改信息
  async updateMessage(req, res) {
    let { userId, messageId } = req.body
    let sqlStr = `update message set state=1 where userId = ? and messageId = ?`
    let data = [userId, messageId]
    try {
      let result = await Mysql.base(sqlStr, data)
      if (result.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: '处理完成',
        })
      } else {
        // 此语句只有在postman里面没有此信息时 才会触发此语句
        res.status(201).json({
          code: 201,
          message: `修改失败,无此信息`
        })
      }
    } catch (error) {
      res.status(201).json({
        code: 201,
        message: `修改失败，${error.message}`,
      })
    }
  }
  // 删除信息
  async deleteMessage(req, res) {
    let { messageId, userId } = req.query
    let sqlStr = `delete from message where messageId = '${messageId}'`
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
  // 批量删除信息
  async batchDeleteMessage(req, res) {
    let { messageIdArr } = req.query
    let sqlStr = `delete from message where messageId in(${messageIdArr})`
    try {
      let result = await Mysql.base(sqlStr)
      console.log(result,'--');
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
  // 根据类型查询
  async findMessage(req, res) {
    let { issue } = req.query
    let sqlStr = `SELECT * FROM message WHERE issue LIKE '%${issue}%' `
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
        message: '无此信息',
      })
    }
  }
  // 根据状态查询
  async findStateMessage(req, res) {
    let { state } = req.query
    let sqlStr = `SELECT * FROM message WHERE state LIKE '%${state}%' `
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
        message: '无此信息',
      })
    }
  }
}

// 将此构造函数暴露出去
module.exports = new Message