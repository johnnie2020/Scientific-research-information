<template>
  <div>
    <van-nav-bar title="头条资讯-登录"/>
    <!-- van-form是整体表单组件  @submit是自定义事件-->
    <van-form @submit="onSubmit">
      <!-- van-field 是输入框（表单的一项） -->
      <van-field v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="请输入11位手机号"
        required
        :rules="[{ required: true, message: '请填写用户名',pattern:/^1[3-9]\d{9}$/ }]"
      />
      <!-- required：是否为必选字段 -->
      <!-- name是收集到的表单项中的key -->
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        label="密码"
        placeholder="请输入6位密码"
        required
        :rules="[{ required: true, message: '请正确填写密码' ,pattern:/^\d{6}$/}]"
      />
      <!--
            :属性名=“表达式”
            属性名=“字符串”
            属性后无值，默认为true
            block代表块级元素
            type（代表类型）
            native-type代表原生button的type属性
            代表这个van-button组件渲染的原生
            button标签type是submit提交整个表单的按钮
       -->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
        :loading = 'isLoading'
        :disabled = 'isLoading'
        loading-text="正在登录..."
        >登录</van-button>
      </div>
    </van-form>
</div>
</template>

<script>
import { loginAPI } from '@/api'
import { setToken } from '@/utils/token'
import { Notify } from 'vant'

// 定义用到的变量及方法
export default {
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码（密码-必须是246810后台规定死的）
      },
      isLoading: false

    }
  },
  methods: {
    // （提交方法 只有form整体通过验证，才能触发）
    async onSubmit (values) {
      // 可以直接用values（收集参数名和值）
      console.log('submit', values)
      console.log(this.user)
      this.isLoading = true
      try {
        const res = await loginAPI(this.user)
        console.log(res)
        Notify({ type: 'success', message: '登录成功' })
        setToken(res.data.data.token)
        //  跳转一定要写在最后->尽量最后执行
        //  location.href -> 当前浏览器地址和要跳转的地址一样（不包含#后面锚点信息）->不会刷新网页
        //  地址改变，就会导致网页刷新
        // location.href = 'www.baidu.com'
        // this.$router.push()压栈（会产生历史记录，可以回退）
        // this.$router.replace() 替换 （不会产生历史记录）
        this.$router.replace({
          path: '/layout/home' // 因为路由规则里/layout里没有重定向，所以直接在这里写全
        })
      } catch (error) {
        Notify({ type: 'danger', message: '账号或密码错误' })
      }

      // 网络请求完成后无论成功/失败，把状态关掉
      this.isLoading = false
    }
  }
}
</script>
<style scoped lang = 'less'>
/* .van-nav-bar{
  background-color: #007bff;
}

/* scoped穿透 */
/* /deep/ .van-nav-bar__title{
  color: antiquewhite;
}  */
</style>
