<template>
  <div>
    <van-cell title="搜索历史">
      <template>
        <van-icon name="delete-o" @click="deleteResults" />
      </template>
    </van-cell>
    <van-cell v-for="(item, index) in list" :key="index" :title="item" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    deleteResults() {
      localStorage.removeItem('results')
      this.getSearch()
    },
    getSearch() {
      this.list = JSON.parse(localStorage.getItem('results')) || []
    }
  },
  created() {
    console.log(1)
    this.getSearch()
  }
}
</script>

<style scoped lang="less"></style>
