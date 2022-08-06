<template>
  <div>
    <van-cell v-for="item in resultList" :key="item.art_id" :title="item.title" />
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
      resultList: []
    }
  },
  methods: {
    async getSearchResult() {
      const { data } = await getSearchResultApi(this.keywords)
      this.resultList = data.data.results
    }
  },
  created() {
    this.getSearchResult()
  }
}
</script>

<style scoped lang="less"></style>
