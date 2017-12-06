<template>
  <div class="dTitle">
    <img src="../assets/success.png">
    <h2 class="dInfo">停车成功</h2>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
      this.$parent.headerTitle = '停车成功'
    }
  }
</script>

<style type="text/css" scoped>
  .dTitle {
    position: absolute;
    left: 50%;
    top: 30%;
    margin-left: -102px;
    width: 200px;
    height: 200px;
  }

  .dInfo {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }

</style>
