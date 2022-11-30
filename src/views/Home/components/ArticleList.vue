<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <ArticleItem
          v-for="obj in list"
          :key="obj.art_id"
          :artObj="obj"
          @reportEV="reportFn"
          @disLikeEV="dislikeFn"
          @click.native="itemClickFn(obj.art_id)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '../../../components/ArticleItem.vue'
import { dislikeArticleAPI, getAllArticleListAPI, reportArticleAPI } from '@/api'
import Notify from '@/ui/Notify'

// 问题1：网页刚打开，created里请求个onload里请求同时发送，请求的都是最新数据
// onload中，2次一样的数据合并，数据重复，key重复了
// 原因：van-list组件，组件挂在时，默认就会判断一次是否触底
// 第一页数据也是网络请求回来的，标签先挂载了，数据回来更新DOM，所以标签没有高度，list的load时间上来就触发
// 解决方案1：list组件添加：immediate-check = “false” 上来初始化时不要判定
// 解决方案2：onload第一行，写数组长度的判断

export default {
  props: {
    // list: Array // 文章列表数组
    channelId: Number // 频道id
  },
  data () {
    return {
      list: [], // 文章列表数组
      loading: false, // 底部加載狀態
      finished: false, // 底部完成状态
      theTime: new Date().getTime(), // 用于分页
      isLoading: false // 顶部加载状态
    }
  },
  components: {
    ArticleItem
  },
  created () {
    this.getArticleListFn()
  },
  methods: {
    // 专门负责发送请求
    async getArticleListFn () {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId, // 先默认请求推荐频道数组
        timestamp: this.theTime
      })
      // pre_timestamp
      // 下一段开头的那篇文章事件戳
      // 第一次 系统时间（timestamp） ->  后台 返回0-9条数据 -> 携带第10条pre_timestamp值返回
      // 第二次（timestamp）- 上一次pre_timesatmp（代表告诉说，从指定的时间戳再往后找10个）10-19条，20条pre_timestamp返回
      console.log(res)
      // created()上来第一次list是空数组，合并空数组没问题
      // onload（）触底加载更多，2个数组合并也没问题
      this.list = [...this.list, ...res.data.data.results]
      this.theTime = res.data.data.pre_timestamp

      this.loading = false // 如果不关闭，底部一直是加载中状态，下次触底会再触发onLoad
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      }
      // 顶部加载状态改为false
      this.isLoading = false
    },
    // 底部加载的事件方法
    onLoad () {
      // immediate-check：内部不要进行判断判断而已，监听滚动事件的代码还在
      // 第一个频道滚动到底部，在切换第二个频道的时候（新建内容没有那么高），滚动会从底部滚动回到顶部
      // 这个时候发生了滚动，所以滚动事件还是触发了，immediate-check判断无效

      if (this.list.length === 0) {
        this.loading = false // 第一次上面还是判断触底（触发onloading方法时loading自动改true）
        // 如果不改回来，下次触底就不在执行onload方法
        return // 如果页面没有数据，没有高度，让本次onload逻辑代码不往下执行
      }

      this.getArticleListFn()
    },
    // 顶部刷新数据的方法
    async onRefresh () {
      // list数组清空，来一份新的数据
      this.list = []
      this.theTime = new Date().getTime()

      this.getArticleListFn()
    },
    // 反馈的不感兴趣
    async dislikeFn (id) {
      await dislikeArticleAPI({
        artId: id
      })
      // res里没有什么有用的信息，所以await往下放行，就证明请求和响应成功，反馈成功
      Notify({ type: 'success', message: '反馈成功' })
    },
    // 反馈-垃圾内容
    async reportFn (id, value) {
      await reportArticleAPI({
        artId: id,
        type: value
      })
      Notify({
        type: 'success',
        message: '举报成功'
      })
    },
    // 文章单元格-点击事件
    itemClickFn (id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }
}
</script>

<style>
</style>
