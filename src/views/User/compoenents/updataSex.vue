<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      :default-index="this.$parent.$parent.userObj.gender === '男' ? 0 : 1"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { updataUserInfo } from '@/api'
export default {
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm(val) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const gender = val === '男' ? 0 : 1
        const data = { gender }
        await updataUserInfo(data)
        this.$parent.$parent.showSex = false
        this.$parent.$parent.getUserInfo()
      } catch (error) {
        this.$toast.fail('更改性别失败~')
      }
    },
    onCancel() {
      this.$parent.$parent.showSex = false
    }
  }
}
</script>

<style scoped lang="less"></style>
