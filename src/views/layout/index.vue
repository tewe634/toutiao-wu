<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- 底部 -->
    <van-tabbar route>
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="item.to"
      >
        <template #icon>
          <span :class="`toutiao ${item.icon}`"></span>
          <p>{{ item.text }}</p>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      tabbarData: [
        {
          to: '/ ',
          icon: 'toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/video',
          icon: 'toutiao-shipin',
          text: '视频'
        },
        {
          to: '/qa',
          icon: 'toutiao-wenda',
          text: '问答'
        },
        {
          to: '/my',
          icon: 'toutiao-wode',
          text: '我的'
        }
      ]
    }
  }
}
</script>

<style scpoed lang="less">
.van-tabbar-item__icon {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-evenly;
  p {
    font-size: 0.32rem;
  }
  .toutiao {
    font-size: 0.5067rem;
  }
}
</style>
