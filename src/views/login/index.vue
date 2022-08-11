<template>
  <div>
    <!-- 抬头 -->
    <div>
      <van-nav-bar title="登入" />
    </div>
    <!-- from表单 -->
    <div>
      <van-form @submit="onSubmit" class="from" ref="form">
        <van-field
          v-model="mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="phoneRoules"
        >
          <template #label>
            <span class="toutiao toutiao-shouji"></span>
          </template>
        </van-field>
        <van-field
          v-model="code"
          name="code"
          placeholder="请输入验证码"
          :rules="codeRoules"
        >
          <template #label>
            <span class="toutiao toutiao-yanzhengma"></span>
          </template>
          <template #button>
            <van-button
              round
              size="mini"
              type="primary"
              color="#eee"
              native-type="button"
              v-if="isShow"
              @click="getCodeApi"
              >发送验证码</van-button
            >
            <van-count-down
              :time="3 * 1000"
              format="ss秒"
              v-else
              @finish="isShow = true"
            />
          </template>
        </van-field>
        <div style="margin: 0.42rem">
          <van-button block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { phoneRoules, codeRoules } from './rules'
import { getLogin, getCode } from '@/api'
export default {
  name: 'login',
  data() {
    return {
      mobile: '',
      code: '',
      codeRoules,
      phoneRoules,
      isShow: true
    }
  },
  methods: {
    // 加载提示
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    // 登录

    async onSubmit() {
      // q1: res是什么?
      //  - axios封装的对象, 她把服务端返回的数据放在res.data里

      // q2: res是什么?
      //  - Promise的resolve的值

      // q3: error是什么?
      //  - Promise reject的结果
      //  - axios封装的error
      //  - error.response.data是服务端返回的数据
      //  - error.response.status 是服务端返回的状态码
      // 加载提示
      this.loading()
      try {
        const data = { mobile: this.mobile, code: this.code }

        const {
          data: { data: token }
        } = await getLogin(data)

        this.$store.commit('SEND_TOKEN', token)
        this.$router.push('/my')
        this.$toast.success('登入成功')
      } catch (error) {
        const status = error.response.data
        let message = '请重新登入'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    // 验证码
    getCodeApi() {
      // 1.手机号验证
      this.$refs.form.validate('mobile').then(async () => {
        // 加载提示
        this.loading()
        try {
          // 发请求
          await getCode(this.mobile)
          // 提示获取成功
          this.$toast.success('获取验证码成功')
          // 将按钮显示
          this.isShow = false
        } catch (error) {
          const status = error.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = error.response.data.message
          }
          // 提示失败的数据
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.toutiao {
  font-size: 40px;
}
:deep(.from) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .van-button--round {
    color: #917b66 !important;
  }
}
</style>
