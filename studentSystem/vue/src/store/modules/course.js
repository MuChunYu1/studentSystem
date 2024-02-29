import api from '@/api';
let $api = api.course

const actions = {
    // 获取所有课程
    async getCourse({commit}){
      let result = await $api.reqFindAllCourse()
      // console.log(result)
      if(result.code === 200){
        // commit('GETSTUDENTINFO',result.data)
        // 将获取到的数据返回出去
        return result
      }else{
        return Promise.reject(new Error("获取课程信息失败"))
      }
    },
  // 获取分页后的课程信息
  async getFindPageCourse({commit},{currentPage,limit}){
    let result = await $api.reqFindPageCourse(currentPage,limit)
    if(result.code === 200){
      return result
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取添加课程信息
  async getAddCourse({commit},courseInfo){
    let result = await $api.reqAddCourse(courseInfo)
    if(result.code === 200) return result
  },
  // 获取修改课程信息
  async getUpdateCourse({commit},courseInfo){
    let result = await $api.reqUpdateCourse(courseInfo)
    if(result.code === 200) return result
  },
  // 删除单个课程
  async getDeleteCourse({commit},courseId){
    let result = await $api.reqDeleteCourse(courseId)
    if(result.code === 200) return result
  },
  // 批量删除课程
  async getBatchDeleteCourse({commit},courseIdArr){
    let result = await $api.reqBatchDeleteCourse(courseIdArr)
    if(result.code === 200) return result
  },
  // 根据课程名获取查询课程信息
  async getFindCourse({commit},course){
    let result = await $api.reqFindCourse(course)
    if(result.code === 200) return result
  }
}
const mutations = {}
const state = {}
const getters = {}

export default {
  namespaced:true,
  actions,
  mutations,
  state,
  getters
}