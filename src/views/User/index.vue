<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <van-cell title="头像" is-link @click="$refs.inpt.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userObj.photo" />
      <input type="file" hidden ref="inpt" accept=".png" @change="onChange" />
    </van-cell>
    <van-cell title="昵称" is-link :value="name" @click="showName = true" />
    <van-cell
      title="性别"
      is-link
      :value="userObj.gender === 1 ? '女' : '男'"
      @click="showSex = true"
    />
    <van-cell
      @click="showTime = true"
      title="生日"
      is-link
      :value="birthday"
    />
    <!-- 弹出层 -->
    <van-popup
      class="avator-popup"
      v-model="show"
      :style="{ width: '100%', height: '100%' }"
      closeable
    >
      <updata-aouther
        @updata-avator="userObj.photo = $event"
        :photo="photo"
        v-if="show"
      ></updata-aouther>
    </van-popup>
    <van-popup v-model="showName" position="bottom" :style="{ height: '100%' }">
      <updata-name :name="name"></updata-name>
    </van-popup>
    <van-popup v-model="showSex" position="bottom" :style="{ height: '50%' }">
      <updata-sex></updata-sex>
    </van-popup>
    <van-popup v-model="showTime" position="bottom" :style="{ height: '50%' }">
      <updata-time ></updata-time>
    </van-popup>
  </div>
</template>

<script>
import { getInfo } from '@/api'
import UpdataAouther from './compoenents/UpdataAouther.vue'
import { resuletsImg } from '@/utils/photoImg'
import UpdataName from './compoenents/updataName.vue'
import UpdataSex from './compoenents/updataSex.vue'
import UpdataTime from './compoenents/updataTime.vue'
export default {
  components: { UpdataAouther, UpdataName, UpdataSex, UpdataTime },
  name: 'User',
  data() {
    return {
      userObj: {},
      show: false,
      photo: '',
      showName: false,
      showSex: false,
      showTime: false
    }
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getInfo()
        this.userObj = data?.data
      } catch (error) {
        this.$toast.fail('获取信息失败，请重新刷新')
      }
    },
    // 提交图片事件
    async onChange(e) {
      // 获取用户选择的图片对象
      const file = e.target.files[0]
      // 转图片对象转换为字符串
      // const url = window.URL.createObjectURL(file)
      const url = await resuletsImg(file)
      this.photo = url
      // 清空，防止重复的changge事件不触发
      e.target.value = ''
      this.show = true
    }
  },
  mounted() {
    this.getUserInfo()
  },
  computed: {
    name() {
      return this.userObj?.name
    },
    birthday() {
      return this.userObj?.birthday
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-nav-bar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
