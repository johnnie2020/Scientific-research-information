import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'highlight.js/styles/default.css'// 代码高亮
import 'amfe-flexible' // 引入flexible.js ->设置根标签字体大小，做移动端的适配
import directiveObj from './utils/directive'
import './VueComponent' // vant组件注册，单独的分离成一个js文件，让main只有一些全局的样式，js，全局指令
// 执行目标函数对象里install方法并传入Vue类
Vue.use(directiveObj)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
