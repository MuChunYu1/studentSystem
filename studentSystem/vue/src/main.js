import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui';
// import { Button,Form, FormItem,Input,Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api';

// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入滑块验证
import SlideVerify from 'vue-monoplasty-slide-verify';
// Vue.use(Button)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.prototype.$message = Message;

 
Vue.use(SlideVerify);
Vue.use(ElementUi)

Vue.prototype.$api = api
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    // 设置全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')
