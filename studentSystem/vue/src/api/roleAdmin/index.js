import req from '@/utils/req';

// 获取角色信息
export const reqFindRole = () => req.get('/role/findRole')

// 更新角色
export const reqUpdateAuth = (roles,roleId) => {
  // console.log(roles,roleId)
  return req.put('/role/updateAuth',{roles,roleId})
}

// 删除角色
export const reqDeleteRole = (roleId) => req.delete(`/role/deleteRole?roleId=${roleId}`)