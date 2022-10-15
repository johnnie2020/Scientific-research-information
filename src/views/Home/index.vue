<template>
  <div>
    <!-- 头部导航
    fixed 可以让头部div带固定定位样式
    （原理：给组件内的props传入true/false）
    (影响到组件内的动态样式：class) -->
    <div>
      <van-nav-bar fixed>
        <template v-slot:left>
          <img class="logo" src="@/assets/logo.png" alt="" />
        </template>
        <template #right>
          <!-- 1.坑：postcss只能翻译style里css样式代码，标签内行内样式它无法将px转rem，
          需要自己手动计算 -->
          <van-icon name="search" size="0.5rem" color="#fff" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 2.tab栏导航 -->
    <!--
      van-tabs 一行容器
      van-tabs 每个tab栏
      v-model 关联的激活项的下标
      tab栏＋内容

    3.(重要)每个van-tab代表一个标签导航，中间夹着内容，对应下属列表内容
     -->
    <div class="main">
      <van-tabs v-model="active" sticky offset-top="1.333333rem">
        <van-tab :title="obj.name" v-for="obj in userChannelList" :key="obj.id"
          >{{ obj.name }}内容</van-tab
        >
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api'
export default {
  data () {
    return {
      active: 0, // tab导航，激活索引
      userChannelList: [] // 用户选择的频道列表
    }
  },
  async created () {
    const res = await getUserChannelsAPI()
    console.log(res)
    this.userChannelList = res.data.data.channels
  }
}
</script>

<style>
.logo {
  width: 200px;
  height: 46px;
}
.main {
  padding-top: 48px;
}
</style>
