// 统一封装接口方法
// 每个方法负责请求一个url地址
// 逻辑页面，导入这个接口方法，就能发请求
// 好处：请求的url路径可以在这里统一管理

import request from '@/utils/request.js'
import { getToken } from '@/utils/token'

// 登录-登录接口
// axios内部，会把参数对象转成json字符串的格式发个后台
// axios内部，会自动携带请求参数（header）里Content-type：application\json

export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 获取所有频道
export const getAllChannelsAPI = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 获取 - 获取用户选择的频道
// 注意:用户没有登录，默认返回后台设置的默认频道列表

export const getUserChannelsAPI = () => request({
  url: '/v1_0/user/channels',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }

})
