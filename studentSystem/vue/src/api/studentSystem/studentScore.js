import req from '@/utils/req';

// 获取所有学生成绩
export const reqStudentScoreAll = () => req.get('/score/findAllStudentScore')

// 获取分页查询后的学生成绩 接口： /score/findPageStudentScore?currentPage={currentPage}&limit={limit}
export const reqFindPageStudentScore = (currentPage,limit) => req.get(`/score/findPageStudentScore?currentPage=${currentPage}&limit=${limit}`)

// 根据学号获取成绩 接口： /score/findStudentNumber?studentNumber={studentNumber}
export const reqFindStudentNumber = (studentNumber) => req.get(`/score/findStudentNumber?studentNumber=${studentNumber}`)

// 根据课程和分数查询成绩 接口：/score/findStudentSubjectScore?subject={subject}&score={score}
export const reqFindStudentSubjectScore = (subject,score) => req.get(`/score/findStudentSubjectScore?subject=${subject}&score=${score}`)

// 添加和修改成绩 接口：登录：/score/addStudentScore ------------ 修改：/score/updateStudentScore
export const reqAddOrUpdateStudentScore = (scoreInfo) => {
  if(scoreInfo.studentNumber){
    return req.post('/score/updateStudentScore',scoreInfo)
  }else{
    return req.post('/score/addStudentScore',scoreInfo)
  }
}

// 删除单个成绩 接口： /score/deleteStudentScore?scoreId={scoreId}
export const reqDeleteStudentScore = (studentId) => req.delete(`/score/deleteStudentScore?studentId=${studentId}`)

// 批量删除成绩 接口： /score/batchDeleteStudentScore?scoreId={scoreId}
export const reqBatchDeleteStudentScore = (studentIdArr) => req.delete(`/score/batchDeleteStudentScore?studentIdArr=${studentIdArr}`)

// 学生增加选课
export const reqAddStudentCourse = (courseId) => req.post(`/score/addStudentCourse`,courseId)

// 删除学生选课
export const reqDelStudentCourse = (courseId) => req.post(`/score/delStudentCourse`,courseId)
