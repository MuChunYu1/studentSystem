import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入学生信息
import studentInfo from './modules/studentInfo'
import studentAdminAccount from './modules/studentAdminAccount'
import studentScore from './modules/studentScore'
import studentAccount from './modules/studentAccount'
import roleAdmin from './modules/roleAdmin'
import course from './modules/course'
import message from './modules/message'

export default new Vuex.Store({
  modules:{
    studentAdminAccount,
    studentInfo,
    studentScore,
    studentAccount,
    roleAdmin,
    course,
    message
  }
})
