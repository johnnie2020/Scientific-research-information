<template>
  <div>
    <!-- 有些路由一级路由页面无需缓存 -->
    <keep-alive exclude="Search,SearchResult,Detail,UserEdit">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>
<script>
// async不能处理错误信息
// try + catch 捕获await同步代码的错误
export default {
}

</script>

<style>

</style>
