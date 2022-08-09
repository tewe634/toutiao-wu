/* eslint-disable no-undef */
<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onLoad"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        @load="onLoad"
        :immediate-check="false"
        offset="0"
        :finished="finished"
        finished-text="没有更多内容了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArtickItem
          v-for="item in list"
          :key="item.art_id"
          :artickInfo="item"
        ></ArtickItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtickApi } from '@/api'
import ArtickItem from '@/components/ArtickItem.vue'
export default {
  name: 'ArtickList',
  components: { ArtickItem },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      pre_timestamp: '',
      finished: false,
      error: false,
      refreshing: false
    }
  },
  created() {
    this.getFirstPageArtickApi()
  },
  methods: {
    async getFirstPageArtickApi() {
      try {
        const { data } = await getArtickApi(this.id, +new Date())
        this.list = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('请重新刷新获取')
      }
    },
    // 滚动事件
    async onLoad() {
      try {
        const { data } = await getArtickApi(this.id, this.pre_timestamp)
        if (data.data.pre_timestamp === null) {
          this.finished = true
        }
        const results = data.data.results
        if (this.refreshing) {
          this.list.unshift(...results)
        } else {
          this.list.push(...results)
        }
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
