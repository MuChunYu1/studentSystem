import req from '@/utils/req';

// 用户登录 接口： 
export const reqUserLogin = (userName,userPassword) => req.post('/admin/login',{userName,userPassword})

// 用户注册
export const reqUserForget = (userName,userPassword) => req.post('/admin/forget',{userName,userPassword})

// 用户修改密码
export const reqUserEditPassword = (userName,oldPassword,newPassword) => req.post('/admin/editPassword',{userName,oldPassword,newPassword})


// 获取所有用户数据
export const reqFindAllUserAccount = () => req.get(`/admin/findAllUserAccount`)

// 请求分页后的用户数据
export const reqUserFindAccount = (currentPage,limit) => req.get(`/admin/findAccount?currentPage=${currentPage}&limit=${limit}`)

/* // 添加或修改账户
export const reqAddOrUpdateUserAccount = (userInfo) => {
  if(userInfo.id){
    return req.put('/admin/updateAccount',userInfo)
  }else{
    return req.post('/admin/addAccount',userInfo)
  }
} */
// 添加账户
export const reqAddUserAccount = (userInfo) => req.post('/admin/addAccount',userInfo)
// 修改账户
export const reqUpdateUserAccount = (userInfo) => req.put('/admin/updateAccount',userInfo)

// 删除账户
export const reqDeleteUserAccount = (userId) => req.delete(`/admin/deleteAccount?userId=${userId}`)

// 批量删除账户
export const reqBatchDeleteUserAccount = (userIdArr) => {
  return req.delete(`/admin/batchDeleteAccount?userIdArr=${userIdArr}`)
}

// 根据账号查询账户
export const reqFindUserAccount = (userAccount) => req.get(`/admin/findUserAccount?accountName=${userAccount}`)

