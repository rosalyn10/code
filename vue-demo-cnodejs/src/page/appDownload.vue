<template>
  <div>
    <div class="dTitle">
      <img src="../assets/success.png">
      <h2 class="dInfo">广安停车</h2>
    </div>
    <div class="aBtn">
      <mt-button class="btn-large" type="primary" size="large">Android 下载</mt-button>
      <mt-button class="btn-large" type="primary" size="large">ios 下载</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
      this.$parent.headerTitle = '广安停车'
    }
  }
</script>

<style type="text/css" scoped>
  .dTitle {
    position: absolute;
    left: 50%;
    top: 10%;
    margin-left: -102px;
  }

  .dInfo {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .dLink {
    margin-bottom: 60px;
    font-size: 16px;
    color: #4c86f1;
    text-align: center;
  }

  .aBtn {
    position: relative;
    margin-top: 80%;
  }
</style>
