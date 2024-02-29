import req from '@/utils/req';

// 管理员修改密码
export const reqUpdateStudentPassword = (studentNumber, password) => req.post('/stu/updateStudentPassword',{studentNumber, password})
// 获取所有学生用户数据
export const reqFindAllStudentAccount = () => req.get(`/stu/findAllStudentAccount`)
// 请求分页后的用户数据
export const reqFindStudentAccountLimit = (currentPage,limit) => req.get(`/stu/findStudentAccountLimit?currentPage=${currentPage}&limit=${limit}`)
// 根据账户名查询账户
export const reqFindStudentAccount = (userAccount) => req.get(`/stu/findStudentAccount?accountName=${userAccount}`)