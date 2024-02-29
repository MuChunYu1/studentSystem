const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置代理服务器 解决跨域
  devServer:{
    proxy:{
      '/api':{
        target: 'http://localhost:3000/'
      }
    }
  }
})
