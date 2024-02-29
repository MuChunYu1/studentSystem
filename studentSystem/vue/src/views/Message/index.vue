<template>
  <div class="message">
    <!-- 查询表单 -->
    <el-card style="margin-bottom:10px;position:relative;padding-top:5px;">
      <el-form inline @submit.native.prevent>
        <el-form-item>
          <el-select v-model="issue" placeholder="请选择问题" style="width: 100%;">
            <el-option label="忘记密码" value="忘记密码"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="findMessageBtn">查询</el-button>
        <el-form-item style="margin-left: 30px;">
          <el-select v-model="state" placeholder="请选择处理状态" style="width: 100%;">
            <el-option label="已处理" value="1"></el-option>
            <el-option label="待处理" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="findStateBtn">查询</el-button>
        <el-button type="default" @click="reset()">重置</el-button>
      </el-form>
    </el-card>

    <!-- 信息管理 -->
    <el-card style="padding-bottom:20px;">
      <div slot="header">
        <span style="position:absolute;left:50%;font-size:20px;">问题反馈</span>
        <!-- 操作信息 -->
        <div class="addMessage" v-if="flag">
          <el-button :disabled="messageStateList.length === 0" type="danger" size="small"
            @click="batchDeleteMessageBtn">批量删除</el-button>
        </div>
      </div>
      <!-- 信息 -->
      <el-table class="table" stripe :data="messageList" style="width: 100% ;margin-top:18px"
        @selection-change="handleSelectionChange" ref="table">
        <el-table-column v-if="flag" type="selection" width="30px"></el-table-column>
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="userId" label="学号" width="200"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="150"></el-table-column>
        <el-table-column prop="issue" label="问题类型" width="150"></el-table-column>
        <el-table-column prop="detail" label="详情" width="300"></el-table-column>
        <el-table-column prop="createTime" label="提交时间" width="280"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="{row}">
            <el-button v-if="row.state == 0" size="mini" type="warning" @click="updateMessageBtn(row)">待处理</el-button>
            <el-button v-if="row.state == 1" size="mini" type="success" @click="updateMessageBtn(row)">已处理</el-button>
            <!-- 删除提示框 -->
            <el-popconfirm v-if="flag" style="margin-left:10px;" :title="`确定删除吗？`"
              @confirm="deleteMessageBtn(row)">
              <el-button slot="reference" type="danger" size="mini" title="删除信息">删除</el-button>
            </el-popconfirm>
        
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="text-align:center; margin-top:5px;" @size-change="handleSizeChange"
        @current-change="getMessageInfo" :current-page="pagination.currentPage" :page-sizes="[3, 5, 7, 9]"
        :page-size="pagination.limit" layout=" prev, pager, next, jumper, ->, total, sizes" :total="pagination.total"
        background></el-pagination>
    </el-card>

    <el-dialog title="信息详情" :visible.sync="updateDialogFormVisible" width="width">
      <el-form v-model="messageInfo">
        <el-form-item label="学号" required :label-width="formLabelWidth">
          <el-input v-model="messageInfo.userId" style="width:80%;" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" required>
          <el-input v-model="messageInfo.userName" style="width:80%;" disabled></el-input>
        </el-form-item>
        <el-form-item label="反馈类型" :label-width="formLabelWidth" required>
          <el-input v-model="messageInfo.issue" style="width:80%;" disabled></el-input>
        </el-form-item>
        <el-form-item label="详情" :label-width="formLabelWidth" required>
          <el-input v-model="messageInfo.detail" style="width:80%;" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="updateMessage">处理完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      // 所有信息
      messageList: [],
      // 存储类型查询数据
      issue: '',
      // 存储状态查询数据
      state: null,
      // 信息
      messageInfo: {
        messageId: '',
        userId: '',
        userName: '',
        issue: '',
        detail: '',
        createTime: '',
      },
      // 控制添加用户对话框显示
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      // 控制表单宽度
      formLabelWidth: "120px",
      // 存储被选中信息
      messageStateList: [],
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
    this.getMessageInfo()
    // this.changeFlag()
  },
  methods: {
    // 选中状态切换事件
    handleSelectionChange(rows) {
      this.messageStateList = rows;
    },
    // 获取 分页后信息
    // 默认展示第一页数据 点击当前页面事件
    async getMessageInfo(Pager = 1) {
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
        let result = await this.$store.dispatch("message/getFindPageMessage", this.pagination);
        if (result.code === 200) {
          // 获取数据
          let { currentPage, limit, total, data } = result;
          this.messageList = data;
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
    // 添加信息按钮事件
    addMessageBtn() {
      this.addDialogFormVisible = true;
      this.messageInfo = {
        messageId: '',
        message: '',
        xf: '',
        teacher: ''
      }
    },
    // 修改信息
    updateMessageBtn(row) {
      this.updateDialogFormVisible = true
      let newRow = { ...row }
      this.messageInfo = newRow
    },
    // 添加信息
    async addMessage() {
      console.log(this.messageInfo, '数据');
      try {
        // 获取添加账号信息
        let result = await this.$store.dispatch('message/getAddMessage', this.messageInfo);
        if (result.code === 200) {
          // 添加成功后 关闭弹出层
          this.addDialogFormVisible = false
          this.$message.success('添加成功')
          this.getMessageInfo(this.pagination.currentPage)
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 修改信息
    async updateMessage() {
      try {
        // 获取添加账号信息
        let result = await this.$store.dispatch('message/getUpdateMessage', this.messageInfo);
        if (result.code === 200) {
          // 添加成功后 关闭弹出层
          this.updateDialogFormVisible = false
          this.$message.success('处理成功')
          this.getMessageInfo(this.pagination.currentPage)
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 删除信息
    async deleteMessageBtn(row) {
      try {
        console.log(row, 'ro');
        let result = await this.$store.dispatch(
          "message/getDeleteMessage",
          row.messageId
        );
        // 删除成功提示
        if (result.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // 再次获取数据
          if (this.messageList.length > 1) {
            this.getMessageInfo(this.pagination.currentPage)
          } else {
            this.getMessageInfo(this.pagination.currentPage - 1)
          }
        }
      } catch (error) {
        this.$message.error(`删除失败,${error.message}`);
      }
    },
    // 批量删除信息
    async batchDeleteMessageBtn() {
      let messageIdArr = this.messageStateList.map(item => item.messageId)
      try {
        // 获取批量删除信息
        let result = await this.$store.dispatch('message/getBatchDeleteMessage', messageIdArr);
        if (result.code === 200) {
          this.$message({
            message: '批量删除成功',
            type: 'success'
          })
        }
        // 删除后 再次获取数据
        if (this.messageList >= 1) {
          this.getMessageInfo(this.pagination.currentPage)
        } else {
          this.getMessageInfo(this.pagination.currentPage - 1)
        }
      } catch (error) {
        this.$message.warning(`${error.message}`)
      }
    },
    // 展示页面数量
    handleSizeChange(limit) {
      this.pagination.limit = limit;
      // 重新获取新数据
      this.getMessageInfo()
    },

    // 查询信息
    async findMessageBtn() {
      // 当查询框为空， 加载初始化状态
      if (!this.issue) {
        return this.getMessageInfo()
      }
      console.log(this.issue);
      try {
        let result = await this.$store.dispatch('message/getFindMessage', this.issue);
        if (result.code === 200) {
          this.$message.success('查询成功')
          this.messageList = result.data
        }
      } catch (error) {
        this.$message.warning(`${error.message}`)
      }
    },
    // 查询信息
    async findStateBtn() {
      // 当查询框为空， 加载初始化状态
      if (!this.state) {
        return this.getMessageInfo()
      }
      console.log(this.issue);
      try {
        let result = await this.$store.dispatch('message/getStateMessage', this.state);
        if (result.code === 200) {
          this.$message.success('查询成功')
          this.messageList = result.data
        }
      } catch (error) {
        this.$message.warning(`${error.message}`)
      }
    },
    /* // 学生增加选课
    async addStudentMessageBtn(row) {
      try {
        // 获取选择信息
        let result = await this.$store.dispatch('studentScore/getAddStudentMessage', { messageId: row.messageId, studentId: sessionStorage.getItem("userName") });
        if (result.code === 200) {
          this.$message.success('选课成功')
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    }, */

    close() {
      this.addDialogFormVisible = false
      this.updateDialogFormVisible = false
    },
    // 重置查询
    reset() {
      this.issue = ''
      this.state = ''
      this.getMessageInfo()
    },

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

};
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
// deep 深度选择器
/deep/.el-card__body {
  padding: 20px 20px 0 20px !important;
}

.message {
  .addMessage {
    margin-bottom: 10px;
  }
}

el-table-column {}

/deep/.el-card__header {
  padding: 10px 20px 0px 20px !important;
}
</style>