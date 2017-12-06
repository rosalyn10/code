<template>
  <div id="app">
    <!--<mt-header :title="headerTitle">-->
        <!--<mt-button icon="back" slot="left" @click.native="handleHeaderBack">返回</mt-button>-->
    <!--</mt-header>-->

    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Header } from 'mint-ui';
  Vue.component(Header.name, Header);

export default {
  name: 'app',
  data: function() {
    return {
//      headerTitle: ''
    }
  },
  created() {
    console.log('this', this)
  },
  methods: {
    handleHeaderBack: function() {
      this.$router.back()
    }
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
.tipDiv{
  text-align: center;
  margin-bottom: 30%;
}
.welSpan{
  font-size: 24px;
  color: #333333;
  display: block;
  margin: 30% 5% 1% 5%;

}
.needSpan{
  font-size: 18px;
  color: #999999;
  margin: 2% 5% 1% 5%;
}
.btn-large {
  width: 80%;
  margin: 20px auto;
}
.font-main{
  font-size: 18px;
  color: #666666;
}

</style>
