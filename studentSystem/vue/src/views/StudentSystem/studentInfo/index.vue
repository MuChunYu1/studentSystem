<template>
  <div class="studentInfo">
    <!-- 查询表单 -->
    <el-card style="margin-bottom:10px;position:relative;padding-top:5px;">
      <FindStudentInfo :getData="getData" @getStudentInfoList="getStudentInfoList"/>  
    </el-card>

    <!-- 学生管理 -->
    <el-card style="padding-bottom:20px;">
      <div slot="header">
        <span style="position:absolute;left:50%;font-size:20px;">学生信息</span>
        <!-- 操作学生 -->
        <div class="addStudent">
          <el-button type="primary" size="small" @click="addStudentBtn">添加学生</el-button>
          <el-button type="warning" size="small" @click="exportExcelBtn">导出excel</el-button>
          <el-button type="danger" size="small" 
          @click="batchDeleteStudentBtn">批量删除</el-button>
        </div>
      </div>
      <!-- 学生信息 -->
      <el-table
        class="table"
        stripe
        :data="studentInfoList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        ref="table"
      >
        <el-table-column type="selection" width="30px"></el-table-column>
        <el-table-column prop="studentNumber" label="学号" width="150"></el-table-column>
        <el-table-column prop="studentName" label="姓名" width="90"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80"></el-table-column>
        <el-table-column prop="studentTel" label="联系电话" width="110"></el-table-column>
        <el-table-column prop="department" label="系部" width="width"></el-table-column>
        <el-table-column prop="grade" label="年级" width="80"></el-table-column>
        <el-table-column prop="major" label="专业" width="width"></el-table-column>
        <el-table-column prop="className" label="班级" width="80"></el-table-column>
        <el-table-column label="操作" width="230">
          <template slot-scope="{row}">
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
              title="修改学生信息"
              @click="updateStudentBtn(row)"
            ></el-button>
            <el-button
              type="info"
              size="mini"
              icon="el-icon-info"
              title="查看学生详细信息"
              @click="showStudentInfoBtn(row)"
            ></el-button>
            <!-- 删除提示框 -->
            <el-popconfirm
              style="margin-left:10px;"
              :title="`确定删除${row.studentName}吗？`"
              @confirm="deleteStudentBtn(row)"
            >
              <el-button
                slot="reference"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                title="删除学生"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        style="text-align:center; margin-top:5px;"
        @size-change="handleSizeChange"
        @current-change="getData"
        :current-page="pagination.currentPage"
        :page-sizes="[3,5,7,9]"
        :page-size="pagination.limit"
        layout=" prev, pager, next, jumper, ->, total, sizes"
        :total="pagination.total"
        background
      ></el-pagination>
    </el-card>

    <!-- 弹出层-->
    <StudentForm ref="StudentForm" :getData="getData"/>

    <!-- 抽屉 显示学生详细信息 -->
    <ShowStudentInfo :studentDetailInfo="studentDetailInfo" />
  </div>
</template>

<script>
// 引入导出 excel 库
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import ShowStudentInfo from "./showStudentInfo";
import FindStudentInfo from "./findStudentInfo";
import StudentForm from "./studentForm";
import { mapState } from "vuex";
export default {
  name: "studentInfo",
  components: { ShowStudentInfo,FindStudentInfo,StudentForm },
  data() {
    return {
      // 所有学生信息
      studentInfoList: [],
      // 存储单个学生详细信息
      studentDetailInfo: {},
      // 存储被选中学生信息
      studentCheckList: [],
      // 分页器
      pagination: {
        currentPage: 1, // 当前页
        limit: 7, // 页面展示数量
        total: undefined // 总数量
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 选中状态切换事件
    handleSelectionChange(rows) {
      this.studentCheckList = rows;
    },
    // 获取 分页后学生信息
    // 默认展示第一页数据 点击当前页面事件
    async getData(Pager = 1) {
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
        let result = await this.$store.dispatch("studentInfo/getFindPageStudent",this.pagination);
        if (result.code === 200) {
          // 获取数据
          let { currentPage, limit, total, data } = result;
          this.studentInfoList = data;
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
    // 添加学生按钮事件
    addStudentBtn() {
      this.$refs.StudentForm._data.studentInfo = {sex: "男",studentPhoto: "",}
      // 显示弹出层
      this.$bus.$emit('showDialog',true)
      // 每次点击都先清楚表单校验
      this.$refs.StudentForm.clearCheck()
    },
    // 修改学生
    updateStudentBtn(row) {
      // this.dialogFormVisible = true;
      // 将此行学生信息传递过去
      this.$bus.$emit('showDialog',true,row)
      // 将当前页传递过去
      this.$bus.$emit('currentPage',this.pagination.currentPage)
      // 每次点击都先清楚表单校验
      this.$refs.StudentForm.clearCheck()
    },
    // 删除学生
    async deleteStudentBtn(row) {
      try {
        let result = await this.$store.dispatch(
          "studentInfo/getDeleteStudent",
          row.studentId
        );
        // 删除成功提示
        if (result.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // 再次获取数据
            if(this.studentInfoList.length > 1){
              this.getData(this.pagination.currentPage)
            }else{
              this.getData(this.pagination.currentPage - 1)
            }
        }
      } catch (error) {
        this.$message.error(`删除失败,${error.message}`);
      }
    },
    // 批量删除学生
    async batchDeleteStudentBtn(){
      let studentIdArr = this.studentCheckList.map(item => item.studentId)
      try {
        // 获取批量删除学生信息
        let result = await this.$store.dispatch('studentInfo/getBatchDeleteStudent', studentIdArr);
        if(result.code === 200){
          this.$message({
            message:'批量删除成功',
            type: 'success'
          })
        }
        // 删除后 再次获取数据
        if(this.studentInfoList >= 1){
          this.getData(this.pagination.currentPage)
        }else{
          this.getData(this.pagination.currentPage - 1)
        }
      } catch (error) {
        this.$message.warning(`${error.message}`)
      }
    },
    // 展示页面数量
    handleSizeChange(limit) {
      this.pagination.limit = limit;
      // 重新获取新数据
      this.getData();
    },
    // 查看学生详细信息
    showStudentInfoBtn(row) {
      // this.isShowDrawer = !this.isShowDrawer;
      this.$bus.$emit("isShowDrawer", true);
      this.studentDetailInfo = row;
    },
    // 根据姓名或学号查询学生信息 （自定义事件）
    getStudentInfoList(findData){
      // 将查询到的数据展示在页面上
      this.studentInfoList = findData
    },

  },
  computed: {
    // 获取vuex中 state 的数据
    ...mapState({
      studentList: state => {
        return state.studentInfo.studentInfo;
      }
    })
  }
};
</script>

<style lang="less" scoped>
// deep 深度选择器
/deep/.el-card__body {
  padding: 20px 20px 0 20px !important;
}
.studentInfo {
  .addStudent {
    margin-bottom: 10px;
  }
}
el-table-column{
}
/deep/.el-card__header{
  padding: 10px 20px 0px 20px !important;
}
</style>