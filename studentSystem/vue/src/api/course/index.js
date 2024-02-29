import req from '@/utils/req';

// 获取所有课程
export const reqFindAllCourse = () => req.get('/course/findAllCourse')

// 获取分页查询后的课程 接口： /course/findPageCourse?currentPage={currentPage}&limit={limit}
export const reqFindPageCourse = (currentPage,limit) => req.get(`/course/findPageCourse?currentPage=${currentPage}&limit=${limit}`)

// 添加课程
export const reqAddCourse = (courseInfo) => req.post('/course/addCourse',courseInfo)
// 修改课程
export const reqUpdateCourse = (courseInfo) => req.put('/course/updateCourse',courseInfo)

// 删除课程
export const reqDeleteCourse = (courseId) => req.delete(`/course/deleteCourse?courseId=${courseId}`)

// 批量删除课程
export const reqBatchDeleteCourse = (courseIdArr) => {
  return req.delete(`/course/batchDeleteCourse?courseIdArr=${courseIdArr}`)
}

// 根据课程号查询课程
export const reqFindCourse = (course) => req.get(`/course/findCourse?course=${course}`)

