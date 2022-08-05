<template>
  <div>
    <van-cell v-for="(item, index) in heightLight" :key="index" icon="search">
      <template #title>
        <span v-html="item"> </span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionApi } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestionList: []
    }
  },
  methods: {
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionApi(this.keywords)
        this.suggestionList = data.data.options.filter(Boolean) // 筛选布尔值
      } catch (error) {
        this.$toast.fail('未搜索到结果')
      }
    }, 500)
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  computed: {
    heightLight() {
      const reg = new RegExp(this.keywords, 'ig') // 匹配传入的大小写
      return this.suggestionList.map((item) => {
        return item.replace(reg, (match) => {
          return `<span style="color:red">${match}</span>`
        })
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
