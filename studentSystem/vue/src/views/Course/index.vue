<template>
  <div class="studentInfo">
    <!-- 查询表单 -->
    <el-card style="margin-bottom:10px;position:relative;padding-top:5px;">
      <el-form inline @submit.native.prevent>
        <el-form-item><el-input v-model.trim="course" placeholder="请输入课程名称" @keyup.native.enter="findCourseBtn" /></el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="findCourseBtn">查询</el-button>
        <el-button type="default" @click="reset()">重置</el-button>
      </el-form> 
    </el-card>

    <!-- 课程管理 -->
    <el-card style="padding-bottom:20px;">
      <div slot="header">
        <span style="position:absolute;left:50%;font-size:20px;">课程信息</span>
        <!-- 操作课程 -->
        <div class="addCourse" v-if="flag">
          <el-button type="primary" size="small" @click="addCourseBtn">添加课程</el-button>
          <el-button type="warning" size="small" @click="exportExcelBtn">导出excel</el-button>
          <el-button :disabled="courseStateList.length === 0" type="danger" size="small" @click="batchDeleteCourseBtn">批量删除</el-button>
        </div>
      </div>
      <!-- 课程信息 -->
      <el-table
        class="table"
        stripe
        :data="courseList"
        style="width: 100% ;margin-top:18px"
        @selection-change="handleSelectionChange"
        ref="table"
      >
        <el-table-column v-if="flag" type="selection" width="30px"></el-table-column>
        <el-table-column prop="courseId" label="课程号" width="280"></el-table-column>
        <el-table-column prop="course" label="课程名称" width="300"></el-table-column>
        <el-table-column prop="xf" label="学分" width="100"></el-table-column>
        <el-table-column prop="teacher" label="任课教师" width="300"></el-table-column>
        <el-table-column label="操作" width="330">
          <template slot-scope="{row}">
            <el-button
            v-show="flag"
              type="warning"
              size="mini"
              icon="el-icon-edit"
              title="修改课程信息"
              @click="updateCourseBtn(row)"
            ></el-button>
            <!-- 删除提示框 -->
            <el-popconfirm
            v-if="flag"
              style="margin-left:10px;"
              :title="`确定删除${row.course}吗？`"
              @confirm="deleteCourseBtn(row)"
            >
              <el-button
                slot="reference"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                title="删除课程"
              ></el-button>
            </el-popconfirm>
            <!-- 选课提示框 -->
            <el-popconfirm
            v-else
              style="margin-left:10px;"
              :title="`确定选择${row.course}吗？`"
              @confirm="addStudentCourseBtn(row)"
            >
              <el-button
                slot="reference"
                type="success"
                size="mini"
                icon="el-icon-star-off"
                title="选择课程"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        style="text-align:center; margin-top:5px;"
        @size-change="handleSizeChange"
        @current-change="getCourseInfo"
        :current-page="pagination.currentPage"
        :page-sizes="[3,5,7,9]"
        :page-size="pagination.limit"
        layout=" prev, pager, next, jumper, ->, total, sizes"
        :total="pagination.total"
        background
      ></el-pagination>
    </el-card>

    <!-- 弹出层-->
    <el-dialog title="添加课程" :visible.sync="addDialogFormVisible" width="width">
      <el-form v-model="courseInfo">
        <el-form-item label="课程号" :label-width="formLabelWidth" required>
          <el-input style="width:80%;" placeholder="请输入课程名称" v-model="courseInfo.courseId"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" required :label-width="formLabelWidth">
          <el-input v-model="courseInfo.course" style="width:80%;" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="学分" :label-width="formLabelWidth" required>
          <el-input v-model="courseInfo.xf" style="width:80%;" placeholder="请输入学分"></el-input>
        </el-form-item>
        <el-form-item label="任课教师" :label-width="formLabelWidth" required>
          <el-input v-model="courseInfo.teacher" style="width:80%;" placeholder="请输入任课教师"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="addCourse">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改课程" :visible.sync="updateDialogFormVisible" width="width">
      <el-form v-model="courseInfo">
        <el-form-item label="课程号" :label-width="formLabelWidth" required>
          <el-input style="width:80%;" placeholder="请输入课程名称" v-model="courseInfo.courseId" disabled></el-input>
        </el-form-item>
        <el-form-item label="课程名称" required :label-width="formLabelWidth">
          <el-input v-model="courseInfo.course" style="width:80%;" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="学分" :label-width="formLabelWidth" required>
          <el-input v-model="courseInfo.xf" style="width:80%;" placeholder="请输入学分"></el-input>
        </el-form-item>
        <el-form-item label="任课教师" :label-width="formLabelWidth" required>
          <el-input v-model="courseInfo.teacher" style="width:80%;" placeholder="请输入任课教师"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="updateCourse">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入导出 excel 库
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
// import { mapState } from "vuex";
export default {
  name: "course",
  data() {
    return {
      // 所有课程信息
      courseList: [],
      // 存储查询数据
      course:'',
      // 课程信息
      courseInfo:{
        courseId:'',
        course:'',
        xf:'',
        teacher:''
      },
      // 控制添加用户对话框显示
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      // 控制表单宽度
      formLabelWidth: "120px",
      // 存储被选中课程信息
      courseStateList: [],
      // 删除 - 选课
      // flag:true,
      // 分页器
      pagination: {
        currentPage: 1, // 当前页
        limit: 7, // 页面展示数量
        total: undefined // 总数量
      },
    };
  },
  mounted() {
    this.getCourseInfo()
    // this.changeFlag()
  },
  methods: {
    // 选中状态切换事件
    handleSelectionChange(rows) {
      this.courseStateList = rows;
    },
    // 获取 分页后课程信息
    // 默认展示第一页数据 点击当前页面事件
    async getCourseInfo(Pager = 1) {
      // 将用户传过来的数据存储
      this.pagination.currentPage = parseInt(Pager);
      // 加载提示页面
      const loading = this.$loading({
        lock: true,
        text: "数据加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      try {
        // 获取分页后的数据
        let result = await this.$store.dispatch("course/getFindPageCourse",this.pagination);
        if (result.code === 200) {
          // 获取数据
          let { currentPage, limit, total, data } = result;
          this.courseList = data;
          this.pagination.currentPage = currentPage;
          this.pagination.limit = limit;
          this.pagination.total = total;
          // 获取完后 关闭加载页
          loading.close();
        }
      } catch (error) {
        this.$message.error("获取分页数据失败");
        // 失败提示之后 关闭加载页
        loading.close();
      }
    },
    // 导出 excel
    exportExcelBtn() {
      // 设置当前日期
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = year + "" + month + "" + day;
      //  .table要导出的是哪一个表格
      console.log(document.querySelector(".table"));
      var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      // console.log(wb.Sheets.Sheet1);
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    // 添加课程按钮事件
    addCourseBtn() {
      this.addDialogFormVisible = true;
      this.courseInfo = {
        courseId:'',
        course:'',
        xf:'',
        teacher:''
      }
    },
    // 修改课程
    updateCourseBtn(row) {
      this.updateDialogFormVisible = true
      let newRow = { ...row }
      this.courseInfo = newRow
    },
    // 添加课程信息
    async addCourse() {
      console.log(this.courseInfo, '数据');
      try {
        // 获取添加账号信息
        let result = await this.$store.dispatch('course/getAddCourse', this.courseInfo);
        if (result.code === 200) {
          // 添加成功后 关闭弹出层
          this.addDialogFormVisible = false
          this.$message.success('添加成功')
          this.getCourseInfo(this.pagination.currentPage)
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 修改课程信息
    async updateCourse() {
      try {
        // 获取添加账号信息
        let result = await this.$store.dispatch('course/getUpdateCourse', this.courseInfo);
        if (result.code === 200) {
          // 添加成功后 关闭弹出层
          this.updateDialogFormVisible = false
          this.$message.success('修改成功')
          this.getCourseInfo(this.pagination.currentPage)
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 删除课程
    async deleteCourseBtn(row) {
      try {
        console.log(row,'ro');
        let result = await this.$store.dispatch(
          "course/getDeleteCourse",
          row.courseId
        );
        // 删除成功提示
        if (result.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // 再次获取数据
            if(this.courseList.length > 1){
              this.getCourseInfo(this.pagination.currentPage)
            }else{
              this.getCourseInfo(this.pagination.currentPage - 1)
            }
        }
      } catch (error) {
        this.$message.error(`删除失败,${error.message}`);
      }
    },
    // 批量删除课程
    async batchDeleteCourseBtn(){
      let courseIdArr = this.courseStateList.map(item => item.courseId)
      try {
        // 获取批量删除课程信息
        let result = await this.$store.dispatch('course/getBatchDeleteCourse', courseIdArr);
        if(result.code === 200){
          this.$message({
            message:'批量删除成功',
            type: 'success'
          })
        }
        // 删除后 再次获取数据
        if(this.courseList >= 1){
          this.getCourseInfo(this.pagination.currentPage)
        }else{
          this.getCourseInfo(this.pagination.currentPage - 1)
        }
      } catch (error) {
        this.$message.warning(`${error.message}`)
      }
    },
    // 展示页面数量
    handleSizeChange(limit) {
      this.pagination.limit = limit;
      // 重新获取新数据
      this.getCourseInfo()
    },

    // 查询课程
    async findCourseBtn() {
      // 当查询框为空， 加载初始化状态
      if (!this.course) {
        return this.getCourseInfo()
      }
      try {
        let result = await this.$store.dispatch('course/getFindCourse', this.course);
        if (result.code === 200) {
          this.$message.success('查询成功')
          this.courseList = result.data
        }
      } catch (error) {
        this.$message.warning(`${error.message}`)
      }
    },
    // 学生增加选课
    async addStudentCourseBtn(row) {
      try {
        // 获取选择课程
        let result = await this.$store.dispatch('studentScore/getAddStudentCourse', {courseId:row.courseId,studentId:sessionStorage.getItem("userName")});
        if (result.code === 200) {
          this.$message.success('选课成功')
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
  
    close() {
      this.addDialogFormVisible = false
      this.updateDialogFormVisible = false
    },
    // 重置查询
    reset(){
      this.course = ''
      this.getCourseInfo()
    },
    /* changeFlag(){
    let rolesList = role.split(',')
    for(let i = 0; i < rolesList.length; i++){
      if(rolesList[i] == '学生'){
        this.flag = false
        // this.findStudentNumberBtn(id)
      }
    }
  } */
  },
  computed: {
  flag() {
    let rolesList = this.role.split(',');
    for (let i = 0; i < rolesList.length; i++) {
      if (rolesList[i] === '学生') {
        return false;
      }
    }
    return true;
  },
  role() {
    return sessionStorage.getItem('roles');
  }
}
  /* computed:{
    role(){
      return sessionStorage.getItem('roles')
    }
  } */
};
</script>

<style lang="less" scoped>
// deep 深度选择器
/deep/.el-card__body {
  padding: 20px 20px 0 20px !important;
}
.studentInfo {
  .addCourse {
    margin-bottom: 10px;
  }
}
el-table-column{
}
/deep/.el-card__header{
  padding: 10px 20px 0px 20px !important;
}
</style>