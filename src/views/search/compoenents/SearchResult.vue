<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="item in resultList"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultApi } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      resultList: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
      error: false
    }
  },
  methods: {
    async getSearchResult() {
      try {
        const { data } = await getSearchResultApi(
          this.keywords,
          this.page,
          this.perPage
        )
        if (this.page <= 1) {
          this.resultList = data.data.results
        } else {
          const results = data.data.results
          this.resultList.push(...results)
          if (data.data.results.length < 10) {
            this.finished = true
          }
        }
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    onLoad() {
      this.page++
      this.getSearchResult()
    }
  },
  created() {
    this.getSearchResult()
  }
}
</script>

<style scoped lang="less"></style>
