<template>
  <div>
    <router-link to="/carList">
      <div style="height: 40px; display: flex;">
        <span class="left" style="display: inline">选择车辆</span>
        <span class="center" style="display: inline">{{this.license}}</span>
        <img class="arrow" style="display: inline" src="../assets/ic_arrow_right.png"/>
      </div>
    </router-link>

    <label class="berthTitle">泊位编号</label>
    <mt-field class="berthInput" placeholder="请输入地面标记的6位泊位数字" type="text" v-model="berth"></mt-field>
    <br/>
    <mt-button type="primary" size="large" class="btn_large" @click="parkFun">确认</mt-button>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    created() {
      this.$parent.headerTitle = '我要停车';
      this.license = this.$route.query.carNum;
    },
    data() {
      return {
        license: '川A12345',
        berth: '',
      }
    },
    methods: {
      parkFun: function () {
        let pattern = "^[0-9]{6}$";
        let match = this.berth.match(pattern);
        if (!match) {
          Toast("请输入正确的泊位号");
          this.berth = '';
          return;
        }

        let para = {
          "license": this.license,
          "parkingCode": this.berth,
          "appUserId": localStorage.userId
        };
        this.$api.post('/park-onstreet/orders/generateOrder', para, r => {
          if (r.code == 1000) {
            this.$router.push('/parkSuccess')
          }
        })

      }
    }

  }
</script>

<style type="text/css">
  .berthTitle {
    font-size: 18px;
    color: #999;
    margin: 20px 20px;
    position: relative;
    display: block
  }

  .berthInput {
    /*box-shadow: -2px 0 0 2px #B8DDF5;*/
    /*border-radius: 1px;*/
    margin: 0 5%;
    height: 50px;
    width: 90%;
  }

  .left {
    font-size: 18px;
    width: 20%;
    color: #999;
    position: fixed;
    margin: 15px 20px;
  }

  .center {
    height: 40px;
    font-size: 18px;
    position: fixed;
    color: #999;
    right: 30px;
    margin: 15px 20px;
  }

  .arrow {
    height: 25px;
    position: fixed;
    right: 10px;
    margin: 17px 20px;
  }
</style>
