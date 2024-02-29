<template>
  <div class="app-container">
    <!-- 账号查询 -->
    <el-card style="margin-bottom:10px;position:relative;">
      <el-form inline @submit.native.prevent>
        <el-form-item><el-input v-model.trim="userAccount" placeholder="请输入账号"
            @keyup.native.enter="findAccountBtn" /></el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="findAccountBtn">查询</el-button>
        <el-button type="default" @click="reset()">重置</el-button>
      </el-form>
    </el-card>

    <!-- 账号信息 -->
    <el-card>
      <div slot="header">
        <span style="position:absolute;left:50%;font-size:20px;">账号管理</span>
        <div>
          <!-- 添加与批量添加按钮 -->
          <el-button type="primary" size="small" @click="addAccountBtn">添 加</el-button>
          <el-button :disabled="accountStateList.length === 0" type="danger" size="small"
            @click="batchDeleteAccountBtn">批量删除</el-button>
        </div>
      </div>
      <div>
        <!-- table表格：展示用户信息的地方 -->
        <el-table border stripe @selection-change="handleSelectionChange" v-loading="tableLoading" :data="userList">
          <el-table-column type="selection" width="55">
            <template slot-scope="{ row }">
              <el-checkbox v-if="row.id !== 'admin'"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column align="center" prop="id" label="账号" width="200" />
          <el-table-column align="center" prop="userName" label="用户名" width="150" />
          <el-table-column align="center" prop="userPassword" label="密码" width="150" />
          <el-table-column align="center" prop="roles" label="角色">
            <template slot-scope="{row}">
              <el-tag v-if="role" type="primary" v-for="(role, index) in row.roles.split(',')" :key="index">{{ role
              }}</el-tag>
              <div v-else><el-tag type="warning">此用户没有权限，请<span class="addAccountSpan"
                    @click="updateAccountBtn(row)">添加</span></el-tag></div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="230" align="center">
            <template slot-scope="{row}">
              <el-button type="warning" size="mini" icon="el-icon-edit" title="修改用户" @click="updateAccountBtn(row)" />
              <el-popconfirm :title="`确定删除 ${row.userName} 吗?`" @confirm="deleteAccountBtn(row)">
                <el-button v-if="row.id !== 'admin'" style="margin-left:10px" slot="reference" type="danger" size="small"
                  icon="el-icon-delete" title="删除用户" />
              </el-popconfirm>
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
    <el-dialog title="添加账号" :visible.sync="addDialogFormVisible" width="width">
      <el-form v-model="userInfo">
        <el-form-item label="账号" :label-width="formLabelWidth" required>
          <el-input style="width:80%;" placeholder="请输入账号" v-model="userInfo.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名" required :label-width="formLabelWidth">
          <el-input v-model="userInfo.userName" style="width:80%;" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" required>
          <el-input v-model="userInfo.userPassword" style="width:80%;" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-checkbox-group v-model="userInfo.roles">
            <!-- 超级管理员有且仅有一个 不可增加或删除 -->
            <!-- <el-checkbox :disabled="admin !== 'admin'" label="超级管理员" name="roles"></el-checkbox> -->
            <el-checkbox v-for="(item, index) in roleList" :label=item :key="index"
              v-if="item !== '超级管理员' && item !== '学生'" name="roles"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="addAccount">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改账号" :visible.sync="updateDialogFormVisible" width="width">
      <el-form v-model="userInfo">
        <el-form-item label="账号" :label-width="formLabelWidth" required>
          <el-input style="width:80%;" placeholder="请输入账号" v-model="userInfo.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" required :label-width="formLabelWidth">
          <el-input v-model="userInfo.userName" style="width:80%;" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" required>
          <el-input v-model="userInfo.userPassword" style="width:80%;" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-checkbox-group v-model="userInfo.roles">
            <!-- 超级管理员有且仅有一个 不可增加或删除 -->
            <!-- <el-checkbox :disabled="admin !== 'admin'" label="超级管理员" name="roles"></el-checkbox> -->
            <el-checkbox v-for="(item, index) in roleList" :label=item :key="index"
              v-if="item !== '超级管理员' && item !== '学生'" name="roles"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="updateAccount">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AdminAccount",
  data() {
    return {
      // 存储查询数据
      userAccount: '',
      // 用户信息
      userInfo: {
        id: '',
        userName: "",
        userPassword: '',
        roles: []
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
      // 权限列表
      roleList: [],
      // 控制添加用户对话框显示
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      // 控制角色分配对话框显示
      roleDialog: false,
      // 控制表单宽度
      formLabelWidth: "120px",
      // 收集选中时的账号信息
      accountStateList: []
    };
  },
  mounted() {
    this.getAccountInfo()
    this.getRoleInfo()
  },
  methods: {
    // 初始化账号信息
    async getAccountInfo(pager = 1) {
      this.pagination.currentPage = pager;
      try {
        let result = await this.$store.dispatch("studentAdminAccount/getFindAccount", this.pagination);
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
    // 获取角色信息
    async getRoleInfo() {
      try {
        let result = await this.$store.dispatch('roleAdmin/getFindRole');
        for (let i = 0; i < result.data.length; i++) {
          this.roleList.push(result.data[i].roleName)
        }
        if (result.code === 200) this.authList = result.data
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 分页器， 页面展示数量数量事件
    handleLimit(limit) {
      this.pagination.limit = limit;
      this.getAccountInfo();
    },
    // 添加账号
    addAccountBtn() {
      this.addDialogFormVisible = true;
      this.userInfo = { roles: [] }
    },
    // 修改账号信息
    updateAccountBtn(row) {
      // 根据登录的账号判断是否为超级管理员
      if (sessionStorage.getItem('userName') !== 'admin') {
        if (row.id == 'admin') {
          this.$message.error('不可修改管理员权限')
          return
        }
      }
      this.updateDialogFormVisible = true
      let newRow = { ...row }
      // 将 目标账号权限分割为数组进行存储
      newRow.roles = row.roles.split(',')
      this.userInfo = newRow
    },
    // 添加账号信息
    async addAccount() {
      try {
        // 获取添加账号信息
        let result = await this.$store.dispatch('studentAdminAccount/getAddUserAccount', this.userInfo);
        if (result.code === 200) {
          // 添加成功后 关闭弹出层
          this.addDialogFormVisible = false
          this.$message.success('添加成功')
          this.getAccountInfo(this.pagination.currentPage)
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 修改账号信息
    async updateAccount() {
      console.log(this.userInfo, '数据');
      try {
        // 获取添加账号信息
        let result = await this.$store.dispatch('studentAdminAccount/getUpdateUserAccount', this.userInfo);
        if (result.code === 200) {
          // 添加成功后 关闭弹出层
          this.updateDialogFormVisible = false
          this.$message.success('修改成功')
          this.getAccountInfo(this.pagination.currentPage)
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 删除单个账号
    async deleteAccountBtn(row) {
      try {
        let result = await this.$store.dispatch('studentAdminAccount/getDeleteUserAccount', row.id);
        if (result.code === 200) {
          this.$message.success('删除成功')
          this.getAccountInfo(this.userList.length > 1 ? this.pagination.currentPage : this.pagination.currentPage - 1)
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 批量删除账号
    async batchDeleteAccountBtn() {
      let userIdArr = this.accountStateList.map(item => {
        return item.id
      })
      try {
        let result = await this.$store.dispatch('studentAdminAccount/getBatchDeleteUserAccount', userIdArr);
        if (result.code === 200) {
          this.$message.success('批量删除成功')
          this.getAccountInfo(this.userList >= 1 ? this.pagination.currentPage : this.pagination.currentPage - 1)
        }
      } catch (error) {
        this.$message.error(`${error.messages}`)
      }
    },
    // 账号选中事件
    handleSelectionChange(rows) {
      this.accountStateList = rows
    },
    // 查询账号
    async findAccountBtn() {
      // 当查询框为空， 加载初始化状态
      if (!this.userAccount) {
        return this.getAccountInfo()
      }
      try {
        let result = await this.$store.dispatch('studentAdminAccount/getFindUserAccount', this.userAccount);
        if (result.code === 200) {
          this.$message.success('查询成功')
          this.userList = result.data
        }
      } catch (error) {
        this.$message.warning(`${error.message}`)
      }
    },
    close() {
      this.addDialogFormVisible = false
      this.updateDialogFormVisible = false
    },
    reset(){
      this.userAccount = ''
      this.getAccountInfo()
    }
  },
  computed: {
    // 获取此账号， 作用当此账号为 超级管理员时 可以将用户也设置为超级管理
    admin() {
      return sessionStorage.getItem('userName')
    },
  }
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

// 查询框提示
.hint {
  color: #999;
  font-size: 12px;
  position: absolute;
  left: 22px;
  top: 1px;

}
</style>