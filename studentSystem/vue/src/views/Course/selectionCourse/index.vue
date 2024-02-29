<template>
  <div>
    <!-- 选课查询 -->
    <el-card style="margin-bottom:10px;padding:0;position:relative;">
      <el-form :inline="true" ref="form" :model="findStudent" label-width="80px">
        <el-form-item label="学生查询">
          <el-input style="width:200px;" size="medium" v-model.trim="findStudent.findNumber"
            placeholder="请输入学号"></el-input>
          <el-button size="medium" style="margin-left:10px;" type="primary" icon="el-icon-search"
            @click="findStudentNumberBtn">查询</el-button>
        </el-form-item>

        <el-button type="default" @click="reset()">重置</el-button>
      </el-form>
    </el-card>
    <!-- 学生成绩信息 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header" style="margin-bottom: 20px;">
        <span style="position:absolute;left:50%;font-size:20px;">学生选课信息</span>
      </div>
      <!-- 成绩信息内容 -->
      <div>
        <el-table resizable stripe border @selection-change="handleSelectionChange" :data="currentScores"
          style="width: 100%">
          <el-table-column fixed prop="studentNumber" label="学号" width="150" align="center"></el-table-column>
          <el-table-column width="100" fixed align="center" prop="studentName" label="姓名"></el-table-column>
          <!-- 课程 -->
          <el-table-column v-for="(item, index) in courseList" :key="index" :prop="'scores[' + index + '].value'"
            align="center" width="130" :label=item>
            <template slot-scope="{row}">
              <span v-if="row.scores[index].value == '未选课'" :style="{ color: 'red' }">{{ row.scores[index].value
              }}</span>
              <span v-else-if="row.scores[index].value == '已选课'" :style="{ color: 'green' }">{{ row.scores[index].value
              }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" prop="courseNum" label="选课数" width="100" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="{row}">
              <el-button style="margin-right:10px;" type="warning" title="修改选课" icon="el-icon-edit" size="mini"
                @click="updateScoreBtn(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 分页器 -->
    <el-pagination v-show='paginationFlag' style="text-align:center; margin-top:5px;" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[3, 5, 7]"
      :page-size="pagination.limit" layout=" prev, pager, next, jumper, ->, total, sizes" :total="pagination.total"
      background></el-pagination>

    <!-- 对话框 -->
    <el-dialog title="修改选课" :visible.sync="dialogFormVisible" width="65%">
      <el-form v-model="scoreInfo">
        <el-row :gutter="10">
          <el-col :span="9">
            <el-form-item prop="studentNumber" label="学号" label-width="150px">
              <el-input v-model="scoreInfo.studentNumber" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="studentName" label-width="150px" label="姓名">
              <el-input v-model="scoreInfo.studentName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="9" v-for="(item, index) in scoreInfo.scores">
            <el-form-item label-width="150px" :prop="'scores[' + index + ']' + '.value'" :label="item.name">
              <el-button v-if="scoreInfo.scores[index].id" type="success"
                @click="delStudentCourseBtn(scoreInfo.studentNumber, scoreInfo.scores[index].id)"  title="点击取消选课">已选课</el-button>
              <el-button v-else type="danger" @click="addStudentCourseBtn(scoreInfo.studentNumber,scoreInfo.scores[index].name)" title="点击选课">未选课</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "selectionCourse",
  data() {
    return {
      // 查询信息
      findStudent: {
        findNumber: "",
        subject: "",
        score: ""
      },
      // 成绩信息
      scoreInfo: {
        studentNumber: '',
        studentName: '',
        course: '',
        score: '',
      },
      // 成绩信息列表
      scoreList: [],
      // 详情课程列表
      coursePlus:[],
      // 课程列表
      courseList: [],
      // 成绩信息列表
      newScore: [],
      // 分页器
      pagination: {
        currentPage: 1, // 当前页
        limit: 7, // 页面展示数量
        total: undefined // 总数量
      },
      // 被选中成绩信息
      checkScoreList: [],
      // 控制分页器是否显示
      paginationFlag: true,
      // 控制对话框是否显示
      dialogFormVisible: false
    };
  },
  mounted() {
    this.getCourse()
    // this.getStudentScore()
    this.getAllStudentScore()
  },

  methods: {
    // 获取所有课程
    async getCourse() {
      const loading = this.$loading({
        lock: true,
        text: "数据加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      try {
        // 获取全部课程信息
        let result = await this.$store.dispatch("course/getCourse")
        this.coursePlus = result.data
        for (let i = 0; i < result.data.length; i++) {
          this.courseList.push(result.data[i].course)
        }
        loading.close()
      } catch (error) {
        loading.close()
        this.$message.error(`${error.message}`);
      }
    },
    // 获取全部学生成绩信息
    async getAllStudentScore() {
      const loading = this.$loading({
        lock: true,
        text: "数据加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      try {
        // 获取全部学生成绩信息
        let result = await this.$store.dispatch("studentScore/getStudentScore")
        console.log(result, 'result');

        this.arrange(result)
        loading.close()
      } catch (error) {
        loading.close()
        this.$message.error(`${error.message}`);
      }
    },

    // 根据学号查找成绩
    async findStudentNumberBtn() {
      if (this.findStudent.findNumber === '') {
        this.getAllStudentScore()
        // this.$message.error('请输入学号')
        return
      }
      try {
        let result = await this.$store.dispatch('studentScore/getFindStudentNumber', this.findStudent.findNumber);
        if (result.code === 200) {
          this.$message.success('加载成功')
          this.arrange(result)
          this.scoreList = result.data
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 根据课程和分数查询
    async findSubJectAndScoreBtn() {
      let result = await this.$store.dispatch('studentScore/getFindStudentSubjectScore', this.findStudent);
      if (result.code === 200) {
        this.$message.success('加载成功')
        this.arrange(result)
        this.scoreList = result.data
        this.paginationFlag = false
      }
    },
    // 处理数据
    arrange(result) {
      // 整理成绩
      const newScore = []
      result.data.forEach(item => {
        const index = newScore.findIndex(subItem => subItem.studentNumber === item.studentNumber)
        if (index > -1) {
          newScore[index].scores.push({ id: item.courseId, name: item.course, value: '已选课' })
        } else {
          newScore.push({
            studentNumber: item.studentNumber,
            studentName: item.studentName,
            scores: [{ id: item.courseId, name: item.course, value: '已选课' }]
          })
        }
      })
      this.newScore = newScore
      newScore.forEach(student => {
        this.courseList.forEach(course => {
          const index = student.scores.findIndex(score => score.name === course);
          if (index === -1) {
            let ind = this.courseList.indexOf(course)
            // 对成绩排序
            student.scores.splice(ind, 0, { name: course, value: '未选课' })
          }
        });
      });
      // 总选课数
      newScore.forEach(student => {
        let courseNum = 0;
        student.scores.forEach(score => {
          if (score.id) {
            courseNum++
          }
        });
        student.courseNum = courseNum;
      });
      // 分页
      console.log(newScore, 'newScore');
      this.pagination.total = newScore.length

    },
    reset() {
      this.getAllStudentScore()
      this.findStudent.findNumber = ''
    },
    // 页面数量展示事件
    handleSizeChange(val) {
      // 更新每页显示的数量
      this.pagination.limit = val;
      // 重新计算总页数
      this.pagination.totalPages = Math.ceil(this.newScore.length / this.pagination.limit);
      // 如果当前页码大于总页数，则将当前页码设置为总页数
      if (this.pagination.currentPage > this.pagination.totalPages) {
        this.pagination.currentPage = this.pagination.totalPages;
      }
      // this.pagination.limit = limit;
      // this.getAllStudentScore()
    },
    handleCurrentChange(val) {
      // 更新当前页码
      this.pagination.currentPage = val;
    },
    // 成绩选中状态
    handleSelectionChange(rows) {
      this.checkScoreList = rows
    },
    // 修改成绩
    updateScoreBtn(row) {
      this.dialogFormVisible = true
      console.log(row, 'row');
      this.scoreInfo = { ...row }
    },
    // 添加选课
    async addStudentCourseBtn(studentNumber, course) {
      console.log(this.coursePlus,course,'===');
      let id = ''
      for(let i = 0; i < this.coursePlus.length; i++){
        if(this.coursePlus[i].course == course){
          id = this.coursePlus[i].courseId
        }
      }
      try {
        // 获取选择课程
        let result = await this.$store.dispatch('studentScore/getAddStudentCourse', { courseId: id, studentId: studentNumber });
        if (result.code === 200) {
          this.$message.success('选课成功')
          this.dialogFormVisible = false
          this.getAllStudentScore()
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 删除选课
    async delStudentCourseBtn(studentNumber, courseId) {
      try {
        // 获取选择课程
        let result = await this.$store.dispatch('studentScore/getDelStudentCourse', { courseId: courseId, studentId: studentNumber });
        if (result.code === 200) {
          this.$message.success('取消选课成功')
          this.dialogFormVisible = false
          this.getAllStudentScore()

        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
  },
  watch: {
    newScore() {
      // 计算总记录数
      this.pagination.total = this.newScore.length;
      // 计算总页数
      this.pagination.totalPages = Math.ceil(this.newScore.length / this.pagination.limit);
      // 如果当前页码大于总页数，则将当前页码设置为总页数
      if (this.pagination.currentPage > this.pagination.totalPages) {
        this.pagination.currentPage = this.pagination.totalPages;
      }
    },
  },
  computed: {
    currentScores() {
      // 根据当前页码和每页显示的数量来截取数组
      const start = (this.pagination.currentPage - 1) * this.pagination.limit;
      const end = start + this.pagination.limit;
      return this.newScore.slice(start, end);
    },
  },

};
</script>

<style lang="less" scoped>
// 查询框提示
.hint {
  color: #999;
  font-size: 12px;
  position: absolute;
  left: 90px;
  top: 2px;
}

.el-input {
  width: 300px;
}

/deep/ .el-card__body {
  padding: 20px 20px 0 20px !important;
}
</style>