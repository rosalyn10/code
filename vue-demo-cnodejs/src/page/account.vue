<template>
  <div id="account">
    <div class="aTitle">
      <p class="aInfo">余额：<span style="font-size: 24px;font-weight: 600">500.00</span> 元</p>
      <mt-field placeholder="请输入充值金额" align="center"></mt-field>
      <button  class="priceTag" value="20">20元</button>
      <button  class="priceTag" value="50">50元</button>
      <button  class="priceTag" value="100">100元</button>
      <button  class="priceTag" value="200">200元</button>
      <button  class="priceTag" value="500">500元</button>
    </div>
    <div class="mint-radiolist" state="success">
      <label class="mint-radiolist-title">支付方式</label>
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <label class="mint-radiolist-label">
              <span class="mint-radio is-right">
                <input type="radio" class="mint-radio-input" value="微信支付">
                <span class="mint-radio-core"></span>
              </span>
              <i class="iconfont">&#xe677;</i>
              <span class="mint-radio-label">微信支付</span>
            </label>
          </div>
          <div class="mint-cell-value"><span></span></div>
        </div>
        <div class="mint-cell-right"></div></a></div>

    <p style="margin: 50% 3% 3% 3%;">充值说明： 充值的金额仅能用于缴费和办理停车相关业务，如发现用于非法用途，将追究其法律责任</p>
    <router-link to="/success">
      <mt-button class="aInfo largeBtn" type="primary">充值</mt-button>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
    export default{
      created (){
        this.$parent.headerTitle = '账户首页'
      }
    }
</script>
<style type="text/css">
  .aTitle{margin: 10% auto;text-align: center;position: relative;}
  .aInfo{font-size: 20px;margin-bottom: 20px;}
  .priceTag {float: left;width: 15%;height: 2%;margin: 2% 2.5%;border: 1px solid #e2e2e2;vertical-align: middle;padding: 5px 0;}
</style>
