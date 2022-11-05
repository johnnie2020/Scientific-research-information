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
          <van-icon name="search" size="0.5rem" color="#fff" @click="moveSearchPageFn" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 2.tab栏导航 -->
    <!--
      van-tabs 一行容器
      van-tabs 每个tab栏
      v-model 关联的激活项的下标
      tab栏＋内容

    3.（重要）每个van-tab代表一个标签导航，中间夹着内容，对应下属列表内容
    4.（重要）每个van-tab都对应独立的自己的ArticleList（多次）
    5.细节
    van-tab循环了很多标签导航，与之意义对应的内容列表不是上来都创建的，默认创建当前激活导航对应列表组件
    第一次切换到对应频道时，才会创建下属的ArticleList组件->created方法
    第二次切换就是显示/隐藏切换
     -->
    <div class="main">
      <van-tabs
        v-model="channelId"
        @change="channelChangeFn"
        animated
        sticky
        offset-top="1.2288888rem"
      >
        <van-tab
          :title="obj.name"
          v-for="obj in userChannelList"
          :key="obj.id"
          :name="obj.id"
          ><ArticleList :channelId="channelId"></ArticleList
        ></van-tab>
        <!-- 编辑频道图标 -->
      </van-tabs>
      <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="plusClickFn()"/>
    </div>

    <!-- 频道管理弹出层 -->
    <van-popup class="channel_popup" v-model="show">
      <ChannelEdit
      :userList="userChannelList"
      :unCheckList="unCheckChannelList"
      @addChannelEV="addChannelFn"
      @removeChannelEV="removeChannelFn"
      @closeEV="closeFn"
      ref="editRef"
      v-model="channelId"
      ></ChannelEdit>
      </van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI, getAllChannelsAPI, updateChannelsAPI, removeTheChannelAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'

// 目标1：获取不同的文章列表，需要传递不同的频道id
// 想法：让van-tabs的v-model关联频道id
// 目标2：点击tab标签页，重新发送请求，拿到新的数据
// 问题：每次切换tab拿到的数据都是新的
// 即使你用keep-alive也没有用（防止组件被销毁，而你的组件没有销毁，是在点击切换数据）
// 解决：外面现在用的是同一个数组切换数据（多个Articlelist用的是同一个数组，换会影响别人）
// 文章列表数据，请求，数组，分别放入到ArticleList内部（自己请求自己的数据）
// 外面只负责传入当前激活的频道id
export default {
  data () {
    return {
      channelId: 0, // tab导航，激活频道id（默认频道id为0，页面刚打开是推荐频道高亮-对应文章数据）
      userChannelList: [], // 用户选择的频道列表
      allChaanelList: [], // 所有频道列表
      // articleList: [] // 文章列表
      show: false // 频道弹出层显示或隐藏
    }
  },
  async created () {
    // 频道列表
    const res = await getUserChannelsAPI()
    console.log(res)
    this.userChannelList = res.data.data.channels
    const res2 = await getAllChannelsAPI()
    console.log(res2)
    this.allChaanelList = res2.data.data.channels

    // this.channelChangeFn()
  },
  methods: {
    // tabsq切换的事件 -> 获取文章列表数据
    async channelChangeFn () {
      // 文章列表
      // const res2 = await getAllArticleListAPI({
      //   channel_id: this.channelId, // 先默认请求推荐频道数据
      //   timestamp: (new Date()).getTime()
      // })
      // console.log(res2)
      // this.articleList = res2.data.data.results
    },
    showPopup () {
      this.show = true
    },
    plusClickFn () {
      this.show = true
    },
    async addChannelFn (channelObj) {
      this.userChannelList.push(channelObj)
      // 问题：为何只需要push，不需要从下面数组里移除
      // 还要把最新的数组，发送给后台
      // 数组里对象字段 --> 转换
      // 推荐频道不能传递-筛除不是推荐频道，剩下的频道对象
      const newArr = this.userChannelList.filter(obj => obj.id !== 0)
      const theNewArr = newArr.map((obj, index) => {
        const newObj = { ...obj }// 浅拷贝
        delete newObj.name
        newObj.seq = index

        return newObj // 让map方法吧新对象收集起来形成一个新数组
      })

      const res = await updateChannelsAPI({
        channels: theNewArr
      })
      console.log(res)

      // 上面的代码出了问题，新增时，名字被删除了
      // 原因：所有数组里的对象，都是同一个内存地址，影响到ChannelEdit中的对象
    },
    // 频道删除步骤
    // 首先在ChannelEdit中的我的频道绑定点击事件，将这个点击事件向上级index传，
    // index删除了之后，将数据传给后台，完成更新
    async removeChannelFn (channelObj) {
      const index = this.userChannelList.findIndex(obj => obj.id === channelObj.id)
      this.userChannelList.splice(index, 1)

      // 第一种方式：把现在用户数组的数据，在覆盖式的发给后台
      // 需要吧上面的更新数组的过程，封装一个函数，add和remove里调用
      // 第二种方式：只调用删除的接口

      const res = await removeTheChannelAPI({
        channelId: channelObj.id
      })
      console.log(res)
      // 知道：删除接口返回状态码204(Not Content) 无返回内容
    },
    closeFn () {
      this.show = false
      // 让内部的编辑状态回归false
      this.$refs.editRef = false
    },
    // 首页-右上角放大镜点击事件 -> 跳转到搜索页面
    moveSearchPageFn () {
      this.$router.push('/search')
    }
  },

  components: {
    ArticleList,
    ChannelEdit
  },
  // 计算属性
  computed: {
    // check () {
    //   this.allChaanelList.filter()
    // }

    unCheckChannelList () {
      // 目标：把左右频道挨个对象取出，去用户已选频道数组里查找，如果找不到，则让filter方法收集到一个新数组里
      const newArr = this.allChaanelList.filter(bigobj => {
        const index = this.userChannelList.findIndex(smallObj => {
          return smallObj.id === bigobj.id
        })
        // 如果找到了
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr

      // 上述代码简化写法
      // return this.allChannelList.filter(bigObj => (this.userChannelList.findIndex(smallObj => smallObj.id === bigObj.id) === -1))
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 200px;
  height: 46px;
}
.main {
  padding-top: 48px;
}
/* // 设置 tabs 容器的样式 */
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

/* // 设置小图标的样式 */
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.channel_popup{
  width: 100vw;
  height: 100vh;
  // 如果想给100%，要先给html和body设置100%
  // vw和vh是css3新出的单位，参考浏览器窗口的百分比
}
</style>>
