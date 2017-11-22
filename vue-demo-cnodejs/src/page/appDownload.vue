<style type="text/css" scoped>
  .dTitle{position: absolute;left: 50%;top: 10%;margin-left: -102px;}
  .dInfo{text-align: center;font-size: 24px;margin-bottom: 20px;}
  .dLink{margin-bottom: 60px;font-size:16px;color:#4c86f1;text-align: center;}
  .aBtn{position: relative;margin-top: 70%;}
</style>
<template>
  <div>
    <div class="dTitle">
      <img src="../assets/success.png">
      <h2 class="dInfo">广安停车</h2>
    </div>
    <div class="aBtn">
      <mt-button class="largeBtn" type="primary" size="large" >Android 下载</mt-button>
      <mt-button class="largeBtn" type="primary" size="large" >App 下载</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    created (){
      this.$parent.headerTitle = '广安停车'
    }
  }
</script>
