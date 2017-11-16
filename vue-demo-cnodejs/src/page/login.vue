<template>
  <div>
    <mt-field label="手机号码" placeholder="请输入手机号" type="tel" v-model="phoneNum"></mt-field>
    <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="verCode">
      <mt-button type="default" size="small" @click.native="getVerCode" :disabled="disable">{{this.buttonTitle}}</mt-button>
    </mt-field>
    <router-link to="/findPark">
      <mt-button type="primary" size="large" class="btn_large" @click.native="bindPhone"> 绑定手机</mt-button>
    </router-link>
  </div>
</template>
<script>

  export default {
    created: function () {


    },
    data() {
      return {
        phoneNum: '',
        verCode: '',
        count:60,
        disable:false,
        buttonTitle:"获取验证码"
      }
    },
    methods: {
      getVerCode: function () {
        var _this = this;
        if(this.buttonTitle == "获取验证码"){
          let para = {
            "phone": this.phoneNum,
            "verifyCodeType": 0
          };
          this.$api.post('/park-onstreet/appuser/send_verification_code', para, r => {

          })
          this.count=60;
        }
        if(this.count == 0){
          this.buttonTitle = "获取验证码";
          this.disable = false;
          return;
        }else {
          this.buttonTitle = "重新发送(" + this.count + ")";
          this.disable = true;
          this.count--;
        }

        setTimeout(function() {
            _this.getVerCode() }
          ,1000)
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
