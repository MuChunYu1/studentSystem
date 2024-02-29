<template>
  <div>
    <el-form :model="findStudent" ref="form" label-width="80px" :inline="true" size="mini">
      <el-form-item label="姓名查询">
        <el-input placeholder="输入姓名" v-model.trim="findStudent.studentName"
          @keyup.enter.native="findStudentNameOrNumberBtn('name')"></el-input>
      </el-form-item>
      <el-form-item style="margin-right:80px;">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="findStudentNameOrNumberBtn('name')"
          :loading="nameBtnLoading">查询</el-button>
      </el-form-item>
      <el-form-item label="学号查询">
        <el-input placeholder="输入学号" v-model.number="findStudent.studentNumber"
          @keyup.enter.native="findStudentNameOrNumberBtn('number')"></el-input>
      </el-form-item>
      <el-form-item style="margin-right:80px;">
        <!-- @click="findStudentNumberBtn" -->
        <el-button type="primary" icon="el-icon-search" size="mini" @click="findStudentNameOrNumberBtn('number')"
          :loading="numberBtnLoading">查询</el-button>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" size="mini" style="float: right;" @click="resetBtn">重置查询</el-button>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'findStudentInfo',
  props: ['getData'],
  data() {
    return {
      // 根据姓名查询
      findStudent: {
        studentName: "",
        studentNumber: "",
        studentClassName: "",
        sendQuery: void 0
      },
      nameBtnLoading: false,
      numberBtnLoading: false,
    };
  },
  methods: {
    // 根据姓名或学号查询学生信息
    async findStudentNameOrNumberBtn(flag) {
      let { studentName, studentNumber } = this.findStudent
      let result = ''

      try {
        // flag ==> name: 正在利用姓名查询， flag ==> number 则是学号
        if (flag === 'name') {
          // console.log('aaaa')
          studentName.length !== 0 ? result = await this.$store.dispatch('studentInfo/getFindStudentInfo', studentName) : this.$message.error('请输入正确的格式')
        } else { // 此else === if(flag === 'number')
          // flag ==> number 则是学号
          // 进来同时判断数据是否为 数字类型
          if (typeof studentNumber === 'number') {
            result = await this.$store.dispatch('studentInfo/getFindStudentInfo', studentNumber);
          } else {
            // 数据为非数字类型提示
            return this.$message.error('请输入正确的格式')
          }
        }
        // 请求成功重新定义展示数据
        if (result.code === 200) {
          this.$message({
            message: 'ok',
            type: 'success'
          })
          // 触发自定义事件，将数据给父亲带过去
          this.$emit('getStudentInfoList', result.data);
        }
      } catch (error) {
        // 请求失败提示
        this.$message.warning(`${error.message}`)
      }
    },
    // 重置查询
    resetBtn() {
      this.findStudent.studentName = this.findStudent.studentNumber = ''
      this.getData()
    },
  },
}
</script>

<style lang="less" scoped>
// 查询框提示
.hint {
  color: #999;
  font-size: 12px;
  position: absolute;
  left: 300px;
  top: 5px;
}</style>