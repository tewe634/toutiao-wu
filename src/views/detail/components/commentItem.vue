<template>
  <van-popup v-model="shows" position="bottom" :style="{ height: '100%' }">
    <van-nav-bar
      :title="num ? `${num}条回复` : '暂无回复'"
      left-arrow
      @click-left="shows = false"
    />
    <!-- 查看的信息 -->
    <van-cell>
      <template #icon>
        <van-image width="36" height="36" round :src="itemObj?.aut_photo" />
      </template>
      <template #title>
        <div class="user-name">{{ itemObj?.aut_name }}</div>
        <div class="comment-content">{{ itemObj?.content }}</div>
        <div class="bottom-info">
          <span>{{ itemObj?.pubdate }}</span>
          <van-button round type="default"
            >回复{{ itemObj?.reply_count }}</van-button
          >
        </div>
      </template>
      <template #right-icon>
        <van-button round type="default" @click="getLike(itemObj?.com_id)">
          <van-icon name="good-job-o" />
          赞
        </van-button>
      </template>
    </van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <add-comment
        :target="itemObj?.com_id"
        :artId="itemObj?.aut_id"
        @closeDone="closeDone"
      ></add-comment>
    </van-popup>
    <van-cell title="全部回复" />
    <commin-list
      :comId="itemObj?.com_id"
      @listLength="listLength"
    ></commin-list>
    <!-- 底部 -->
    <van-button type="default" block @click="discuss">评论</van-button>
  </van-popup>
</template>

<script>
import AddComment from './addComment.vue'
import ComminList from './comminList.vue'
export default {
  data() {
    return {
      shows: false,
      itemObj: {},
      show: false,
      num: 0
    }
  },
  components: { AddComment, ComminList },
  methods: {
    discuss() {
      this.show = true
    },
    closeDone() {
      this.show = false
    },
    listLength(num) {
      this.num = num
    }
  },
  mounted() {
    this.$bus.$on('details', (val) => {
      this.itemObj = val
      this.shows = true
    })
  }
}
</script>

<style scoped lang="less">
:deep(.van-nav-bar) {
  position: sticky;
  top: 0;
  .van-icon {
    color: #fff;
  }
}
:deep(.van-button--block) {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
