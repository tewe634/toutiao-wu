<template>
  <div class="name">
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model="value"
      :maxlength="name.length"
      :show-word-limit="true"
    />
  </div>
</template>

<script>
import { updataUserInfo } from '@/api'
export default {
  data() {
    return {
      value: this.name
    }
  },
  props: {
    name: {
      name: String,
      required: true
    }
  },
  methods: {
    // 取消
    onClickLeft() {
      this.$parent.$parent.showName = false
    },
    // 保存
    async onClickRight() {
      const data = { name: this.value }
      try {
        await updataUserInfo(data)
        this.$parent.$parent.showName = false
        this.$parent.$parent.getUserInfo()
      } catch (error) {
        this.$toast.fail('修改数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.name {
  :deep(.van-nav-bar) {
    background-color: #fff !important;
    .van-nav-bar__title {
      color: #000;
    }
  }
}
</style>
