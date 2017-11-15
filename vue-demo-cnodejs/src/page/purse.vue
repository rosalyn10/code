<style type="text/css">
  .pTitle{position: absolute;left: 50%;top: 20%;margin-left: -102px;width: 200px;height: 200px;text-align: center;}
  .pInfo{font-size: 18px;margin-bottom: 60px;}
</style>
<template>
  <div class="pTitle">
    <h2 class="pInfo">当前余额：<span style="font-size: 24px;color: red;">9.98</span></h2>
    <router-link to="/account">
      <mt-button style="margin: 0 auto 20px 0;" type="primary" size="normal">充值</mt-button>
    </router-link>
    <router-link to="/chargeRec">
      <p class="pInfo" style="font-size:16px;color:#4c86f1;">我的充值记录</p>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
    export default{
        create(){
          this.$parent.headerTitle='广安停车'
          this.$api.post('park-onstreet/account/get_balance',{"userId":"2401084971680112"},r=>{
            console.log(r)
          })
        }
    }
</script>
