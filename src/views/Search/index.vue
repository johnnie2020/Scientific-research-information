<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()"/>
      <!-- 搜索组件 -->
      <van-search
      v-model.trim="kw"
      v-fofo
      placeholder="请输入搜索关键词"
      background="#007BFF"
      shape="round"
      @input="inputFn" />
    </div>
  </div>
</template>

<script>
import { suggestListAPI } from '@/api'
export default {
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null // 防抖的定时器

    }
  },
  methods: {

    // 输入框-内容实时改变触发事件方法
    inputFn () {
      clearTimeout(this.timer)
      // 防抖：延时执行逻辑代码，事件再次触发，清除上衣个定时器
      this.timer = setTimeout(async () => {
        if (this.kw.length === 0) return
        const res = await suggestListAPI({
          keywords: this.kw
        })
        console.log(res)
      }, 300)
    }
  }

}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
</style>
