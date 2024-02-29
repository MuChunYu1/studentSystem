<template>
  <div class="aside">
    <!-- 控制展开和关闭组件 -->
    <!-- <el-radio-group v-model="isCollapse" class="openOrCloseBtn">
      <template>
        <button v-if="isCollapse" @click="isCollapse = !isCollapse"><i class="el-icon-s-unfold"></i></button>
        <button v-else @click="isCollapse = !isCollapse"><i class="el-icon-s-fold"></i></button>
      </template>
    </el-radio-group> -->
    <!-- 侧边栏 
      default-active： 刷新时默认展示页面
      router：启动路由
      collapse： 控制展开和关闭
    -->
    <el-aside width="200px">
      <el-menu unique-opened :default-active="defaultPage" router class="el-menu-vertical-demo" background-color="#304156"
        text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
        <!-- 首页 -->
        <el-menu-item index="/home">
          <i class="el-icon-house"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- 学生管理 -->
        <el-submenu v-if="studentAdmin || !flag" index="1">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>{{ flag ? '学生管理': '个人信息' }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-if="flag" index="/student/studentInfo">学生信息</el-menu-item>
            <el-menu-item v-if="flag" index="/student/studentScore">学生成绩</el-menu-item>
            <el-menu-item v-if="flag" index="/student/studentAccount">学生账号</el-menu-item>
            <el-menu-item v-if="!flag" index="/student/myInfo">个人信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 课程管理 -->
        <el-submenu v-if="course" index="2">
          <template slot="title">
            <i class="el-icon-reading"></i>
            <span>课程管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/course/course">
              <span slot="title">课程信息</span>
            </el-menu-item>
            <el-menu-item index="/course/selectionCourse" v-if="flag">
              <span slot="title">选课信息</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 信息管理 -->
        <el-submenu  index="3">
          <template slot="title">
            <i class="el-icon-chat-line-square"></i>
            <span>{{ flag ? '信息管理': '问题反馈' }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-if="flag" index="/message/message">
              <span slot="title">学生反馈</span>
            </el-menu-item>
            <el-menu-item v-if="!flag" index="/message/myMessage">
              <span slot="title">问题反馈</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 权限管理 -->
        <el-submenu v-if="authAdmin" index="4">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/adminAccount">
              <span slot="title">账户管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/adminRole">
              <span slot="title">角色管理</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-aside>

  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: ['authAdmin', 'studentAdmin', 'course'],
  data() {
    return {
      // 控制侧边是否显示
      isCollapse: false,
      // 控制页面刷新时路由跳转对应页面
      defaultPage: this.$route.path,
      // 学生端
      flag: true,
      accountList: []
    };
  },
  mounted() {
  },
  created() {
    this.changeFlag(); // 在页面加载时执行 changeFlag 方法
  },
  methods: {
    changeFlag() {
      if(sessionStorage.getItem('roles') == '学生'){
        this.flag = false
      }else{
        this.flag = true

      }
      /* let rolesList = sessionStorage.getItem('roles').split(',')
      for (let i = 0; i < rolesList.length; i++) {
        if (rolesList[i] == '学生') {
          
        } else {
        }
      } */
    }
  },
  computed: {
    /* role() {
      return sessionStorage.getItem('roles');
    } */
  },
  watch: {
    // 监听路由，当路由发生变化的时候侧边栏默认路由和随之变化
    $route() {
      this.defaultPage = this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
.aside {
  position: relative;
  height: 690px;
  background: #304156;
}

// 展开或关闭按钮
.openOrCloseBtn {
  position: absolute;
  top: 0;
  left: 168px;
  z-index: 1;

  button {
    font-size: 20px;
    border: none;
    color: white;
    background: #304156;

    &:hover {
      background: #273546;
    }
  }
}

.el-radio-button__inner {
  padding: 0 !important;
}

.el-aside {
  overflow: hidden;
  color: #333;
  // text-align: center;
  line-height: 200px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 690px;
}
</style>