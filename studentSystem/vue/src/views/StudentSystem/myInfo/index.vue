<template>
  <div class="father">
    <div class="left">
      <el-form ref="form" v-model="myInfoList" label-width="80px">
        <el-row style="margin-bottom:10px;margin-left: 25%;">
          <el-col :span="16">
            <el-form-item prop="studentPhoto">
              <div class="demo-basic--circle">
                <div class="block">
                  <!-- shape="square": 设置图片的形状 -->
                  <el-avatar v-if="!myInfoList.studentPhoto" :size="120" :src="squareUrl"></el-avatar>
                  <img v-else :src="myInfoList.studentPhoto" alt="照片加载失败啦" class="studentPhoto">
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item prop="studentName" label-width="70px" label="姓名">
              <el-input v-model="myInfoList.studentName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="studentNumber" label="学号" label-width="70px">
              <el-input v-model="myInfoList.studentNumber" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item prop="sex" label-width="70px" label="性别">
              <el-input v-model="myInfoList.sex" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="民族" label-width="70px">
              <el-input :disabled="true" value="汉族"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item prop="department" label-width="70px" label="系部">
              <el-input v-model="myInfoList.department" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="grade" label="年级" label-width="70px">
              <el-input v-model="myInfoList.grade" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">

            <el-form-item prop="major" label-width="70px" label="专业">
              <el-input v-model="myInfoList.major" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="className" label="班级" label-width="70px">
              <el-input v-model="myInfoList.className" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item prop="region" label-width="70px" label="家庭住址">
              <el-input v-model="myInfoList.region" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="studentTel" label="联系电话" label-width="70px">
              <el-input v-model="myInfoList.studentTel" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="right" v-if="flag">
      <el-form v-model="scoreInfo">
        <el-row :gutter="10">
          <el-col :span="10" v-for="(item, index) in scoreInfo">
            <el-form-item label-width="150px" prop="course" :label="item.course">
              <el-input :disabled="true" v-model.number="item.score"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label-width="150px" label="总分">
              <el-input :disabled="true" v-model="this.newScore[0].totalScore"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="150px" label="平均分">
              <el-input :disabled="true" v-model="this.newScore[0].averageScore"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myInfo',
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      my: '',
      myInfoList: [],
      newScore: [],
      scoreInfo: {
      },
      // 没有成绩
      flag:false
    }
  },
  methods: {
    // 获取学生信息
    async getStudentInfoList(id) {
      // 获取信息
      let result = await this.$store.dispatch('studentInfo/getFindStudentNumberInfo', id);
      this.myInfoList = result.data[0]
    },
    async findStudentNumberBtn(id) {
      let result = await this.$store.dispatch('studentScore/getFindStudentNumber', id);
      if (result.code === 200) {
        this.arrange(result)
        this.scoreInfo = result.data
        this.flag = true
      }else{
        this.flag = false
      }
    },
    arrange(result) {
      // 整理成绩
      const newScore = []
      result.data.forEach(item => {
        const index = newScore.findIndex(subItem => subItem.studentNumber === item.studentNumber)
        if (index > -1) {
          newScore[index].scores.push({ id: item.courseId, name: item.course, value: item.score })
        } else {
          newScore.push({
            studentNumber: item.studentNumber,
            studentName: item.studentName,
            scores: [{ id: item.courseId, name: item.course, value: item.score }]
          })
        }
      })
      this.newScore = newScore
      // 总分
      let num = newScore[0].scores.length
      let totalScore = 0
      newScore.forEach(student => {
        student.scores.forEach(score => {
          if (score.id) {
            totalScore += parseInt(score.value);
          }
        });
        student.totalScore = totalScore
        student.averageScore = totalScore / num
      });
      console.log(this.newScore, '=')

    },
    getId() {
      this.my = sessionStorage.getItem('userName')
      this.getStudentInfoList(this.my)
      this.findStudentNumberBtn(this.my)

    }
  },
  mounted() {
    this.getId()
  }
}
</script>
<style>
.el-input.is-disabled .el-input__inner {
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  color: #151618;
  cursor: not-allowed;
}
</style>
<style lang="less" scoped>
.father {
  display: flex;


  .black {
    color: rgb(60, 60, 60);
  }

  .left {
    width: 60%;

    // 头像显示样式
    .studentPhoto {
      display: inline-block;
      min-width: 120px;
      min-height: 120px;
      max-width: 300px;
      max-height: 200px;
      color: red !important;
    }
  }

  .right {
    width: 40%;
  }
}
</style>