<style type="text/css">
  .dTitle{position: absolute;left: 50%;top: 30%;margin-left: -102px;width: 200px;height: 200px;}
  .dInfo{text-align: center;font-size: 24px;margin-bottom: 20px;}
</style>
<template>
  <div class="dTitle">
    <img src="../assets/success.png" >
    <h2 class="dInfo">缴费成功</h2>
    <router-link to="/">
      <mt-button type="default" size="large">返回</mt-button>
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
