<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        background="#3296FA"
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onFocus"
        @cancel="$router.back()"
      />
      <!-- 动态组件显示历史建议结果 -->
      <component
        :is="componentName"
        :keywords="keywords"
        :resultList="resultList"
        @done="done"
      ></component>
    </form>
  </div>
</template>

<script>
import SearchHiosty from './compoenents/SearchHiosty.vue'
import SearchResult from './compoenents/SearchResult.vue'
import SearchSuggestion from './compoenents/SearchSuggestion.vue'
export default {
  name: 'search',
  components: { SearchSuggestion, SearchResult, SearchHiosty },
  data() {
    return {
      keywords: '',
      isShowSearch: false, // 判断是否点击回车
      resultList: JSON.parse(localStorage.getItem('results')) || []
    }
  },
  methods: {
    // 搜索时触发
    onSearch() {
      this.isShowSearch = true
      this.resultList.unshift(this.keywords)
      this.resultList = [...new Set(this.resultList)]
      localStorage.setItem('results', JSON.stringify(this.resultList))
    },
    // 获取焦点
    onFocus() {
      // 先将结果依赖的变量改成false
      this.isShowSearch = false
    },
    done() {
      this.resultList = JSON.parse(localStorage.getItem('results')) || []
    }
  },
  computed: {
    componentName() {
      // 未搜索
      if (this.keywords === '') {
        return SearchHiosty
      }
      // 点击回车
      if (this.isShowSearch) {
        return SearchResult
      }
      // 都不成立 显示建议
      return SearchSuggestion
    }
  }
}
</script>

<style scoped lang="less">
// 搜索
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
