import api from '@/api';
let $api = api.message

const actions = {
    // 获取所有信息
    async getMessage({commit}){
      let result = await $api.reqFindAllMessage()
      // console.log(result)
      if(result.code === 200){
        // commit('GETSTUDENTINFO',result.data)
        // 将获取到的数据返回出去
        return result
      }else{
        return Promise.reject(new Error("获取信息失败"))
      }
    },
  // 获取分页后的信息
  async getFindPageMessage({commit},{currentPage,limit}){
    let result = await $api.reqFindPageMessage(currentPage,limit)
    if(result.code === 200){
      return result
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取添加信息
  async getAddMessage({commit},messageInfo){
    let result = await $api.reqAddMessage(messageInfo)
    if(result.code === 200) return result
  },
  // 获取修改信息
  async getUpdateMessage({commit},messageInfo){
    let result = await $api.reqUpdateMessage(messageInfo)
    if(result.code === 200) return result
  },
  // 删除单个信息
  async getDeleteMessage({commit},messageId){
    let result = await $api.reqDeleteMessage(messageId)
    if(result.code === 200) return result
  },
  // 批量删除信息
  async getBatchDeleteMessage({commit},messageIdArr){
    let result = await $api.reqBatchDeleteMessage(messageIdArr)
    if(result.code === 200) return result
  },
  // 根据信息类型获取查询信息
  async getFindMessage({commit},issue){
    let result = await $api.reqFindMessage(issue)
    if(result.code === 200) return result
  },
  // 根据信息处理状态获取查询信息
  async getStateMessage({commit},state){
    let result = await $api.reqStateMessage(state)
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