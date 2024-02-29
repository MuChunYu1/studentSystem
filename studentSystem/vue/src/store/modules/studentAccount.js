import api from '@/api';
const $api = api.studentAccount

const actions = {
  // 获取管理员修改密码信息
  async getUpdateStudentPassword({ commit }, { studentNumber, password }) {
    let result = await $api.reqUpdateStudentPassword(studentNumber, password)
    if (result.code === 200) return result
  },

  // 获取分页后用户信息 
  async getFindStudentAccountLimit({ commit }, { currentPage, limit }) {
    let result = await $api.reqFindStudentAccountLimit(currentPage, limit)
    // console.log(result)
    if (result.code === 200) {
      commit('GETFINDACCOUNT', result.data)
      return result
    }
  },
  // 根据账户名获取查询账户信息
  async getFindStudentAccount({ commit }, userAccount) {
    let result = await $api.reqFindStudentAccount(userAccount)
    if (result.code === 200) return result
  }
}
const mutations = {
  GETUSERLOGIN(state, token) {
    state.token = token
  },
  // 获取用户数据
  GETFINDACCOUNT(state, data) {
    state.accountInfo = data
  }
}
const state = {
  token: '',
  accountInfo: []
}
const getters = {
  auth: (state) => {
    let userName = sessionStorage.getItem('userName')
    let authAdmin = state.accountInfo.find(item => {
      return item.userName = userName
    })
    if (authAdmin) {
      return authAdmin.roles.split(',').includes('权限管理')
    }

  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}