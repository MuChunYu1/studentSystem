import req from '@/utils/req';

// 获取所有学生信息 接口：http://127.0.0.1:3000/api/findAllStudentInfo
export const reqStudentInfoAll = () => req.get('/student/findAllStudentInfo')

// 根据姓名获取学生信息
export const reqFindStudentNameInfo = (studentName) => req.get(`/student/findStudentNameInfo?studentName=${studentName}`)

// 根据学号获取学生信息
export const reqFindStudentNumberInfo = (studentNumber) => req.get(`/student/findStudentNumberInfo?studentNumber=${studentNumber}`)


// 修改学生 接口：http://127.0.0.1:3000/api/updateStudentInfo
export const reqUpdateStudent = (studentInfo) =>  req({url:'/student/updateStudentInfo',method:'put',data:studentInfo})
// 添加学生 接口：http://127.0.0.1:3000/api/addStudentInfo
export const reqAddStudent = (studentInfo) =>req({url:'/student/addStudentInfo',method:'post',data:studentInfo})

// 删除学生 接口：http://127.0.0.1:3000/api/deleteStudentInfo?studentId={studentId}
export const reqDeleteStudent = (studentId) => req.delete(`/student/deleteStudentInfo?studentId=${studentId}`)

// 批量删除学生 接口：http://127.0.0.1:3000/api/deleteStudentInfo?studentId={studentId}
export const reqBatchDeleteStudent = (studentIdArr) => req.delete(`/student/batchDeleteStudentInfo?studentIdArr=${studentIdArr}`)

// 分页查询 接口：http://127.0.0.1:3000/api/findPageStudent?currentPage={currentPage}&limit={limit}
export const reqFindPageStudent = (currentPage,limit) => req.get(`/student/findPageStudent?currentPage=${currentPage}&limit=${limit}`)
