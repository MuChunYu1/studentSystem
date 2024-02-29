// 引入数据库
const Mysql = require('mysql')


// 连接数据库
let db = Mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'studentSystem',
  timezone: '08:00', // 解决mysql时区不一致问题
})

// 建立联系
db.connect()

function base(sql, data, callback) {
  return new Promise((resolve, reject) => {
    db.query(sql, data, (err, result) => {
      if (err) {
        return reject(new Error(`SQL语法错误,${err.message}`))
      } else{
        resolve(result)
      }
    })
  })
}

module.exports = {
  base
}


  // 操作数据库
  // let sqlStr = 'insert into user (userName,password) values(?,?)'
  // let sqlStr = 'delete from user where id = ?'
  // let sqlStr = 'update user set userName = "www" where id = ?'
  // let sqlStr = 'select * from user where userName = "aaa" and password = "aaaaaa"'

  // 插入字段
  // let sqlStr = 'alter table user modify column state int not null default 0'
  // let sqlStr = 'alter table user drop column state'


  // 标记删除 （因使用 delete 太危险了 直接了把数据删没了）每个字段顶一个 state， 0：存在， 1： 表示删除
  // 使用 update...set...where更新SQL
  // let sqlStr = "update _user set state = ? where id = ?"
  // let data = [1,2]

// exports.base = function (sqlStr,data,callback) {
  // db.query(sqlStr, data, (err, result) => {
  //   if(result.affectRows)
  //   console.log(result)
  //   callback(err,result)
  // })
//   // 关闭数据库
//   // db.end()
// }

// module.exports = db

// module.exports = {
//   base
// }
