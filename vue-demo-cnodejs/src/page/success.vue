<style type="text/css" scoped>
  .dTitle{position: absolute;left: 50%;top: 30%;margin-left: -102px;width: 200px;height: 200px;}
  .dInfo{text-align: center;font-size: 24px;margin-bottom: 20px;}
  .dLink{margin-bottom: 60px;font-size:16px;color:#4c86f1;text-align: center;}
</style>
<template>
  <div class="dTitle">
    <img src="../assets/success.png" >
    <h2 class="dInfo">充值成功</h2>
    <router-link :to="{ path:'/parkRec',query:{userId:this.$route.query.userId}}">
      <p class="dLink">我的充值记录</p>
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
