const Mysql = require('../model/db');

class RolesAdmin{
  // 查询所有权限数据
  async findRole(req,res){
    let sqlStr = `select * from studentRoleAdmin`
    let result = await Mysql.base(sqlStr)
    if(result.length !== 0){
      res.status(200).json({
        code:200,
        message:'ok',
        data:result
      })
    }
  }
  // 更新权限
  async updateAuth(req,res){
    let {roles,roleId} = req.body
    let sqlStr = `update studentRoleAdmin set roles=? where roleId = ${roleId}`
    let data = [roles.join(',')]
    try {
      let result = await Mysql.base(sqlStr,data)
      console.log(result)
      if(result.affectedRows === 1){
        res.status(200).json({
          code:200,
          message:'更新成功'
        })
      }
    } catch (error) {
      res.status(201).json({
        code:201,
        message:`更新失败,${error.message}`
      })
    }
  }
  // 删除角色
  async deleteRole(req,res){
    let {roleId} = req.query
    let sqlStr = `delete from studentRoleAdmin where roleId = ${roleId}`
    try {
      let result = await Mysql.base(sqlStr)
      if(result.affectedRows === 1){
        res.status(200).json({
          code:200,
          message:'删除成功'
        })
      }else{
        res.status(201).json({
          code:201,
          message:'删除失败,无此用户'
        })
      }
    } catch (error) {
      res.status(201).json({
        code:201,
        message:'删除失败'
      })
    }
  }
}

module.exports = new RolesAdmin()