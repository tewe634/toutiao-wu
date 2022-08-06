<template>
  <div class="update-avator">
    <img :src="photo" ref="image" class="img" />

    <footer>
      <span @click="$parent.$parent.show = false">取消</span>
      <span @click="uploadAouther">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { updataAouther } from '@/api'
export default {
  props: {
    photo: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    // 上传图片
    uploadAouther() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
          const { data } = await updataAouther(blob)
          this.$emit('updata-avator', data.data.photo)
        })
        this.$toast.success('图片上传成功~')
      } catch (error) {
        this.$toast.fail('图片上传失败~')
      } finally {
        this.$parent.$parent.show = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-avator {
  height: 100%;
  position: relative;

  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 50%;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40px;
  }
}
</style>
