<template>
  <!-- 一条文章单元格 -->
  <div>
 <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ artObj.title }}</span>
        <!-- 单图 -->
        <img v-if="artObj.cover.type === 1" class="thumb" :src="artObj.cover.images[0]" alt="">
      </div>
      <div class="thumb-box" v-if="artObj.cover.type > 1 ">
        <img v-for="(imgUrl,index) in artObj.cover.images"
        :key="index"
        class="thumb"
        :src="imgUrl"
        alt="">
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ artObj.aut_name }}</span>
          <span>{{ artObj.comm_count }}评论</span>
          <span>{{ formatTime(artObj.pubdate) }}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" @click="show = true" />
      </div>
    </template>
  </van-cell>
  <van-action-sheet
  v-model="show"
  :actions="actions"
  @select="onSelect"
  @cancel="cancelFn"
  @close="closeFn"
  get-container="body"
  :cancel-text="bottomText"/>
  </div>

</template>

<script>
// 目标1：点击“反馈垃圾内容”数据的切换
// 1.监听点击事件，区分用户点击的是哪一个
// 2. 切换actions数组里的数据

// 目标2：二级反馈数据出现，取消按钮文字要换成“返回”
// ：cancel-text=“bottomText” 设置变量，onSelect中，把变量值换成“返回”

// 目标3：点击底部按钮，要区分判断
// 1.标签@cancel取消事件和事件方法
// 2，把里面bottomText的值，判断用户点击的是否为“返回”
// 把actions数据源换回成firstActions

import { timeAgo } from '@/utils/date'
import { firstActions, secondActions } from '@/api/report'
export default {
  props: {
    artObj: {
      type: Object
    }
  },
  data () {
    return {
      show: false,
      actions:
        firstActions, // 反馈面板选项数组（套对象）
      bottomText: '取消' // 底部按钮的文字
    }
  },
  methods: {
    formatTime: timeAgo, // 函数体是timeAgo
    onSelect (action, item) {
      console.log(action)// {name:'反馈垃圾内容'}
      console.log(item) // 索引值
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false

      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('disLikeEV', this.artObj.art_id)
        this.show = false // 无论成功或失败 - 直接让反馈面板隐藏
      } else { // 二级的反馈选项
        this.$emit('reportEV', this.artObj.art_id, action.value)
        this.show = false // 关闭，下面的cancel会帮你吧反馈选项切回来
      }
    },
    cancelFn () {
      if (this.bottomText === '返回') {
        this.show = true // 强制它回来
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    // 关闭面板-触发事件
    closeFn () {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin-left: 0;
    }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
