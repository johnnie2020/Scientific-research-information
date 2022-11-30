import { getToken } from '@/utils/token'
// import { toPrimitive } from 'core-js/fn/symbol'
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
// import Layout from '@/views/Layout'
// import Home from '@/views/Home'
// import User from '@/views/User'
// import Search from '@/views/Search'
// import SearchResult from '@/views/Search/SearchResult'
// import ArticleDetail from '@/views/ArticleDetail'
// import UserEdit from '@/views/User/UserEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home' // 默认显示layout和layout下的首页
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName:"Login" */ '@/views/Login'),
    // 路由独享守卫
    beforeEnter (to, from, next) {
      if (getToken()?.length > 0) {
        // next(false) // 留在原地，什么都不写
        next('/layout/home')
      } else {
        next() // 其他情况统统放行
      }
    }
  },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName:"Layout" */ '@/views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName:"Home" */ '@/views/Home'),
        meta: {
          scrollT: 0 // 保存首页离开时，滚动条位置
        }
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName:"User" */ '@/views/User')

      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:"Search" */ '@/views/Search')
  },
  { // 搜索结果页
    path: '/search/:keywords',
    component: () => import(/* webpackChunkName:"SearchResult" */ '@/views/Search/SearchResult')
  },
  { // 文章详情页
    path: '/detail',
    component: () => import(/* webpackChunkName:"ArticleDetail" */ '@/views/ArticleDetail')
  },
  { // 用户编辑页面
    path: '/user_edit',
    component: () => import(/* webpackChunkName:"UserEdit" */ '@/views/User/UserEdit')
  }
]

const router = new VueRouter({
  routes
})

// 路由 - 全局前置守卫（在路由真正跳转之前，执行此函数）
// 此函数可以决定路由是否跳转/取消/强制中断切换到别的路由
router.beforeEach((to, from, next) => {
  // 需求：如果你已经登录了，不让你切换到登录页面
  if (getToken()?.length > 0 && to.path === '/login') {
    next('/layout/home') // 留在原地/ 什么都不写
  } else {
    next() // 其他情况统统放行
  }
})

export default router
