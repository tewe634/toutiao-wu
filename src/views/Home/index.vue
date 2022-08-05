<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          class="search-btn"
          round
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 文章 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channel" :key="item.id">
        <ArtickList :id="item.id"></ArtickList>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <Channel
        :channel="channel"
        @change-active="active = $event"
        @delectChannel="delectChannel"
        @addChannel="addChannel"
      ></Channel>
      <!-- $event在自定义事件中相当于接收传递的第一个参数 -->
    </van-popup>
  </div>
</template>

<script>
import {
  delectChannel,
  addChannel,
  SetMyChannelToLocal,
  getMyChannelBylocal
} from '@/api'
import { getChannel } from '@/api/channel'
import ArtickList from './ArtickList/index.vue'
import Channel from './Channel/index.vue'
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      channel: [],
      show: false
    }
  },
  components: { ArtickList, Channel },
  computed: {
    isLoding() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    insertChannel() {
      if (this.isLoding) {
        this.getChannel()
      } else {
        const mychannel = getMyChannelBylocal()
        if (mychannel.length !== 1) {
          this.channel = mychannel
        } else {
          this.getChannel()
        }
      }
    },
    async getChannel() {
      try {
        // 判断是否登入赋值
        const { data } = await getChannel()
        this.channel = data.data.channels
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取失败，请重新刷新')
      }
    },
    // 自定义事件删除我的频道数据
    async delectChannel(id) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        // 判断登入状态
        if (this.isLoding) {
          await delectChannel(id)
        } else {
          // 剩余数据存到浏览器
          SetMyChannelToLocal(this.channel.filter((i) => i.id !== id))
        }
        this.channel = this.channel.filter((i) => i.id !== id)
        this.$toast.success('删除频道成功~')
      } catch (error) {
        this.$toast.fail('删除频道失败')
      }
    },
    // 添加-
    async addChannel(item) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        if (this.isLoding) {
          await addChannel(item.id, this.channel.length)
        } else {
          SetMyChannelToLocal([...this.channel, item])
        }
        this.channel.push(item)
        this.$toast.success('添加频道成功~')
      } catch (error) {
        this.$toast.fail('添加频道失败')
      }
    }
  },
  created() {
    this.insertChannel()
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
.van-tab__pane {
  // 符号的两侧必须由空格
  min-height: calc(100vh - 92px - 88px - 100px);
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: fixed;
  top: 92px;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 99;
  background-color: #fff;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-nav-bar) {
  position: sticky;
  top: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 1.2267rem;
  z-index: 99;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;
  }
}
:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
