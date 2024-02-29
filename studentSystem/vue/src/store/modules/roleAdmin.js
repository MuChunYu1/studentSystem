import api from '@/api';
const $api = api.roleAdmin

const actions = {
  // 获取角色信息
  async getFindRole({commit}){
    let result = await $api.reqFindRole()
    if(result.code === 200) return result
  },
  // 获取修改权限信息
  async getUpdateAuth({commit},{roles,roleId}){
    let result = await $api.reqUpdateAuth(roles,roleId)
    if(result.code === 200) return result
  },
  // 获取修改权限信息
  async getDeleteRole({commit},roleId){
    let result = await $api.reqDeleteRole(roleId)
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