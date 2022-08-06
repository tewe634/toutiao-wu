<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="login" v-if="isShow">登入的盒子
      <van-button @click="$router.push('/user')" >编辑按钮</van-button>
      </div>
      <div class="loginout" v-else>未登入的盒子</div>
    </header>
    <!-- 中间 -->
    <main>盒子</main>
    <!-- 底部-->
    <footer v-if="isShow">
      <button @click="loginOut">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'my',
  computed: {
    isShow() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
  // 清除token 传入空对象
    loginOut() {
      this.$store.commit('SEND_TOKEN', {})
    }
  }
}
</script>

<style scoped lang="less"></style>
