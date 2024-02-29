// 引入操作数据库文件
const Mysql = require('../model/db');
const Images = require("images");

// 封装 添加和修改方法
function addOrUpdate(res,result,successMeg,errMeg){
  if(result.affectedRows > 0){
    res.status(200).json({
      code:200,
      message:`${successMeg}`
    })
  }else{
    res.status(201).json({
      code:201,
      message:`${errMeg}`
    })
  }
}
// 封装 学生查询方法
function findStudent(res,result,msg){
  if(result.length !== 0){
    res.status(200).json({
      code:200,
      message:'ok',
      data:result
    })
  }else{
    res.status(201).json({
      code:201,
      message:msg
    })
  }
}

class StudentSystem{
  // 查询所有学生
  async findAllStudentInfo(req,res){
    let sqlStr = "select * from studentInfo"
    let result = await Mysql.base(sqlStr)
    if(result.length !== 0){
      res.status(200).json({
        code:200,
        message:'ok',
        data:result
      })
    }else{
      res.status(201).json({
        code:201,
        message:'请求失败'
      })
    }
  }

  // 根据姓名查询学生信息
  async findStudentNameInfo(req,res){
    let {studentName} = req.query
    let sqlStr = `select * from studentInfo where studentName like "%${studentName}%"`
    let result = await Mysql.base(sqlStr)
    findStudent(res,result,'查询失败，此学生不存在或已删除')
  }

  // 根据学号查询学生信息
  async findStudentNumberInfo(req,res){
    let {studentNumber} = req.query
    let sqlStr = `select * from studentInfo where studentNumber = ${studentNumber}`
    let result = await Mysql.base(sqlStr)
    findStudent(res,result,'查此学号不存在，请重新输入')
  }

  // 添加学生
  async addStudent(req,res){
    // 获取用户传递过来的数据
    let {studentName,sex,studentTel,department,className,major,studentNumber,studentQQ,region,grade} = req.body
    let studentPhoto = req.body.studentPhoto || null
    let sql = `
    insert into studentInfo(studentPhoto,studentName,sex,studentTel,department,className,major,studentNumber,studentQQ,region,grade,roles,password) values
    (?,?,?,?,?,?,?,?,?,?,?,'学生','112233')
    `
    let sqlStr = `select * from studentInfo where studentNumber = '${studentNumber}'`
    // 查询数据 sql
    let result = await Mysql.base(sqlStr)
    let data = [studentPhoto,studentName,sex,studentTel,department,className,major,studentNumber,studentQQ,region,grade] 
    if(result.length === 0){
      let addResult = await Mysql.base(sql, data)
      if (addResult.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: '添加成功',
        })
      }
    }   else {
      res.status(201).json({
        code: 201,
        message: '添加失败，账户已存在'
      })
    }
    // 捕获错误： 作用不让程序停止执行
   /*  try {
      // 操作 mysql
      let result = await Mysql.base(sql,data)
      // 调用方法
      addOrUpdate(res,result,'添加成功')
    } catch (error) {
      res.status(201).json({
        code:201,
        message: '添加失败，学号已存在'
      })
    } */
  }

  // 修改学生
  async updateStudent(req,res){
    let {studentName,sex,studentTel,department,className,major,studentNumber,studentQQ,studentId,region,grade} = req.body
    let sqlStr = `
      update studentInfo set studentPhoto=?, studentName=?,sex=?, studentTel=?,department=?,className=?,major=?,studentNumber=? ,studentQQ=?,region=?,grade=? where studentId = ?
    `
    let studentPhoto = req.body.studentPhoto || null
    let data = [studentPhoto,studentName,sex,studentTel,department,className,major,studentNumber,studentQQ,region,grade,studentId]
    // 捕获错误： 作用不让程序停止执行
    try {
      // 操作 mysql
      let result = await Mysql.base(sqlStr,data)
      // 调用方法
      addOrUpdate(res,result,'修改成功')
    } catch (error) {
      res.status(201).json({
        code:201,
        message:'修改失败'
      })
    }
  }

  // 软删除学生
  // async deleteStudent(req,res){
  //   let {studentId} = req.query
  //   let sqlStr = `update studentInfo set state = 1 where studentId = ?`
  //   // 捕获错误： 作用不让程序停止执行
  //   try {
  //     // 操作 mysql
  //     let result = await Mysql.base(sqlStr,data)
  //     // 调用方法
  //     addOrUpdate(res,result,'删除')
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // 删除学生
  async deleteStudent(req,res){
    let {studentId} = req.query
    let sqlStr = `delete from studentInfo where studentId = ?`
    // 捕获错误： 作用不让程序停止执行
    try {
      // 操作 mysql
      let result = await Mysql.base(sqlStr,studentId)
      // 调用方法
      addOrUpdate(res,result,'删除成功')
    } catch (error) {
      res.status(201).json({
        code:201,
        message:'删除失败，请联系管理员'
      })
    }
  }

  // 批量删除学生
  async batchDeleteStudent(req,res){
    let studentIdArr = req.query.studentIdArr.split(',')
    let sqlStr = `delete from studentInfo where studentId in(${studentIdArr})`
    try {
      let result = await Mysql.base(sqlStr)
      addOrUpdate(res,result,'批量删除成功')
    } catch (error) {
      res.status(201).json({
        code:201,
        message: '批量删除失败,请选择需要删除得数据'
      })
    }
  }

  // 分页查询
  async findPageStudent(req,res){
    let limit = parseInt(req.query.limit)
    let currentPage = parseInt(req.query.currentPage)
    // 当最后一条删除后 currentPage - 1 * limit  === 负数
    if(currentPage < 1) currentPage = 1
    // 统计数量 Sql
    let sqlStr = `select count(*) as total from studentInfo`
    // 因为分页中是以 0 开始查询，所以减一，
    // 公式： 当前页 * 页面展示数量
    let data = [(currentPage-1)*limit,limit]
    let findResult = await Mysql.base(sqlStr,data)
    // 捕获错误： 作用不让程序停止执行
    try {
      // 分页查询 
      let sqlTotal = `select * from studentInfo limit ?,?`
      // 操作 mysql
      let result = await Mysql.base(sqlTotal,data)
      // 调用方法
      // if(result.length !== 0){
        res.status(200).json({
          code:200,
          message: 'ok',
          data:result,
          currentPage,
          limit,
          total:findResult[0].total
        })
      // }
    } catch (error) {
      // 初步认为 只有currentPage小于一的时候 才会报错
      // if(currentPage < 1) currentPage = 1，前面处理做了这条语句所以一直不会报错， 这条语句就先放这里
      res.status(201).json({
        code:201,
        message:'查询数据返回错误'
      })
    }
  }

  // 测试
  test(req,res){
    res.send('tupian')
  }
}

module.exports = new StudentSystem

