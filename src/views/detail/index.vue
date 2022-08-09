<template>
  <div>
    <header>
      <van-nav-bar title="黑马头条" left-arrow @click-left="$router.back()" />
    </header>
    <main>
      <van-loading v-if="isShow" type="spinner" :vertical="true"
        >加载中..</van-loading
      >
      <!-- 通用错误 -->
      <van-empty
        image="error"
        v-if="isError"
        description="请求超时请重新刷新"
      />
      <!-- 网络错误 -->
      <van-empty image="network" v-if="isNetwork" description="服务器错误" />
      <h1>{{ artick.title }}</h1>
      <van-row type="flex" justify="center" align="center">
        <van-col span="3" type="flex" justify="center" align="center">
          <van-image width="33" height="33" :src="artick.aut_photo" round />
        </van-col>
        <van-col span="13" type="flex" align="space-between">
          <p>{{ artick.aut_name }}</p>
          <p>{{ artick.pubdate }}</p>
        </van-col>
        <van-col span="8" type="flex" justify="space-between" align="center">
          <van-button
            :icon="isAttention ? 'plus' : ''"
            round
            size="small"
            :type="isAttention ? 'info' : 'default'"
            @click="updataAttention"
            >{{ isAttention ? '关注' : '已关注' }}</van-button
          >
        </van-col>
      </van-row>
      <div class="markdown-body" v-html="artick.content"></div>
      <van-divider>正文结束</van-divider>
      <commin-list></commin-list>
    </main>
    <footer>
      <van-row type="flex" justify="space-around" align="center">
        <van-col span="8">
          <van-button round size="large" type="default" @click="remark"
            >写评论</van-button
          >
        </van-col>
        <van-col span="4">
          <van-icon name="comment-o" :badge="totalCount" />
        </van-col>
        <van-col span="4">
          <van-icon
            :class="{ active: isCollet }"
            name="star-o"
            @click="getNewsCollect"
          />
        </van-col>
        <van-col span="4">
          <van-icon
            name="good-job-o"
            :class="{ active: isLike }"
            @click="goodLike"
          />
        </van-col>
        <van-col span="4">
          <van-icon name="share" />
        </van-col>
      </van-row>
    </footer>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <add-comment :artickId="artickId"></add-comment>
    </van-popup>
    <comment-item></comment-item>
  </div>
</template>
<script>
import {
  getNewsInfo,
  getNewsCollect,
  getNewsCancel,
  updataAttention,
  updataCancel,
  getLike,
  getRecusal
} from '@/api'
import 'github-markdown-css'
import comminList from './components/comminList.vue'
import AddComment from './components/addComment.vue'
import CommentItem from './components/commentItem.vue'
export default {
  components: { comminList, AddComment, CommentItem },
  name: 'detail',
  data() {
    return {
      artick: {},
      rawHtml: '',
      isShow: true,
      isError: false,
      isNetwork: false,
      isCollet: '',
      target: '',
      isAttention: true,
      isLike: false,
      totalCount: 0,
      show: false
    }
  },
  methods: {
    async getNewsInfo() {
      try {
        const { data } = await getNewsInfo(this.artickId)
        this.isShow = false
        this.artick = data.data
        this.isCollet = data.data.is_collected
      } catch (error) {
        const status = error.response.data
        if (status === 404) {
          this.isNetwork = true
        } else {
          this.isError = true
        }
      }
    },
    // 收藏or取消
    async getNewsCollect() {
      if (this.isCollet) {
        try {
          await getNewsCancel(this.artickId)
          this.$toast.success('取消收藏~')
        } catch (error) {
          this.$toast.fail('取消失败')
        }
      } else {
        try {
          const data = { target: this.artickId }
          await getNewsCollect(data)
          this.$toast.success('收藏成功')
        } catch (error) {
          this.$toast.fail('收藏失败')
        }
      }
      this.isCollet = !this.isCollet
    },
    // 点击关注
    async updataAttention() {
      const data = { target: this.artick.aut_id }
      if (this.isAttention) {
        try {
          await updataAttention(data)
          this.$toast.success('关注成功~')
        } catch (error) {
          this.$toast.fail('关注失败~')
        }
      } else {
        try {
          const { data } = await updataCancel(this.artick.aut_id)
          console.log(data)
          this.$toast.success('取消关注成功')
        } catch (error) {
          this.$toast.fail('取消关注失败')
        }
      }
      this.isAttention = !this.isAttention
    },
    // 点赞文章
    async goodLike() {
      if (this.isLike) {
        try {
          await getRecusal(this.artickId)
          this.$toast.success('取消点赞成功~')
        } catch (error) {
          this.$toast.fail('取消点赞失败~')
        }
      } else {
        try {
          const data = { target: this.artickId }
          await getLike(data)
          this.$toast.success('点赞文章成功~')
        } catch (error) {
          this.$toast.fail('点赞文章失败~')
        }
      }
      this.isLike = !this.isLike
    },
    // 写文章评论
    remark() {
      this.show = true
    }
  },
  created() {
    this.getNewsInfo()
  },
  computed: {
    artickId() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped lang="less">
header {
  :deep(.van-nav-bar) {
    background-color: #3296fa;
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
}
main {
  padding-bottom: 1.6rem;
  h1 {
    font-size: 0.5067rem;
    padding: 0.64rem 0.4rem;
    margin: 0;
  }
  :deep(.van-row) {
    padding: 0 0.4rem;
    margin-bottom: 0.5333rem;
    .van-col--13 {
      font-size: 0.32rem;
      p {
        margin: 0;
      }
    }
    .van-button--round {
      position: relative;
      left: 0.8rem;
    }
  }
}
footer {
  :deep(.van-row) {
    position: fixed;
    background-color: #fff;
    z-index: 99;
    bottom: 0;
    width: 100%;
    height: 1.12rem;
    border-top: 0.0267rem solid #ccc;
    .van-col--4 {
      .active {
        color: rgb(50, 150, 250);
      }
    }
  }
}
.markdown-body {
  padding: 0.73333rem 0.42667rem;
}
</style>
