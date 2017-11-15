<template>
  <div>
    <mt-field label="手机号码" placeholder="请输入手机号" type="tel" v-model="phoneNum"></mt-field>
    <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="verCode">
      <mt-button type="default" size="small" @click.native="getVerCode">获取验证码</mt-button>
    </mt-field>
    <router-link to="/findPark">
      <mt-button type="primary" size="large" class="btn_large" @click.native="bindPhone"> 绑定手机</mt-button>
    </router-link>
  </div>
</template>
<script>

  export default {
    created: function () {
      this.$parent.headerTitle = '登录'

    },
    data() {
      return {
        phoneNum: '',
        verCode: ''
      }
    },
    methods: {
      getVerCode: function () {
        let para = {
          "phone": this.phoneNum,
          "verifyCodeType": 0
        };
        this.$api.post('/park-onstreet/appuser/send_verification_code', para, r => {

        })
      },
      bindPhone: function () {
        let para = {
          "phone": this.phoneNum,
          "openId": "eeeeee",
          "verifyCode": this.verCode
        };
        this.$api.post('/park-onstreet/appuser/wx_bound', para, r => {
          if (r.code == 1000) {
            localStorage.setItem("userId", r.data.userId);
          }

        })
      }
    }
  }
</script>
<style type="text/css">
  .btn_large {
    margin: 80px auto 100px auto;
  }
</style>
