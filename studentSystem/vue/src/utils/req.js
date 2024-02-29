import axios from 'axios'
import store from '@/store';
// 引入进度条
import nprogress from 'nprogress';

// 引入进度条样式
import 'nprogress/nprogress.css'

const req = axios.create({
  baseURL: '/api',
  timeout: 3000
})
req.interceptors.request.use(
  config => {
    nprogress.start()
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    // console.log('-----',config)
    // console.log('请求拦截器')
    // 每次发请求携带 token 过去
    if(sessionStorage.getItem('TOKEN')){
      config.headers.Authorization = `Bearer ${sessionStorage.getItem('TOKEN')}`
    }
    return config
  },
  error => {
    console.log('请求已拦截') // for debug
    return Promise.reject('请求已拦截')
  }
)

req.interceptors.response.use(
  response => {
    const res = response.data
    // 当请求成功时 将数据返回出去
    if(response.status === 200){
      nprogress.done()
      return res
    }else{
      return Promise.reject(new Error(`response error，${res.message}`))
    }
  },
  error => {
    console.log('err' + error.message) // for debug
    return Promise.reject('响应拦截了' + error.message)
  }
)

export default req