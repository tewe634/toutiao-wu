<template>
  <div>
    <!-- 二级路由 -->
    <transition name="slide-fade">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
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
  provide() {
    return {
      reload: this.reload
    }
  },
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
      ],
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
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
.toutiao {
  position: relative;
  top: 0.1867rem;
}
.slide-fade {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  top: 0;
  right: 0;
  position: absolute;
  transform: translateX(100%);
}
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s ease;
  transform: translateX(-100%);
  z-index: 100;
}
</style>
