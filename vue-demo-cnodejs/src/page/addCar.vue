<template>
  <div>
    <label class="addCarTitle">请绑定真实有效的车牌号码</label>
    <div class="addCarCon">
      <mt-field placeholder="请输入车牌号码" type="text" v-model="license"></mt-field>
    </div>
    <div class="checkBox">
      <mt-checklist
        v-model="autoPayV"
        :options="autoPayOpt">
      </mt-checklist>
      <p class="tipP">开启小额自动支付，当停车费不超过20元时，车辆在离场时可自动从余额扣除停车费用哦！</p>
    </div>
    <mt-button type="primary" size="large" class="btn_large" @click="addCarFun"> 添加</mt-button>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  export default {
    created() {


    },
    data() {
      return {
        //存放所选选项
        license: '',
        autoPayV: [1],
        autoPayOpt: [
          {
            label: '开启小额支付',
            value: '1'
          }
        ]
      }
    },
    methods: {
      addCarFun: function () {
        var pattern="^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$";
        var match = this.license.match(pattern);
        if(!match){
          Toast("请输入真实有效的车牌号码");
          this.license='';
          return;
        }

        let s = this.autoPayV[0] == true ? 1 : 0;
        let para = {
          "license": this.license,
          "isAutopay": s,
          "userId": localStorage.userId
        };
        this.$api.post('/park-onstreet/vehicle/bind_vehicle', para, r => {
          if(r.code == 1000){
            this.$router.push('/myCar')
          }
        })

      }
    }

  }
</script>
<style type="text/css">
  .addCarTitle {
    font-size: 18px;
    color: #999;
    margin: 20px 20px;
    position: relative;
    display: block
  }

  .addCarCon {
    /*box-shadow: -2px 0 0 2px #B8DDF5;*/
    /*border-radius: 1px;*/
    margin: 0 5%;
    height: 50px;
    width: 90%;
  }

  .addCarInput {
    border: none;
    box-shadow: 0 0 0 2px #B8DDF5;
    /*box-shadow: 2px 0 0  #B8DDF5;*/
    width: 13%;
    height: 50px;
    text-align: center;
  }

  .addCarInputEight {
    border: none;
    box-shadow: 0 0 0 2px #B8DDF5;
    /*box-shadow: 2px 0 0  #B8DDF5;*/
    width: 11%;
    height: 50px;
    text-align: center;
  }

  .tipP {
    margin: 20px;
    color: #999;
    font-size: 18px
  }

  .checkBox .mint-cell-wrapper {
    background-image: none;
  }

  .checkBox .mint-cell:last-child {
    background-image: none;
  }
</style>
