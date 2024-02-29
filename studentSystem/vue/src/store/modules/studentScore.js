import api from '@/api';
import course from './course';
let $api = api.studentScore

const actions = {
  // 获取所有学生成绩
  async getStudentScore({ commit }) {
    let result = await $api.reqStudentScoreAll()
    // console.log(result)
    if (result.code === 200) {
      // commit('GETSTUDENTINFO',result.data)
      // 将获取到的数据返回出去
      return result
    } else {
      return Promise.reject(new Error("获取学生信息失败"))
    }
  },
  // 获取分页后的成绩信息
  async getFindPageStudentScore({ commit }, { currentPage, limit }) {
    let result = await $api.reqFindPageStudentScore(currentPage, limit)
    if (result.code === 200) {
      return result
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 根据学号获取成绩
  async getFindStudentNumber({ commit }, studentNumber) {
    let result = await $api.reqFindStudentNumber(studentNumber)
    if (result.code === 200) {
      return result
    }
  },
  // 根据课程和分数查询成绩
  async getFindStudentSubjectScore({ commit }, { subject, score }) {
    let result = await $api.reqFindStudentSubjectScore(subject, score)
    if (result.code === 200) {
      return result
    }
  },
  // 获取添加或的修改成绩信息
  async getAddOrUpdateStudentScore({ commit }, scoreInfo) {
    let result = await $api.reqAddOrUpdateStudentScore(scoreInfo)
    if (result.code === 200) {
      return result
    }
  },
  // 获取删除成绩信息
  async getDeleteStudentScore({ commit }, studentId) {
    let result = await $api.reqDeleteStudentScore(studentId)
    if (result.code === 200) {
      return result
    }
  },
  // 获取批量删除成绩信息
  async getBatchDeleteStudentScore({ commit }, studentIdArr) {
    let result = await $api.reqBatchDeleteStudentScore(studentIdArr)
    if (result.code === 200) {
      return result
    }
  },
  // 学生增加选课
  async getAddStudentCourse({ commit }, courseId) {
    let result = await $api.reqAddStudentCourse(courseId)
    if (result.code === 200) {
      return result
    }
  },
  // 删除学生选课
  async getDelStudentCourse({ commit }, courseId) {
    let result = await $api.reqDelStudentCourse(courseId)
    if (result.code === 200) {
      return result
    }
  },
}
const mutations = {}
const state = {}
const getters = {}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}