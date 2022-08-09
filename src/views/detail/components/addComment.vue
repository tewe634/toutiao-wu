<template>
  <div>
    <van-field
      v-model="message"
      rows="2"
      :autosize="true"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    >
    </van-field>
    <span class="release" @click="addComment"> 发布 </span>
  </div>
</template>

<script>
import { addComment } from '@/api'
export default {
  props: ['artickId', 'target', 'artId'],
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async addComment() {
      try {
        if (this.artickId) {
          const data = { target: this.artickId, content: this.message }
          const res = await addComment(data)
          const obj = res.data.data.new_obj
          this.$bus.$emit('comment', obj)
          this.message = ''
          this.$parent.$parent.show = false
          this.$toast.success('添加评论成功~')
        } else {
          try {
            const data = {
              target: this.target,
              content: this.message,
              art_id: this.artId
            }
            const res = await addComment(data)
            const obj = res.data.data.new_obj
            this.$bus.$emit('addList', obj)
            this.message = ''
            this.$emit('closeDone')
            this.$toast.success('添加评论成功~')
          } catch (error) {
            this.$toast.fail('添加评论失败')
          }
        }
      } catch (error) {
        this.$toast.fail('添加评论失败~')
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-field) {
  top: 1.3333rem;
  left: 0.5333rem;
  width: 7.9467rem;
  height: 2.3467rem;
  background-color: #ddd;
}
.release {
  font-size: 0.3733rem;
  color: #6ba3d8;
  position: relative;
  top: 0;
  left: 8.8rem;
}
</style>
