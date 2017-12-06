<template>
  <div id="account">
    <div class="aTitle">
      <p class="aInfo">余额：<span style="font-size: 24px;font-weight: 600">{{ cash }}</span> 元</p>
      <mt-field placeholder="请输入充值金额" name="amount" :value="currentValue" @change.native="handleChange">元</mt-field>
      <button class="priceTag" value="20" @click="price">20元</button>
      <button class="priceTag" value="50" @click="price">50元</button>
      <button class="priceTag" value="100" @click="price">100元</button>
      <button class="priceTag" value="200" @click="price">200元</button>
      <button class="priceTag" value="500" @click="price">500元</button>
    </div>
    <mt-radio
      title="支付方式"
      :options="options">
    </mt-radio>
    <p style="margin: 50% 3% 3% 3%;">充值说明： 充值的金额仅能用于缴费和办理停车相关业务，如发现用于非法用途，将追究其法律责任</p>
    <mt-button type="primary" size="large" class="btn-large" @click.native="recharge">充值</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        cash: this.$route.query.cash,
        options: [],
        currentValue: this.value,
        amount: ''
      }
    },
    created() {
      this.$parent.headerTitle = '账户首页';
      this.$api.post('/park-pay/pay/get_pay_type', {flag: 1}, r => {
        if (r.data.length != 0) {
          let oArr = [];
          let option = {"label": "", "value": ""};
          for (let i = 1; i < r.data.length; i++) {
            option.value = r.data[i].payTypeId;
            option.label = r.data[i].payTypeName;
//                var arr={"label":option.label,"value":option.value};
            oArr.push(option);
          }
          this.options = oArr;
        }
      })
    },
    mounted() {
    },
    methods: {
      handleChange: function (event) {
        this.currentValue = event.target.value;
        this.$emit('input', event.target.value) // 这里可以让外部的v-model监听
      },
      recharge: function () {
        let para = {
          "userId": localStorage.userId,
          "giftAmount": 0,
          "amount": this.currentValue,
          "payTypeId": 3,
          "scanCode": "WAP"
        };
        this.$api.post('/park-onstreet/account/recharge', para, r => {
          if (r.code == 1000) {
            let payUrl = r.data.url;
            this.$toast({
              message: "充值成功",
              duration: 3000
            });
            //this.$router.push({path: '/success', query:{userId: 2401084971680112}});
            window.location.href = payUrl;
          } else {
            this.$toast({
              message: "充值金额和支付方式不能为空！",
              duration: 3000
            });
          }
        })
      },
      price: function (event) {
        this.currentValue = event.target.value
      }
    }
  }
</script>

<style type="text/css" scoped>
  .aTitle {
    margin: 10% auto;
    text-align: center;
    position: relative;
  }

  .aInfo {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .priceTag {
    float: left;
    width: 15%;
    height: 2%;
    margin: 2% 2.5%;
    border: 1px solid #e2e2e2;
    vertical-align: middle;
    padding: 5px 0;
  }
</style>
