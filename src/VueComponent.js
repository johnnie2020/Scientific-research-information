import Vue from 'vue'
import {
  NavBar, Form, Field, Button, Tabbar, TabbarItem,
  Icon, Tab, Tabs, Cell, CellGroup, List, PullRefresh,
  ActionSheet, Popup, Row, Col, Badge, Search, Divider,
  Tag, Image, Dialog, DatetimePicker, Loading, Lazyload
} from 'vant'

Vue.use(Lazyload, {
  preLoad: 0.8, // 屏幕高度范围百分比0.8，预加载范围
  error: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0166445895317da8012060c8c081a6.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671864745&t=c529ec059054952fa8f8fd9372ecda4c'
})// 懒加载图片失败，使用错误提示图片
Vue.use(Loading)
Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(Image)
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
