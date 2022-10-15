import theAxios from 'axios'
// import { reject, resolve } from 'core-js/fn/promise'
const axios = theAxios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 20000 // 20秒超时时间
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
