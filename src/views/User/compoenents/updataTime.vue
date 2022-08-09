<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onconfirm"
      @cancel="$parent.$parent.showTime = false"
    />
  </div>
</template>

<script>
import { updataUserInfo } from '@/api'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1)
    }
  },
  methods: {
    async onconfirm(value) {
      const val = dayjs(value).format('YYYY-MM-DD')
      console.log(val)
      const data = { birthday: val }
      await updataUserInfo(data)
      this.$parent.$parent.showTime = false
      this.$parent.$parent.getUserInfo()
    }
  },
  computed: {
    currentDate: {
      get() {
        return new Date(
          dayjs(this.$parent.$parent.birthday).format('YYYY,MM,DD')
        )
      },
      set() {}
    }
  }
}
</script>

<style scoped lang="less"></style>
