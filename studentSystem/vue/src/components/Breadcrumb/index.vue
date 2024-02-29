<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect === false||index===levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)" class="yes-redirect">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  mounted() {
    this.getBreadcrumb()
  },
  methods: {
    // 获取面包屑标题
    getBreadcrumb() {
      // console.log(this.$route)
      // 将当前路由有标题的过滤出来
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      // console.log(matched)
      const first = matched[0]

      // 如果此路由不为 home
      if (!this.isHome(first)) {
        // 将当前路由和首页路由连接起来，
        matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
      }
      // console.log('matched',matched)
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    // 判断此路由是否是首页
    isHome(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
    },
    // 面包屑点击事件
    handleLink(item) {
      console.log('item',item)
      const { redirect, path } = item
      // 当此面包屑路由有重定向时直接跳转此页面
      if (redirect) {
        console.log(path)
        // 当重定向和当前路由path一样时则终于后面代码运行
        // 作用：防止代码报：NavigationDuplicated: Avoided redundant navigation to current location: "/admin/adminAccount".
        if(redirect===this.$route.path){
          
          return false
        }
        // 
        this.$router.push(path)
        return false
      }
      // 跳转首页
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  position: absolute;
  top: -5px;
  left: 10px;
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  color: red;
  .no-redirect {
    color: #409eff;
    cursor: text;
  }
}
</style>
