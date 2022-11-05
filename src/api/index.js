// 统一封装接口方法
// 每个方法负责请求一个url地址
// 逻辑页面，导入这个接口方法，就能发请求
// 好处：请求的url路径可以在这里统一管理

import request from '@/utils/request.js'

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
  url: '/v1_0/user/channels'

})

// 更新覆盖频道
export const updateChannelsAPI = ({ channels }) => request({
  url: '/v1_0/user/channels',
  method: 'PUT',
  data: {
    channels // 用户已选整个频道数组
  }
})

// 删除用户指定的频道
export const removeTheChannelAPI = ({ channelId }) => request({
  url: `/v1_0/user/channels/${channelId}`,
  method: 'DELETE'
})

export const getAllArticleListAPI = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  method: 'GET',

  params: { // 这里的参数，axioshi绑定拼在URl？后面（查询字符串）
    channel_id,
    timestamp
  }
})

// 文章 - 反馈 - 不感兴趣
export const dislikeArticleAPI = ({ artId }) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',

  data: {
    target: artId
  }
})

// 文章-反馈 -垃圾内容
export const reportArticleAPI = ({ artId, type }) => request({
  url: '/v1_0/article/reports',
  method: 'POST',

  data: {
    target: artId,
    type: type,
    remark: '如果你想写,可以在逻辑页面判断下,如果点击类型是0,再给一个弹出框输入框输入其他问题,传参到这里'
  }
})

// 搜索-联想菜单列表
export const suggestListAPI = ({ keywords }) => request({
  url: '/v1_0/suggestion',
  params: {
    q: keywords
  }
})
