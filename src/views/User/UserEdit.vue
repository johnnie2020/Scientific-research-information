<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="profileObj.photo"
            @click="imageClickFn"
          />
          <!-- file 选择框 -->
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="profileObj.name"
        @click="nameClickFn"
      />
      <van-cell title="生日" is-link :value="profileObj.birthday" @click="birthdayClickFn" />
    </van-cell-group>
    <!-- 姓名修改的弹窗 -->
    <van-dialog
      v-model="show"
      title="标题"
      show-cancel-button
      :before-close="beforeCloseFn"
    >
      <input type="text" v-fofo v-model="inputUserName" />
    </van-dialog>

    <!-- 时间选择器 -->
    <van-popup v-model="dateTimePickerShow" round position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="dateCancelFn"
        @confirm="confirmFn"
      />
    </van-popup>
  </div>
</template>

<script>
import { userProfileAPI, updateUserPhotoAPI, updateProfileAPI } from '@/api'
import Notify from '@/ui/Notify'
import { formatDate } from '@/utils/date'
import { mapMutations } from 'vuex'
export default {
  name: 'UserEdit',
  data () {
    return {
      profileObj: {}, // 用户基本资料
      show: false, // 控制姓名修改输入框的出现/隐藏
      inputUserName: '', // 修改名字-弹出框输入框绑定值
      minDate: new Date(1920, 0, 1), // 最小范围
      maxDate: new Date(), // 最大范围（默认系统日期-今日）
      currentDate: new Date(2021, 0, 17), // 组件当前显示时间
      dateTimePickerShow: false // 日期选择器-弹出层显示/隐藏
    }
  },
  async created () {
    const res = await userProfileAPI()
    console.log(res)
    this.profileObj = res.data.data
  },
  methods: {
    ...mapMutations(['SET_USERPHOTO']),
    async onFileChange (e) {
      if (e.target.files.length === 0) return // 用户可能没有选择图片 文件阻止代码往下
      console.log(e.target.files[0]) // 数组其实是一个特殊的对象
      // 创建FormData对象
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0]) // 请求体里加入一对参数名和值

      const res = await updateUserPhotoAPI(theFd)
      console.log(res)
      this.profileObj.photo = res.data.data.photo
      this.SET_USERPHOTO(res.data.data.photo) // 更新成功后同步到vuex中
    },
    // 图片 - 点击事件
    imageClickFn () {
      this.$refs.iptFile.click() // JS模拟标签的事件触发
    },
    nameClickFn () {
      this.show = true
      this.inputUserName = this.profileObj.name
    },
    // 姓名 - 确认框 - 关闭前回调函数
    async beforeCloseFn (action, done) {
      // action是点击按钮的提示符
      if (action === 'confirm') {
        // 点确定
        // 计算机中，对字符（文字）有多种编码方式
        // 计算机眼中只有0和1， -> 编码成一种表现形式
        // utf-8 编码成我们认识的 中文字符
        // url 编码 %E4%BB
        // unicode 编码 \u4eca\u665a
        // \u4e00 -> 就是1
        const res = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (res.test(this.inputUserName) === true) {
          await updateProfileAPI({
            name: this.inputUserName
          })
          this.profileObj.name = this.inputUserName // 更新成功 - 回显到页面上
          done()
        } else {
          // 没通过校验，给用户提示
          Notify({
            type: 'warning',
            message: '用户名只能是1-7位中英文数字组合'
          })
          done(false) // 让弹窗关闭
        }
      }
    },
    birthdayClickFn () {
      this.dateTimePickerShow = true // 时间选择器出现
      // 数据和页面显示 -> 年-月-日 格式的字符串
      // datetimerPicker组件 -> 日期对象
      this.currentDate = new Date(this.profileObj.birthday)// 组件显示默认生日
    },
    // 日期选择器 - 取消事件
    dateCancelFn () {
      this.dateTimePickerShow = false
    },
    // 日期选择器 - 完成确认的事件
    async confirmFn () {
      // 日期选择器里currentDate是日期对象，而后端要的是年-月-日字符串
      await updateProfileAPI({
        birthday: formatDate(this.currentDate)
      })
      this.dateTimePickerShow = false
      this.profileObj.birthday = formatDate(this.currentDate) // 单元格同步
    }

  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
:deep(.van-dialog__content){
  input {
    text-align: center;
    padding: 0;
    outline: none;
    border: none;
  }
}
</style>
