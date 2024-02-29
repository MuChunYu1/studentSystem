import api from '@/api';
const $api = api.studentInfo

function isError(result,message){
  if(result.code === 200){
    return result 
  }else{
    return Promise.reject(new Error(message))
  }
}
const actions = {
  // 获取所有学生信息
  async getStudentInfo({commit}){
    let result = await $api.reqStudentInfoAll()
    // console.log(result)
    if(result.code === 200){
      commit('GETSTUDENTINFO',result.data)
      // 将获取到的数据返回出去
      return result
    }else{
      return Promise.reject(new Error("获取学生信息失败"))
    }
  },
  // 根据姓名获取学生信息
  // async getFindStudentNameInfo({commit},studentName){
  //   let result = await $api.reqFindStudentNameInfo(studentName)
  //   if(result.code === 200){
  //     return result
  //   }
  // },
  // 根据学号获取学生信息
  async getFindStudentNumberInfo({commit},studentNumber){
    let result = await $api.reqFindStudentNumberInfo(studentNumber)
    if(result.code === 200){
      return result
    }
  },
   // 根据姓名或学号获取学生信息
   async getFindStudentInfo({commit},getQuery){
    let result = ''
    if(typeof getQuery !== 'number'){
      result = await $api.reqFindStudentNameInfo(getQuery)
    }else{
      result = await $api.reqFindStudentNumberInfo(getQuery)
    }
    if(result.code === 200){
      return result
    }
  },
  // 添加学生
  async getAddStudent({commit},studentInfo){
    let result = await $api.reqAddStudent(studentInfo)
    return isError(result,'添加失败')
  },
  // 修改学生
  async getUpdateStudent({commit},studentInfo){
    let result = await $api.reqUpdateStudent(studentInfo)
    return isError(result,'修改失败')
  },
  // 删除学生
  async getDeleteStudent({commit},studentId){
    let result = await $api.reqDeleteStudent(studentId)
    return isError(result,'删除失败')
  },
  // 批量删除学生
  async getBatchDeleteStudent({commit},studentIdArr){
    let result = await $api.reqBatchDeleteStudent(studentIdArr)
    if(result.code === 200) return result
  },
  // 获取分页后学生信息
  async getFindPageStudent({commit},{currentPage,limit}){
    let result = await $api.reqFindPageStudent(currentPage,limit)
    return isError(result,'获取分页数据失败')
  }
}
const mutations = {
  // 获取学生信息
  GETSTUDENTINFO(state,data){
    state.studentInfo = data
  },  
}
const state = {
  studentInfo:[]
}
const getters = {}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
