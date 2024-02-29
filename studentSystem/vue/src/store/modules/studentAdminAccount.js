import api from '@/api';
const $api = api.studentAdminAccount
import {constRoutes,asyncRoutes,willRouters} from '@/router';

const actions = {
  // 获取用户登录信息
  async getUserLogin({commit},{userName,userPassword}){
    let result = await $api.reqUserLogin(userName,userPassword)
    if(result.code === 200){
      sessionStorage.setItem('TOKEN',result.token)
      commit('GETUSERLOGIN',result.token)
      return result
    }else{
      return Promise.reject(new Error('登录失败，账号或密码不正确'))
    }
  },
  // 获取用户注册信息
  async getUserForget({commit},{userName,userPassword}){
    let result = await $api.reqUserForget(userName,userPassword)
    if(result.code === 200){
      return result
    }else{
      return Promise.reject(new Error('注册失败'))
    }
  },
  // 获取用户修改密码信息
  async getUserEditPassword({commit},{userName,oldPassword,newPassword}){
    let result = await $api.reqUserEditPassword(userName,oldPassword,newPassword)
    if(result.code === 200) return result
  },

  // 获取分页后用户信息 
  async getFindAccount({commit},{currentPage,limit}){
    let result = await $api.reqUserFindAccount(currentPage,limit)
    // console.log(result)
    if(result.code === 200){
      commit('GETFINDACCOUNT',result.data)
      return result
    }
  },
  // 获取添加用户信息
  async getAddUserAccount({commit},userInfo){
    let result = await $api.reqAddUserAccount(userInfo)
    if(result.code === 200) return result
  },
  // 获取修改用户信息
  async getUpdateUserAccount({commit},userInfo){
    let result = await $api.reqUpdateUserAccount(userInfo)
    if(result.code === 200) return result
  },
  // 删除单个用户
  async getDeleteUserAccount({commit},userId){
    let result = await $api.reqDeleteUserAccount(userId)
    if(result.code === 200) return result
  },
  // 批量删除用户
  async getBatchDeleteUserAccount({commit},userIdArr){
    let result = await $api.reqBatchDeleteUserAccount(userIdArr)
    if(result.code === 200) return result
  },
  // 根据账户名获取查询账户信息
  async getFindUserAccount({commit},userAccount){
    let result = await $api.reqFindUserAccount(userAccount)
    if(result.code === 200) return result
  }
}
const mutations = {
  GETUSERLOGIN(state,token){
    state.token = token
  },
  // 获取用户数据
  GETFINDACCOUNT(state,data){
    state.accountInfo = data
  }
}
const state = {
  token:'',
  accountInfo:[]
}
const getters = {
  auth:(state) =>{
    let userName = sessionStorage.getItem('userName')
    let authAdmin = state.accountInfo.find(item => {
      return item.userName = userName
    })
    if(authAdmin){
      return authAdmin.roles.split(',').includes('权限管理')
    }

  }
}

export default {
  namespaced:true,
  actions,
  mutations,
  state,
  getters
}