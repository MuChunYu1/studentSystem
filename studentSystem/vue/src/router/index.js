import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../layout';

Vue.use(VueRouter)

// 常量路由（每个角色都能访问的路由）
export const constRoutes = [
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children:[
      {
        path:'home',
        name:'home',
        component: () => import('../views/Home'),
        meta:{title:'首页'}
      }
    ]
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
    meta:{title:'登录'}
  },
  // 忘记密码
  {
    path: '/forget',
    name: 'forget',
    component: () => import( '../views/Forget'),
    meta:{title:'忘记密码'}
  },
]

// 异步路由（分配后访问的路由）
export const asyncRoutes = [
  // 账户管理
  {
    path: '/admin',
    component:Layout,
    redirect: '/admin/adminAccount',
    meta:{title:'权限管理'},
    children:[
      {
        path:'adminAccount',
        name:'adminAccount',
        component:() => import('@/views/AdminAccount'),
        meta:{title:'账户管理'}
      },
      {
        path:'adminRole',
        name:'adminRole',
        component:() => import('@/views/AdminRole'),
        meta:{title:'角色管理'}
      }
    ]
  },
  //学生信息
  {
    path:'/student',
    component: Layout,
    redirect:'/student/studentInfo',
    meta:{title:'学生管理'},
    children:[
      {
        path:'studentInfo',
        name:'studentInfo',
        component: () => import('../views/StudentSystem/studentInfo'),
        meta:{title:'学生信息'}
      },
      {
        path:'studentScore',
        name:'studentScore',
        component: () => import('../views/StudentSystem/studentScore'),
        meta:{title:'学生成绩'}
      },
      {
        path:'studentAccount',
        name:'studentAccount',
        component: () => import('../views/StudentSystem/studentAccount'),
        meta:{title:'学生账号'}
      },
      {
        path:'myInfo',
        name:'myInfo',
        component: () => import('../views/StudentSystem/myInfo'),
        meta:{title:'学生账号'}
      }
    ]
  },
  // 课程信息
  {
    path:'/course',
    component: Layout,
    redirect:'/course/course',
    meta:{title:'课程管理'},
    children:[
      {
        path:'course',
        name:'course',
        component: () => import('../views/Course'),
        meta:{title:'课程信息'}
      },
      {
        path:'selectionCourse',
        name:'selectionCourse',
        component: () => import('../views/Course/selectionCourse'),
        meta:{title:'选课信息'}
      }
    ]
  },
  // 信息管理
  {
    path:'/message',
    component: Layout,
    redirect:'/message/message',
    meta:{title:'信息管理'},
    children:[
      {
        path:'message',
        name:'message',
        component: () => import('../views/Message'),
        meta:{title:'学生反馈'}
      },
      {
        path:'myMessage',
        name:'myMessage',
        component: () => import('../views/Message/myMessage'),
        meta:{title:'问题反馈'}
      }
    ]
  },
]

// 任意路由 （404）
export const willRouters = [
  // 404 重定向
  { path: '*', redirect: '/404', hidden: true },
  { path:'/404',name:'404',component:() => import('@/views/404'),meta:{title:'not found'}}
]

// 所有路由
const routes = [
  // 账户管理
  {
    path: '/admin',
    component:Layout,
    redirect: '/admin/adminAccount',
    meta:{title:'权限管理'},
    children:[
      {
        path:'adminAccount',
        name:'adminAccount',
        component:() => import('@/views/AdminAccount'),
        meta:{title:'账户管理'}
      },
      {
        path:'adminRole',
        name:'adminRole',
        component:() => import('@/views/AdminRole'),
        meta:{title:'角色管理'}
      }
    ]
  },
  //学生信息
  {
    path:'/student',
    component: Layout,
    redirect:'/student/studentInfo',
    meta:{title:'学生管理'},
    children:[
      {
        path:'studentInfo',
        name:'studentInfo',
        component: () => import('../views/StudentSystem/studentInfo'),
        meta:{title:'学生信息'}
      },
      {
        path:'studentScore',
        name:'studentScore',
        component: () => import('../views/StudentSystem/studentScore'),
        meta:{title:'学生成绩'}
      },
      {
        path:'studentAccount',
        name:'studentAccount',
        component: () => import('../views/StudentSystem/studentAccount'),
        meta:{title:'学生账号'}
      },
      {
        path:'myInfo',
        name:'myInfo',
        component: () => import('../views/StudentSystem/myInfo'),
        meta:{title:'学生账号'}
      }
    ]
  },
  // 课程信息
  {
    path:'/course',
    component: Layout,
    redirect:'/course/course',
    meta:{title:'课程管理'},
    children:[
      {
        path:'course',
        name:'course',
        component: () => import('../views/Course'),
        meta:{title:'课程信息'}
      },
      {
        path:'selectionCourse',
        name:'selectionCourse',
        component: () => import('../views/Course/selectionCourse'),
        meta:{title:'选课信息'}
      }
    ]
  },
    // 信息管理
    {
      path:'/message',
      component: Layout,
      redirect:'/message/message',
      meta:{title:'信息管理'},
      children:[
        {
          path:'message',
          name:'message',
          component: () => import('../views/Message'),
          meta:{title:'学生反馈'}
        },
        {
          path:'myMessage',
          name:'myMessage',
          component: () => import('../views/Message/myMessage'),
          meta:{title:'问题反馈'}
        }
      ]
    },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children:[
      {
        path:'home',
        name:'home',
        component: () => import('../views/Home'),
        meta:{title:'首页'}
      }
    ]
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
    meta:{title:'登录'}
  },
  // 忘记密码
  {
    path: '/forget',
    name: 'forget',
    component: () => import( '../views/Forget'),
    meta:{title:'忘记密码'}
  },

  // 404 重定向
  { path: '*', redirect: '/404', hidden: true },
  { path:'/404',name:'404',component:() => import('@/views/404'),meta:{title:'not found'}}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  let userName = sessionStorage.getItem('userName') || undefined
  // 动态改变标题
  document.title = to.meta.title
  // console.log('to',to,'form',from)
  // 当 sessionStorage 里面没有 userName，同时去的页面不是登录页面 则强制返回登录页
  if(!userName || false){
    // 当前往的页面是注册时 则还是放行的
    if(to.path === '/forget' || to.path === '/login'){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
});

export default router


