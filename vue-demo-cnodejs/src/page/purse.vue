<template>
  <div class="pTitle">
    <h2 class="pInfo">当前余额：<span class="pSpan">{{ cash }}</span> 元</h2>
    <router-link :to="{ path: '/account',query:{cash:this.cash}}">
      <mt-button class="mBtn" type="primary" size="normal">充值</mt-button>
    </router-link>
    <router-link :to="{ path:'/chargeRec'}">
      <p class="pLink">我的充值记录</p>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        cash: "",
      }
    },
    created() {
      this.$parent.headerTitle = '广安停车';
      this.$api.post('/park-onstreet/account/get_balance', {"userId": localStorage.userId}, r => {
        this.cash = r.data;
      })
    }
  }
</script>
<style type="text/css" scoped>
  .pTitle {
    position: absolute;
    left: 50%;
    top: 20%;
    margin-left: -102px;
    width: 200px;
    height: 200px;
    text-align: center;
  }

  .pInfo {
    font-size: 18px;
    margin-bottom: 60px;
  }

  .pSpan {
    font-size: 24px;
    color: red;
  }

  .pLink {
    margin-bottom: 60px;
    font-size: 16px;
    color: #4c86f1;
  }

  .mBtn {
    margin: 0 auto 20px 0;
  }
</style>
