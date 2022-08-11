<template>
  <van-popup v-model="shows" position="bottom" :style="{ height: '100%' }">
    <van-nav-bar
      :title="totalCount ? `${totalCount}条回复` : '暂无回复'"
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
          <span>{{ dayjs(itemObj.pubdate).fromNow() }}</span>
          <van-button round type="default"
            >回复{{ totalCount ? totalCount : 0 }}</van-button
          >
        </div>
      </template>
      <template #right-icon>
        <van-button round type="default" @click="getLike">
          <van-icon name="good-job-o" />
          {{ itemObj?.like_count ? itemObj.like_count : '赞' }}
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
    <commin-list v-if="shows" :comId="itemObj?.com_id"></commin-list>
    <!-- 底部 -->
    <van-button type="default" block @click="discuss">评论</van-button>
  </van-popup>
</template>

<script>
import { getLikeApi, getUnfollow } from '@/api'
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
      if (this.shows) {
        this.$store.commit('totalCountAdd')
      }
    },
    async getLike() {
      if (!this.itemObj.is_liking) {
        try {
          const data = { target: this.itemObj.com_id }
          await getLikeApi(data)
          this.$toast.success('点赞成功~')
          this.itemObj.like_count++
          this.itemObj.is_liking = !this.itemObj.is_liking
        } catch (error) {
          this.$toast.fail('点赞失败~')
        }
      } else {
        try {
          await getUnfollow(this.itemObj.com_id)
          this.$toast.success('取消成功')
          this.itemObj.like_count--
          this.itemObj.is_liking = !this.itemObj.is_liking
        } catch (error) {
          this.$toast.fail('取消失败')
        }
      }
    }
  },
  mounted() {
    this.$bus.$on('details', (val) => {
      this.itemObj = val
      this.shows = true
    })
  },
  computed: {
    totalCount() {
      return this.$store.state.totalCount
    }
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
