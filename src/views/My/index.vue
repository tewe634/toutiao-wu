<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="login">
        <div v-if="isShow">
          <van-row type="flex" justify="center" align="center">
            <van-col span="5">
              <van-image round width="65" height="65" :src="infoObj?.photo" />
            </van-col>
            <van-col span="13"
              ><span class="phone">{{ infoObj?.name }}</span></van-col
            >
            <van-col span="6">
              <van-button round @click="$router.push('/user')">
                编辑按钮
              </van-button></van-col
            >
          </van-row>
          <div class="info">
            <div>
              <span>{{ userObj?.art_count }}</span>
              <span>头条</span>
            </div>
            <div>
              <span>{{ userObj?.fans_count }}</span>
              <span>粉丝</span>
            </div>
            <div>
              <span>{{ userObj?.follow_count }}</span>
              <span>关注</span>
            </div>
            <div>
              <span>{{ userObj?.like_count }}</span>
              <span>获赞</span>
            </div>
          </div>
        </div>
        <div class="loginout" v-else>
          <van-image
            round
            width="66"
            height="66"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="tos" @click="$router.push('/login')">登入/注册</div>
        </div>
      </div>
    </header>
    <!-- 中间 -->
    <main>
      <van-grid :column-num="2">
        <van-grid-item icon="star-o" text="收藏" />
        <van-grid-item icon="underway-o" text="历史" />
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </van-grid>
    </main>
    <!-- 底部-->
    <footer v-if="isShow">
      <van-cell center title="退出" @click="loginOut"></van-cell>
    </footer>
  </div>
</template>

<script>
import { getInfo, getUsersInfo } from '@/api'
export default {
  name: 'my',
  data() {
    return {
      infoObj: {},
      userObj: {}
    }
  },
  computed: {
    isShow() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    // 清除token 传入空对象
    loginOut() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号？'
        })
        .then(() => {
          this.$store.commit('SEND_TOKEN', {})
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    async getUserInfo() {
      const { data } = await getInfo()
      this.infoObj = data?.data
    },
    async getUsersInfo() {
      const { data } = await getUsersInfo()
      console.log(data)
      this.userObj = data?.data
    }
  },
  created() {
    this.getUserInfo()
    this.getUsersInfo()
  }
}
</script>

<style scoped lang="less">
header {
  position: relative;
}
.login {
  width: 100%;
  height: 5.0933rem;
  background: url('../../assets/images/banner.png') no-repeat;
  background-size: 100% 100%;
  :deep(.van-row) {
    position: relative;
    top: 1.4667rem;
    padding: 0 0.4rem;
    .phone {
      color: #fff;
      font-size: 0.3733rem;
    }
  }
  :deep(.van-button--normal) {
    font-size: 0.32rem;
  }
  .info {
    display: flex;
    position: relative;
    top: 1.6rem;
    height: 1.8667rem;
    div {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 0.32rem;
        color: #fff;
      }
    }
  }
}
.loginout {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .tos {
    position: relative;
    left: 0.1333rem;
    color: #fff;
    font-size: 0.32rem;
  }
}
:deep(.van-icon-underway-o) {
  color: #ff9d1d;
}
:deep(.van-icon-star-o) {
  color: #eb5253;
}
footer {
  :deep(.van-cell__title) {
    display: flex;
    justify-content: center;
    span {
      color: red;
    }
  }
}
</style>
