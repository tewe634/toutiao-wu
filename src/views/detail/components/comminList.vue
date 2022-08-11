<template>
  <!-- 评论 -->
  <van-list
    v-model="loading"
    :finished="finished"
    :immediate-check="this.comId ? true : false"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="(item, index) in list" :key="index">
      <template #icon>
        <van-image width="36" height="36" round :src="item.aut_photo" />
      </template>
      <template #title>
        <div class="user-name">{{ item.aut_name }}</div>
        <div class="comment-content">{{ item.content }}</div>
        <div class="bottom-info">
          <span>{{ dayjs(item.pubdate).fromNow()}}</span>
          <van-button round type="default" size="mini" @click="details(item)"
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </template>
      <template #right-icon>
        <van-button round type="default" size="mini" @click="getLike(item)">
          <van-icon name="good-job-o" />
          {{ item?.like_count ? item.like_count : '赞' }}
        </van-button>
      </template>
    </van-cell>
  </van-list>
</template>

<script>
import { getLikeApi, getUnfollow, getNewsTrait } from '@/api'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      offset: null,
      limit: 10
    }
  },
  props: ['comId'],
  methods: {
    // 点赞品论
    async getLike(obj) {
      if (!obj.is_liking) {
        try {
          const data = { target: obj.com_id }
          await getLikeApi(data)
          this.$toast.success('点赞成功~')
          obj.like_count++
          obj.is_liking = !obj.is_liking
        } catch (error) {
          this.$toast.fail('点赞失败~')
        }
      } else {
        try {
          await getUnfollow(obj.com_id)
          this.$toast.success('取消成功')
          obj.like_count--
          obj.is_liking = !obj.is_liking
        } catch (error) {
          this.$toast.fail('取消失败')
        }
      }
    },
    // 滚动事件
    async onLoad() {
      try {
        if (this.comId) {
          const params = {
            type: 'c',
            source: this.comId,
            offset: this.offset,
            limit: this.limit
          }
          const { data } = await getNewsTrait(params)
          this.offset = data.data.last_id
          this.$store.commit('totalCount', data.data.total_count)
          // this.$parent.totalCount = data.data.total_count
          if (data.data.results.length < 10) {
            this.list.push(...data.data.results)
            // this.list = data.data.results
            this.finished = true
            this.loading = false
          } else {
            this.list.push(...data.data.results)
            this.loading = false
          }
        } else {
          const params = {
            type: 'a',
            source: this.$route.params.id,
            offset: this.offset,
            limit: this.limit
          }
          const { data } = await getNewsTrait(params)
          this.$store.commit('totalCounts', data.data.total_count)
          this.offset = data.data.last_id
          if (data.data.results.length < 10) {
            this.list.push(...data.data.results)
            this.finished = true
            this.loading = false
          } else {
            this.list.push(...data.data.results)
            this.loading = false
          }
        }
      } catch (error) {
        this.$toast.fail('请求评论失败~')
      }
    },
    // 品论详情
    details(obj) {
      this.$bus.$emit('details', obj)
    }
  },
  mounted() {
    this.$bus.$on('comment', (val) => this.list.unshift(val))
    this.$bus.$on('addList', (val) => this.list.unshift(val))
  },
  beforeDestroy() {
    this.$bus.$off('comment')
    this.$bus.$off('addList')
  }
}
</script>

<style scoped lang="less"></style>
