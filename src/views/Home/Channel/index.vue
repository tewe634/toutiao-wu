<template>
  <div class="channel">
    <van-cell title="我的频道" size="small">
      <van-button
        size="small"
        round
        class="edit_button"
        @click="isedit = !isedit"
        >{{ isedit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in channel"
        :key="item.id"
        :text="item.name"
        icon="cross"
        class="mychannel-item"
        :class="{ active: item.name === '推荐' }"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isedit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道" size="small"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannel"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend-item"
        @click="$emit('addChannel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getMyChannel } from '@/api'
export default {
  name: 'channel',
  data() {
    return {
      isedit: false,
      channels: []
    }
  },
  props: {
    channel: {
      type: Array,
      require: true
    }
  },
  computed: {
    recommendChannel() {
      return this.channels.filter((aItem) => {
        return !this.channel.find((mItem) => aItem.id === mItem.id)
      })
    }
  },
  methods: {
    // 调用接口
    async getMyChannel() {
      const { data } = await getMyChannel()
      this.channels = data.data.channels
    },
    // 点击切换
    async changeActive(index, item) {
      if (this.isedit) {
        // 删除我的频道
        if (item.name === '推荐') return
        this.$emit('delectChannel', item.id)
      } else {
        // 切换tab栏
        this.$parent.$parent.show = false
        this.$emit('change-active', index)
      }
    }
  },
  created() {
    this.getMyChannel()
  }
}
</script>

<style scoped lang="less">
.channel {
  padding-top: 1.333rem;
}
.edit_button {
  width: 104px;
  height: 48px;
  color: red;
  &.van-button--default {
    border-color: red;
  }
}
:deep(.van-grid-item__content) {
  background-color: #eee;
}
.recommend-item {
  :deep(.van-grid-item__content) {
    flex-direction: row;
    align-items: center;
  }
  :deep(.van-grid-item__icon) {
    font-size: 40px;
  }
}
:deep(.mychannel-item) {
  .van-grid-item__content {
    position: relative;
  }
  .van-grid-item__icon-wrapper {
    position: unset;
  }
  .van-icon-cross {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 30px;
    transform: translate(45%, -50%);
    border: 2px solid #000;
    border-radius: 50%;
    z-index: 300;
  }
}
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
</style>
