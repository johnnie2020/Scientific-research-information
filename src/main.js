import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 引入flexible.js ->设置根标签字体大小，做移动端的适配
import {
  NavBar, Form, Field, Button, Tabbar, TabbarItem,
  Icon, Tab, Tabs, Cell, CellGroup, List, PullRefresh,
  ActionSheet, Popup, Row, Col, Badge, Search, Divider,
  Tag
} from 'vant'

Vue.use(Tag)
Vue.use(Divider)
Vue.use(Search)
Vue.use(Badge)
Vue.use(Col)
Vue.use(Row)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Button)
Vue.config.productionTip = false

// 封装中间件函数插件
const directiveObj = {
  install (Vue) {
    Vue.directive('fofo', {
      inserted (el) {
        // 组件所在van-search组件
        // 组件根标签是div，input在内部
        // 以上都是原生标签对象
        // 搜索页面 el是div
        // 文章评论 el是textarea
        // 以后el还可能是input
        // 知识点：原生DOM.nodeName 拿到标签名字（注意：大写的字符串）
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el本身不是输入框，尝试往里获取一下
          const theInput = el.querySelector('input')
          const theTextArea = el.querySelector('textarea')
          // 判断：不一定能获取得到，需要加判断，有值了，再执行.focus()才不报错
          if (theInput)theInput.focus()
          if (theTextArea)theTextArea.focus()
        }
      }
    })
  }
}

// 执行目标函数对象里install方法并传入Vue类
Vue.use(directiveObj)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
