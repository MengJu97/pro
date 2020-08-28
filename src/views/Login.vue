<template>
  <div class="login">
    <van-nav-bar
        title="登录页"
        placeholder
        fixed
    />

    <div class="login-wrap">
      <van-field
          v-model="phone"
          center
          clearable
          placeholder="请输入手机号">
        <template #button>
          <van-button size="small" type="primary" @click="sendCode">发送验证码</van-button>
        </template>
      </van-field>
      <van-cell-group>
        <van-field v-model="value" placeholder="请输入短信验证码"/>
      </van-cell-group>
      <van-button type="primary" block @click="clickToLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import {getTextCode, getLogin} from "@/utils/api";

export default {
  name: "Login",
  data() {
    return {
      phone: '',
      value: '',
      templateId: "537707"
    }
  },
  methods: {
    async sendCode() {
      const result = await getTextCode(qs.stringify({
        phone: this.phone,
        templateId: this.templateId
      }))
    },
    async clickToLogin() {
      const rep = await getLogin(qs.stringify({
        phone: this.phone,
        code: this.value
      }))
      console.log(rep);
      if (rep.status === '0') {
        localStorage.setItem('token', rep.result.token);
        localStorage.setItem('userInfo',JSON.stringify(rep.result))
        await this.$router.replace('/index')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.login-wrap {
  width 90%
  margin 160px auto
}

</style>