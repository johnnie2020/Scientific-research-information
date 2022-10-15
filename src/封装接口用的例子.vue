<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { getAllChannelsAPI } from '@/api'
// async不能处理错误信息
// try + catch 捕获await同步代码的错误
export default {
  async created () {
    try {
      const res = await getAllChannelsAPI().catch(err => {
        console.log(err)
      })
      console.log(res)
    } catch (error) {
      // console.dir是详细打印
      console.dir(error)
    }
  }
}

</script>

<style>

</style>
