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

// 用户 - 关注
export const userFollowedAPI = ({ userId }) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: userId
  }
})

// 用户 - 取消关注
export const userUnFollowedAPI = ({ userId }) => request({
  url: `/v1_0/user/followings/${userId}`,
  method: 'DELETE'
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

// 文章 - 获取详情
export const detailAPI = ({ artId }) => request({
  url: `/v1_0/articles/${artId}`
})

// 文章 - 点赞
export const likeArticleAPI = ({ artId }) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: artId
  }
})

// 文章取消点赞
export const unLikeArticleAPI = ({ artId }) => request({
  url: `/v1_0/article/likings/${artId}`,
  method: 'DELETE'

})

// 文章 - 获取评论列表
export const commentsListAPI = ({ id, offset = null, limit = 10 }) => request({
  url: '/v1_0/comments',
  params: { // //axios只针对params参数，如果发现键值对，值为null，会忽略此参数名和值不携带在url?后面
    type: 'a',
    source: id,
    offset,
    limit
  }
})

// 文章 - 评论 - 喜欢
export const commentLikingAPI = ({ comId }) => request({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target: comId
  }
})

// 文章 - 评论 - 取消喜欢
export const commentDisLikingAPI = ({ comId }) => request({
  url: `/v1_0/comment/likings/${comId}`,
  method: 'DELETE'

})

// 文章 - 评论 - 发布评论
export const commentSendAPI = ({ id, content, art_id = null }) => {
// 1.axios中，data请求体传参，如果值为null是不会忽略这个参数的
// 也会把参数名和值携带给后台（只有params遇到null才会忽略）
// 2.形参art_id可选参数，如果逻辑页面是对文章评论，则不需要传递art_id
// 所以这时，内部art_id值为null就证明此次调用，是针对文章评论

  // data请求体对象需要自己处理
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) { // 如果有本次有第三个参数，证明是对评论进行回复
    obj.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj

  })
}

// 搜索-联想菜单列表
export const suggestListAPI = ({ keywords }) => request({
  url: '/v1_0/suggestion',
  params: {
    q: keywords
  }
})

// 搜索 - 搜索结果列表
export const searchResultAPI = ({ page = 1, per_page = 10, q }) => request({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    page,
    per_page,
    q
  }
})
