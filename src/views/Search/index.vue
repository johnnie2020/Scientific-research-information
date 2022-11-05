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

      <!-- 搜索建议列表 -->
  <div class="sugg-list">
    <div class="sugg-item" v-for="(str,index) in suggestList" :key="index" v-html="lightFn(str,kw)"></div>
  </div>
  </div>

</template>

<script>
import { suggestListAPI } from '@/api'
export default {
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null, // 防抖的定时器
      suggestList: []

    }
  },
  methods: {

    // 输入框-内容实时改变触发事件方法
    inputFn () {
      clearTimeout(this.timer)
      // 防抖：延时执行逻辑代码，事件再次触发，清除上衣个定时器
      if (this.kw.length === 0) {
        this.suggestList = []
      } else {
        this.timer = setTimeout(async () => {
          const res = await suggestListAPI({
            keywords: this.kw
          })
          console.log(res)
          this.suggestList = res.data.data.options
        }, 300)
      }
    },
    lightFn (originStr, target) {
      // originStr:原来字符串
      // target：关键字
      // 字符串.replace() ->替换第一个符合条件
      // 字符串.replaceAll() ->替换全部
      // 如果要使用变量，作为正则的匹配条件，不能使用语法糖简化写法
      const reg = new RegExp(target, 'ig') // i忽略大小写，g全局匹配
      return originStr.replace(reg, (match) => { // match是关键字匹配的值(尽量保持原样)
        return `<span style="color: red">${match}</span>`
      })
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
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
