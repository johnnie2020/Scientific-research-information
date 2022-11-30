import theAxios from 'axios'
// import router from '@/router'
import Notify from '@/ui/Notify'
import { getToken, removeToken } from './token'// setToken
// import { getNewTokenAPI } from '@/api'
import router from '@/router'

// import { reject, resolve } from 'core-js/fn/promise'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 50000 // 50秒超时时间
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 目标：统一携带token
  // 判断本地有token再携带，判断具体api/index.js里没有携带Authorization,我在添加上去
  // 未定义叫undefined，null具体的值你得赋予才叫空
  // ？.可选链操作符，如果前面对象里没有length，整个表达式在原地返回undefined
  // 如果getToken()在原地有值,是个token字符串，才能调用length获取长度
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
// 本质：就是一个函数
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.dir(error)
  // console.log(this) // undefined
  if (error.response.status === 401) {
    // 不能使用this.$router(因为this不是vue组件对象无法调用$router)
    // 解决：this.$router为了拿到router路由对象，所以直接去上面y引入@/router下router对象
    Notify({ type: 'warning', message: '身份已过期' })

    removeToken() // 先清除token，才能让路由守卫判断失效，放行去登录页
    // 方式1：清除token，强制跳转到登录，用户有感知
    // router.currentRoute相当于在vue文件内this.$route -> 当前路由对象信息
    // fullPath，路由对象里完整路由路径 ，就是#后面的一切
    router.replace(`/login?path=${router.currentRoute.fullPath}`)
    //   const res = await getNewTokenAPI()

  //   // 新的token回来之后做什么
  //   // 1.更新token在本地
  //   setToken(res.data.data.token)
  //   // 2.更新新的token在请求头里
  //   error.config.headers.Authorization = `Bearer ${res.data.data.token}`
  //   // 3.未完成这次请求，再次发起
  //   // error.config就是上一次请求的配置对象
  //   // 结果我们要return回原本逻辑页面调用地方 - 还是return回去一个promise对象
  //   return axios(error.config)
  //   // 方式2：使用refresh_token换回新的token再继续使用，js代码实现，用户无感知（效果好）
  // } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
  //   // 刷新的refresh_token也过期了
  //   localStorage.clear() // 清除localStarage里所有值
  //   Notify({ type: 'warning', message: '身份已过期' })
  //   router.replace('/login')
  }
  return Promise.reject(error)
})

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  }) // axios在原地留下promise对象

//   return new Promise((resolve, reject) => {
//     // 判断如果params有值，需要自己写js代码，把params对象里key和value拼接到url上
//     $.ajax({
//       url,
//       data,
//       headers,
//       type: method,
//       sucess:(res) =>{
  //     resolve(res)
  // },
  // error:err =>{
  //     reject(err)
  // }
//     })
//   })
}

// axios({
//   url: '请求地址',
//   method: '请求方式',
//   params: {},
//   data: {},
//   headers: {}

// })

// 如果不封装，那么会出现一种问题，如果要更新request.js里封装网络请求的工具
// 将axios换成jquery的$.ajax

// import $ from 'jquery'
// export default $.ajax

// $.ajax({
//     url:'请求地址',
//     type:'请求方式',
//     data:{},
//     headers:{}
// })
