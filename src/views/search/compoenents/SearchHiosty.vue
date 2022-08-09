<template>
  <div>
    <van-cell title="搜索历史">
      <template>
        <van-icon v-if="!show" name="delete-o" @click="deleteResults" />
      </template>
      <template #extra>
        <div class="text" v-if="show">
          <span class="delcct" @click.once="deleteResult">全部删除</span>
          <span class="done" @click="done">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell v-for="(item, index) in list" :key="index" :title="item">
      <template #right-icon>
        <div v-show="show">
          <van-icon name="close" @click="icondele(item)" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: this.resultList,
      show: false,
      isShow: false
    }
  },
  props: {
    resultList: {
      type: Array
    }
  },
  methods: {
    // 显示隐藏
    deleteResults() {
      this.show = true
    },
    // 本地存储取数据
    getSearch() {
      this.list = localStorage.getItem('results')
    },
    // 删除全部
    deleteResult() {
      localStorage.removeItem('results')
      this.getSearch()
    },
    // 完成
    done() {
      this.show = false
      this.$emit('done')
    },
    // 单个删除
    icondele(str) {
      this.list = this.resultList.filter((item) => item !== str)
      localStorage.setItem('results', JSON.stringify(this.list))
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-cell) {
  .text {
    color: #969799;
    font-size: 0.32rem;
    .delcct {
      position: relative;
      left: -0.2667rem;
    }
  }
}
</style>
