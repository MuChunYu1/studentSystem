<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  // 监听账号登陆时长，在线超过24小时则强制重新登陆   24小时=24×60×60×1000毫秒
  watch:{
    $route(newVal,oldVal){
      let timer = setTimeout(() => {
        clearTimeout(timer)
        if(newVal.path === newVal.path){  
          if(newVal.path !== '/login'){
            this.$message.error('身份已过期，请重新登录')
          }
          sessionStorage.removeItem('userName')  
        }
      },24*60*60*1000)
    }
  }
}
</script>

<style>
body{
  background: #304156;
}
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #304156;
}
.el-table .el-table__cell{
 text-align: center !important;

}
/* ::-webkit-scrollbar{
  width: 18px;
  height: 18px;
  background-color:#F5F5F5
} */
</style>
