<template>
  <div class="layout">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="left_img">
          <el-avatar
            style="vertical-align: middle;margin-right:10px;"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <strong>{{userName}}</strong>
        </div>
        <span>学生信息管理系统</span>
        <div class="loginOut">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img
                style="width:40px;height:40px;border-radius: 10px;"
                src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                alt
              />
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-home" @click.native="$router.push('/home')">首页</el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit" @click.native="editPassword">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" @click.native="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 内容区 -->
      <el-container>
        <!-- 侧边栏 -->
        <Sidebar :authAdmin="authAdmin" :studentAdmin="studentAdmin" :course="course"/>
        <!-- 内容区域 -->
        <el-container class="el_cont">
          <!-- 面包屑 -->
          <!-- <Breadcrumb></Breadcrumb> -->

          <!-- 内容区域 -->
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <!-- 修改密码抽屉 -->
    <el-drawer class="editPassword-drawer" style="height:185%;" title="修改密码" :visible.sync="editPasswordDrawer" direction="ttb">
      <el-form ref="editPasswordForm" :rules="editPasswordRules" :model="passwordForm" label-width="80px">
        <el-form-item class="inputRow" label="账户" prop="userName" >
          <el-input v-model="passwordForm.userName" placeholder="输入账户" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item class="inputRow" label="旧密码" prop="oldPassword">
          <el-input v-model.trim="passwordForm.oldPassword" placeholder="旧密码"></el-input>
        </el-form-item>
        <el-form-item class="inputRow" label="新密码" prop="newPassword">
          <el-input v-model.trim="passwordForm.newPassword" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item class="inputRow" label="确认密码" prop="affirmPassword">
          <el-input v-model.trim="passwordForm.affirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:150px;" size="small" @click="cancelEdit">取消修改</el-button>
          <el-button  type="warning" size="small" @click="updatePassword">修改</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import Sidebar from "./Sidebar";
import Cont from "./Cont";
export default {
  name: "Layout",
  components: { Sidebar, Cont, Breadcrumb },
  data() {
    // 校验新密码
    const newPasswordCheck = (rules,value,callback) => {
      if (value.length < 6 || value.length > 16) {
        callback(new Error("密码长度为 6-16 位字符"));
      } else {
        callback();
      }
    }
    // 校验确认密码
    const affirmPasswordCheck = (rules,value,callback) => {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    }
    return {
      // 控制修改密码抽屉是否显示
      editPasswordDrawer: false,
      // 收集用户修改密码信息
      passwordForm: {
        userName: "",
        oldPassword: "",
        newPassword: "",
        affirmPassword: ""
      },
      // 表单检验
      editPasswordRules:{
        userName:[
          {required:true,message:'请输入账户名',trigger: "blur"}
        ],
        oldPassword:[
          {required:true,message:'请输入旧密码',trigger:'blur'}
        ],
        newPassword:[
          {required:true,message:'请输入新密码',trigger:'blur'},
          {validator:newPasswordCheck,trigger:'blur'}
        ],
        affirmPassword:[
          {required:true,message:'请再次输入密码',trigger:'blur'},
          {validator:affirmPasswordCheck,trigger:'blur'}
        ]
      },
      // 获取权限数据
      authAdmin:'',
      // 获取是否可以操作学生信息
      studentAdmin:'',
      // 获取是否可以操作课程
      course:''
    };
  },
  mounted() {
    this.getAuthInfo()
  },
  methods: {
    // 退出登录
    loginOut() {
      this.$message.success("退出成功");
      // 用户退出时 清除本地缓存
      sessionStorage.removeItem("userName")
      sessionStorage.removeItem('roles')
      // 跳转登录页面
      this.$router.push("/login")
    },
    // 修改密码
    editPassword() {
      this.editPasswordDrawer = true;
    },
    // 确定修改
    updatePassword(){
      this.$refs.editPasswordForm.validate( async (isTrue) => {
        if(isTrue){
          try {
            let result = await this.$store.dispatch('studentAdminAccount/getUserEditPassword', this.passwordForm);
            if(result.code === 200){
              this.$message.success('修改成功,请重新登录')
              // 修改成功后重新登录
              this.$router.push('/login')
              // 同时清除 userName
              sessionStorage.removeItem('userName')
            }
          } catch (error) {
            this.$message.error(error.message)
          }
        }
      })
    },
    // 取消修改
    cancelEdit(){
      this.editPasswordDrawer = false;
      // 取消修改时清空输入框内容， 防止下次用户修改时保留上次内容
      Object.assign(this.passwordForm,this.$options.data().passwordForm)
      // 点击取消时 移动表单校验， 防止点进去后显示上一次校验
      this.$refs.editPasswordForm.clearValidate()
    },
    // 获取权限数据
    async getAuthInfo(){
      let userName = sessionStorage.getItem('userName')
      this.passwordForm.userName = userName
      // 获取所有账户权限
      let admin = await this.$api.studentAdminAccount.reqFindAllUserAccount()
      let student = await this.$api.studentAccount.reqFindAllStudentAccount()
      let result = [...admin.data,...student.data]
      if(admin.code === 200 && student.code === 200){
        // 查询目前登录账户的详细信息
        let authAdmin = result.find(item => {
          return userName === item.id || item.studentNumber
        })
        sessionStorage.setItem('roles', authAdmin.roles)
        // 判断此账户中是否有权限管理权限，有则可以操作此内容， 反之不能操作
        this.authAdmin = authAdmin.roles.split(',').includes('权限管理')
        this.studentAdmin = authAdmin.roles.split(',').includes('学生管理')
        this.course = authAdmin.roles.split(',').some(role => ['课程管理', '学生'].includes(role));
      }
    }
  },
  computed: {
    // 标题根据路由展示
    title() {
      return this.$route.meta.title;
    },
    // 获取本地会话 userName
    userName() {
      return sessionStorage.getItem("userName");
    }
  }
};
</script>

<style lang="less" scoped>
// 修改抽屉标题
/deep/.el-drawer__header {
  color: orange;
  font-size: 26px;
}

// 修改抽屉背景
/deep/.el-drawer.ttb {
  background: #304156;
}

// 修改输入框栏样式
.inputRow {
  width: 400px;
  margin: 0 auto;
  margin-bottom: 30px;
  color:white;
}
.inputRow:nth-of-type(4){
  margin-bottom: 15px;
}

// 修改输入框旁边文字颜色
/deep/ .inputRow .el-form-item__label {
  color: white;
}

// 修改密码抽屉
.editPassword-drawer {
  // height: 500px;
  text-align: center;
}

.layout {
  color: #333;
  font-size: 14px;
  .loginOut {
    position: absolute;
    right: 10px;
    top: 10px;
    i {
      color: white;
    }
  }
  a {
    text-decoration: none;
  }
  .left_img {
    position: absolute;
    left: 30px;
    top: 0;
  }
}

// 面包屑
.el_cont {
  position: relative;
}

.el-menu-item-group__title {
  padding: 0 !important;
}
.el-header {
  font-size: 20px;
  font-weight: 600;
  // background: #304156 !important;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding-top: 40px;
  min-height: 90vh;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>