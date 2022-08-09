<template>
  <van-cell-group @click="fn">
    <!-- 没有图片 -->
    <van-cell
      v-if="artickInfo.cover.type === 0"
      :title="artickInfo.title"
      :label="label"
    />
    <!-- 一张图片 -->
    <van-cell
      v-else-if="artickInfo.cover.type === 1"
      :title="artickInfo.title"
      :label="label"
    >
      <template #default>
        <van-image width="70" height="70" :src="artickInfo.cover.images[0]" />
      </template>
    </van-cell>
    <!-- 三张图片 -->
    <van-cell
      v-else-if="artickInfo.cover.type === 3"
      :title="artickInfo.title"
      :label="label"
    >
      <template #default>
        <van-image
          v-for="(item, index) in artickInfo.cover.images"
          :key="index"
          width="45"
          height="45"
          :src="item"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: 'ArtickItem',
  props: {
    artickInfo: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    fn() {
      this.$router.push({
        name: 'detail',
        params: { id: this.artickInfo.art_id }
      })
    }
  },
  computed: {
    label() {
      const art = this.artickInfo
      return `${art.aut_name} ${art.is_top}评论 ${art.pubdate}`
    }
  }
}
</script>

<style scoped lang="less"></style>
