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
          <span>{{ item.pubdate }}</span>
          <van-button round type="default" @click="details(item)"
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </template>
      <template #right-icon>
        <van-button
          round
          type="default"
          @click="getLike(item.com_id)"
        >
          <van-icon name="good-job-o" />
          {{item?.like_count ? item.like_count : '赞'}}
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
      isLike: true,
      offset: null,
      limit: 10
    }
  },
  props: ['comId'],
  methods: {
    // 点赞品论
    async getLike(id) {
      if (this.isLike) {
        const data = { target: id }
        const res = await getLikeApi(data)
        console.log(res)
      } else {
        const { data } = await getUnfollow(id)
        console.log(data)
      }
      this.isLike = !this.isLike
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
          this.$parent.totalCount = data.data.total_count
          if (data.data.results.length < 10) {
            this.list = data.data.results
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
          this.offset = data.data.last_id
          this.$parent.totalCount = data.data.total_count
          if (data.data.results.length < 10) {
            this.list = data.data.results
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
  },
  watch: {
    list: {
      deep: true,
      immediate: true,
      handler() {
        this.$emit('listLength', this.list.length)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
