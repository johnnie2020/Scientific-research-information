import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fd3%2Fd6%2F8c%2Fd3d68cb4f2a2dbf3db1ead7653e196d9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671764308&t=e8eeaf031c0a95de4a32484428636f40'
  }, // 头像地址（默认值）
  getters: {
  },
  mutations: {
    // 编码风格，mutations最好大写（区分）
    // 给state中的变量赋值
    SET_USERPHOTO (state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})
