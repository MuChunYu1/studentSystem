<template>
  <div class="app-container">
    <!-- 账户查询 -->
    <el-card style="margin-bottom:10px;position:relative;">
      <el-form inline @submit.native.prevent>
        <el-form-item><el-input v-model.trim="userAccount" placeholder="请输入账号"
            @keyup.native.enter="findAccountBtn" /></el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="findAccountBtn">查询</el-button>
        <el-button type="default" @click="resetBtn">重置</el-button>
      </el-form>
    </el-card>

    <!-- 账户信息 -->
    <el-card>
      <div slot="header" style="margin-bottom: 20px;">
        <span style="position:absolute;left:50%;font-size:20px;">学生账号</span>
      </div>
      <div >
        <!-- table表格：展示用户信息的地方 -->
        <el-table border stripe @selection-change="handleSelectionChange" v-loading="tableLoading" :data="userList">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column align="center" prop="studentNumber" label="账号" width="250" />
          <el-table-column align="center" prop="studentName" label="用户名" width="250" />
          <el-table-column align="center" prop="password" label="密码" width="300" />
          <el-table-column align="center" prop="roles" label="角色">
            <template slot-scope="{row}">
              <el-tag v-if="role" type="primary" v-for="(role, index) in row.roles.split(',')" :key="index">{{ role
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="230" align="center">
            <template slot-scope="{row}">
              <el-button type="warning" size="mini" icon="el-icon-edit" title="修改密码" @click="updateAccountBtn(row)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 分页器 -->
    <el-pagination align="center" :current-page="pagination.currentPage" :total="pagination.total"
      :page-size="pagination.limit" :page-sizes="[3, 5, 7, 9, 11]" style="text-align:center; margin:5px 5px !important;"
      layout="prev, pager, next, jumper, ->, sizes, total" @size-change="handleLimit" @current-change="getAccountInfo" />

    <!-- 对话框 :before-close="dialogBeforeClose" -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="width">
      <el-form v-model="userInfo">
        <el-form-item label="账户" prop="studentNumber" :label-width="formLabelWidth">
          <el-input v-model="userInfo.studentNumber" style="width:80%;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="studentName" :label-width="formLabelWidth">
          <el-input v-model="userInfo.studentName" style="width:80%;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model.trim="userInfo.password" style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "studentAccount",
  data() {
    return {
      // 存储查询数据
      userAccount: '',
      // 用户信息
      userInfo: {
        studentNumber: "",
        studentName: "",
        password: "",
      },
      // 控制表格加载显示
      tableLoading: true,
      // 用户信息列表
      userList: [],
      // 分页器
      pagination: {
        currentPage: 1,
        limit: 7,
        total: undefined // 总数量

      },
      // 控制添加用户对话框显示
      dialogFormVisible: false,
      // 控制角色分配对话框显示
      roleDialog: false,
      // 控制表单宽度
      formLabelWidth: "120px",
      // 收集选中时的账户信息
      accountStateList: [],
      // 修改密码所需数据
    };
  },
  mounted() {
    this.getAccountInfo();
  },
  methods: {
    // 初始化账户信息
    async getAccountInfo(pager = 1) {
      this.pagination.currentPage = pager;
      try {
        let result = await this.$store.dispatch("studentAccount/getFindStudentAccountLimit", this.pagination);
        if (result.code === 200) {
          let { data, currentPage, limit, total } = result;
          this.userList = data;
          this.pagination.total = total;
          this.pagination.currentPage = currentPage;
          this.pagination.limit = limit;
          // 当数据都返回时 loading 关闭
          this.tableLoading = false
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 分页器， 页面展示数量数量事件
    handleLimit(limit) {
      this.pagination.limit = limit;
      this.getAccountInfo();
    },

    // 修改账户信息
    updateAccountBtn(row) {
      this.dialogFormVisible = true
      let newRow = { ...row }
      // 将 目标账户权限分割为数组进行存储
      newRow.roles = row.roles.split(',')
      // row.roles = newRow.roles
      // console.log(row)
      this.userInfo = newRow
    },
    // 修改密码
    async updatePassword() {
      try {
        // 获取添加账户信息
        if (this.userInfo.password.length < 6 || this.userInfo.password.length > 16) {
          this.$message.warning('密码长度应为 6-16 位字符')
          return
        }
        let result = await this.$store.dispatch("studentAccount/getUpdateStudentPassword", this.userInfo)

        if (result.code === 200) {
          // 添加成功后 关闭弹出层
          this.dialogFormVisible = false
          this.$message.success('修改成功')
          this.getAccountInfo(this.pagination.currentPage)
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    },

    // 账户选中事件
    handleSelectionChange(rows) {
      this.accountStateList = rows
    },
    // 查询账户
    async findAccountBtn() {
      // 当查询框为空， 加载初始化状态
      if (!this.userAccount) {
        return this.getAccountInfo()
      }
      try {
        let result = await this.$store.dispatch('studentAccount/getFindStudentAccount', this.userAccount);
        if (result.code === 200) {
          this.$message.success('查询成功')
          this.userList = result.data
        }
      } catch (error) {
        this.$message.warning(`${error.message}`)
      }
    },
    // 重置查询
    resetBtn() {
      this.userAccount = ''
      this.getAccountInfo()
    },
  },
};
</script>

<style lang="less" scoped>
// span这种添加文字样式
.addAccountSpan {
  color: red;
  margin-left: 5px;
  cursor: pointer;
  text-decoration: underline;
}

.el-tag {
  margin-right: 10px;
}

/deep/.el-card__body:nth-of-type(1) {
  padding-bottom: 0;

}
</style>