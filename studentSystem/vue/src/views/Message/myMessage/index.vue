<template>
  <div class="message">
    <!-- 查询表单 -->
    <el-card style="margin-bottom:10px;position:relative;padding-top:5px;">
      <el-form inline @submit.native.prevent>
        <el-form-item>
          <el-select v-model="issue" placeholder="请问题类型" style="width: 100%;">
            <el-option v-for="(item,index) in options"  :label="item.label" :value="item.value"></el-option>
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
    <el-card>
      <div slot="header">
        <span style="position:absolute;left:50%;font-size:20px;">问题反馈</span>
        <!-- 操作信息 -->
        <div class="addMessage">
          <el-button type="primary" size="small" @click="addMessageBtn">反馈问题</el-button>
          <el-button :disabled="messageStateList.length === 0" type="danger" size="small"
            @click="batchDeleteMessageBtn">批量删除</el-button>
        </div>
      </div>
      <!-- 信息 -->
      <el-table class="table" stripe :data="currentMessage" style="width: 100% ;margin-top:18px"
        @selection-change="handleSelectionChange" ref="table">
        <el-table-column type="selection" width="30px"></el-table-column>
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="userId" label="学号" width="200"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="150"></el-table-column>
        <el-table-column prop="issue" label="问题类型" width="150"></el-table-column>
        <el-table-column prop="detail" label="详情" width="300"></el-table-column>
        <el-table-column prop="createTime" label="提交时间" width="280"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="{row}">
            <el-button v-if="row.state == 0" size="mini" type="warning" >待处理</el-button>
            <el-button v-if="row.state == 1" size="mini" type="success" @click="updateMessageBtn(row)">已处理</el-button>
            <!-- 删除提示框 -->
            <el-popconfirm v-if="!flag" style="margin-left:10px;" :title="`确定删除吗？`"
              @confirm="deleteMessageBtn(row)">
              <el-button slot="reference" type="danger" size="mini" title="删除信息">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="text-align:center; margin-top:5px;" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[3, 5, 7, 9]"
        :page-size="pagination.limit" layout=" prev, pager, next, jumper, ->, total, sizes" :total="pagination.total"
        background></el-pagination>
    </el-card>

    <el-dialog title="反馈问题" :visible.sync="addDialogFormVisible" width="width">
      <el-form v-model="messageInfo">
        <el-form-item label="学号" required :label-width="formLabelWidth">
          <el-input v-model="messageInfo.userId" style="width:80%;" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" required>
          <el-input v-model="messageInfo.userName" style="width:80%;" ></el-input>
        </el-form-item>
        <el-form-item label="问题类型" :label-width="formLabelWidth" required>
          <el-select v-model="messageInfo.issue" placeholder="请选择问题" style="width: 80%;">
            <el-option v-for="(item,index) in options"  :label="item.label" :value="item.value"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="详情描述"   :label-width="formLabelWidth" required>
        <el-input type="textarea" v-model="messageInfo.detail" style="width: 80%;"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="addMessage">提交</el-button>
      </div>
    </el-dialog>
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

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "myMessage",
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
      // 当前用户
      user:'',
      options: [{
          value: '个人信息错误',
          label: '个人信息错误'
        }, {
          value: '选课信息错误',
          label: '选课信息错误'
        }, {
          value: '成绩错误',
          label: '成绩错误'
        }, {
          value: '其他',
          label: '其他'
        }],

    };
  },
  mounted() {
    this.getMessage()
    this.getUser()
  },
  methods: {
    // 选中状态切换事件
    handleSelectionChange(rows) {
      this.messageStateList = rows;
    },
    // 获取 分页后信息
    // 默认展示第一页数据 点击当前页面事件
    async getMessage() {
      const loading = this.$loading({
        lock: true,
        text: "数据加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      try {
        // 获取数据
        let result = await this.$store.dispatch("message/getMessage");
        if (result.code === 200) {
          this.messageList =[]
          // 获取数据
          let { data } = result;
          data.forEach( item => {
            if(item.userId == this.user){
              this.messageList.push(item)
            }
          })
          // 获取完后 关闭加载页
          loading.close();
        }
      } catch (error) {
        this.$message.error("获取数据失败");
        // 失败提示之后 关闭加载页
        loading.close();
      }
    },
    // 添加信息按钮事件
    addMessageBtn() {
      this.addDialogFormVisible = true;
      this.messageInfo = {
        userId: this.user,
        userName: '',
        issue: '',
        detail: '',
        createTime:''
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
          this.getMessage()
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
          this.getMessage()
        }
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
    // 删除信息
    async deleteMessageBtn(row) {
      try {
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
            this.getMessage()
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
          this.getMessage()
        } else {
          this.getMessage()
        }
      } catch (error) {
        this.$message.warning(`${error.message}`)
      }
    },
    // 展示页面数量
    handleSizeChange(val) {
      // 更新每页显示的数量
      this.pagination.limit = val;
      // 重新计算总页数
      this.pagination.totalPages = Math.ceil(this.messageList.length / this.pagination.limit);
      // 如果当前页码大于总页数，则将当前页码设置为总页数
      if (this.pagination.currentPage > this.pagination.totalPages) {
        this.pagination.currentPage = this.pagination.totalPages;
      }
      this.pagination.limit = limit;
/*       // 重新获取新数据
      this.getMessage() */
    },
    handleCurrentChange(val) {
      // 更新当前页码
      this.pagination.currentPage = val;
    },
    // 查询信息
    async findMessageBtn() {
      // 当查询框为空， 加载初始化状态
      if (!this.issue) {
        return this.getMessage()
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
        return this.getMessage()
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

    close() {
      this.addDialogFormVisible = false
      this.updateDialogFormVisible = false
    },
    // 重置查询
    reset() {
      this.issue = ''
      this.state = ''
      this.getMessage()
    },
    // 获取当前账号
    getUser(){
      this.user = sessionStorage.getItem('userName')
    },
 /*    changeMyMessage(){
      let newMessageList = []
      for(let i = 0; i < this.messageList.length; i++){
            if(this.messageList[i].userId == this.user){
              this.messageList
            }
          }
    } */
  },
  watch: {
    messageList() {
      // 计算总记录数
      this.pagination.total = this.messageList.length;
      // 计算总页数
      this.pagination.totalPages = Math.ceil(this.messageList.length / this.pagination.limit);
      // 如果当前页码大于总页数，则将当前页码设置为总页数
      if (this.pagination.currentPage > this.pagination.totalPages) {
        this.pagination.currentPage = this.pagination.totalPages;
      }
    },
  },
  computed: {
    currentMessage() {
      // 根据当前页码和每页显示的数量来截取数组
      const start = (this.pagination.currentPage - 1) * this.pagination.limit;
      const end = start + this.pagination.limit;
      return this.messageList.slice(start, end);
    },
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
    },
    
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