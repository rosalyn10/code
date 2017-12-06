<template>
  <div>
    <mt-field label="手机号码" placeholder="请输入手机号" type="tel" v-model="phoneNum"></mt-field>
    <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="verCode">
      <mt-button type="default" size="small" @click.native="getVerCode" :disabled="disable">{{this.buttonTitle}}</mt-button>
    </mt-field>
    <mt-button type="primary" size="large" class="btn-large" @click.native="bindPhone"> 绑定手机</mt-button>
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
          "openId": this.$route.query.openId,
          "sourceCode":this.$route.query.sourceCode,
          "verifyCode": this.verCode
        };
        this.$api.post('/park-onstreet/appuser/wx_bound', para, r => {
          if (r.code == 1000) {
            console.log("this.$route.query.redirect:" + this.$route.query.redirect);
            localStorage.setItem("userId", r.data.userId);
            var cookiedata = "{" + "loginStatus:" + 1 + ",openId:" + this.$route.query.openId + ",sourceCode:" + this.$route.query.sourceCode + ",userId:" + r.data.userId + "}";
            console.log(encodeURIComponent(cookiedata));
            document.cookie = "userInfo=" + encodeURIComponent(cookiedata);
            this.$router.push(this.$route.query.redirect)
          }

        })
      }
    }
  }
</script>
<style type="text/css">
</style>
