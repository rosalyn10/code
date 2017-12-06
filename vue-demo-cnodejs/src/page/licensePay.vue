<template>
  <div>
    <div v-if="this.myCarList.length">
      <div class="container">
        <label class="licenseTitle">{{this.license}}</label>
        <div v-if="vehicleStatus==2">
          <span class="parkSpan">{{this.roadName}}</span>
          <span class="parkTitle font-main">泊位号：{{this.parkingCode}}</span>
          <span class="parkTitle font-main">入场时间:{{this.porderStartTime}}</span>
          <div style="margin-top: -16px">
            <span class="parkTime font-main">{{this.parkingDuration}}</span>
            <span class="pay">￥{{this.receivableMoney}}</span>
          </div>
        </div>
        <div v-else>
          <div class="noCarCon">
            <span class="parkTitle font-main">无待缴费数据</span>
            <span class="parkTitle font-main">车辆入场后，可查看停车信息</span>
          </div>
        </div>
      </div>
      <span style="margin-left: 30px;font-size: 18px">选择车辆</span>
      <div class="licCon">
        <mt-cell :title="license_default" is-link @click.native="showLicense"></mt-cell>
        <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>
      </div>
      <mt-button type="primary" size="large" @click.native="onPay" :plain='this.payBtnDisable' class="btn-large">
        缴费
      </mt-button>
    </div>
    <div class="tipDiv" v-else>
      <span class="welSpan">
        欢迎使用城市停车
      </span>
      <span class="needSpan">
        您需要绑定车牌才可享受停车服务哦
      </span>
      <router-link to="/addCar">
        <mt-button type="primary" size="large" class="btn-large"> 添加车辆</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import {Actionsheet} from 'mint-ui';

  export default {
    created() {
//      this.$parent.headerTitle = '车牌缴费'
      this.$api.post('/park-onstreet/vehicle/get_vehicle_list', {"userId": localStorage.userId}, r => {
        this.myCarList = r.data;
        if (this.myCarList.length) {
          this.license_default = this.myCarList[0].license;
          this.actions = [];
          for (let i = 0; i < r.data.length; i++) {
            this.actions.push(
              {
                name: this.myCarList[i].license,
                method: this.openList
              }
            )
          }
          this.$api.post('/park-onstreet/vehicle/get_vehicle_status', {"userId": localStorage.userId}, r => {
            this.myCarStatusList = r.data;
            this.license = r.data[0].license;
            this.vehicleStatus = r.data[0].vehicleStatus;
            this.roadName = r.data[0].roadName;
            this.parkingCode = r.data[0].parkingCode;
            this.porderStartTime = r.data[0].porderStartTime;
            this.parkingDuration = r.data[0].parkingDuration;
            this.receivableMoney = r.data[0].receivableMoney;
            this.orderNo = r.data[0].orderNo;
            this.parkingId = r.data[0].parkingId;
            this.payBtnDisable = r.data[0].receivableMoney <= 0
          })
        }
      })
    },
    data() {
      return {
        sheetVisible: false,
        actions: [],
        license_default: '',
        myCarList: [],
        myCarStatusList: [],
        license: '',
        vehicleStatus: '0',
        roadName: '',
        parkingCode: '',
        porderStartTime: '',
        parkingDuration: '',
        receivableMoney: '',
        orderNo: '',
        parkingId: '',
        payBtnDisable: false
      }
    },
    methods: {
      openList: function (item, index) {
        console.log(index);
        console.log(item.name);
        console.log(this.myCarStatusList);
        this.license_default = item.name;
        this.getInfoByLicense(item.name, this.myCarStatusList)
      },
      onPay: function () {
        if (!this.payBtnDisable)
          this.$router.push({path: `/chargeDetail`, query: {orderNo: this.orderNo, parkingId: this.parkingId}})
      },
      showLicense: function () {
        this.sheetVisible = true;
      },
      getInfoByLicense: function (license, arr) {
        for (let i = 0; i < arr.length; i++) {
          if (license === arr[i].license) {
            this.license = arr[i].license
            this.vehicleStatus = arr[i].vehicleStatus;
            this.roadName = arr[i].roadName;
            this.parkingCode = arr[i].parkingCode;
            this.porderStartTime = arr[i].porderStartTime;
            this.parkingDuration = arr[i].parkingDuration;
            this.receivableMoney = arr[i].receivableMoney;
            this.orderNo = arr[i].orderNo;
            this.parkingId = arr[i].parkingId;
            this.payBtnDisable = arr[i].receivableMoney <= 0
          }
        }
      }
    }
  }
</script>
<style type="text/css" scoped>
  .container {
    height: 260px;
    width: 80%;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 #C6D5E6;
    font-size: 30px;
    margin: 20px auto;
  }

  .licenseTitle {
    font-size: 24px;
    color: #333333;
    margin: 0 20px;
    display: block;
    position: relative;
    top: 10px
  }

  .parkSpan {
    font-size: 18px;
    color: #666666;
    margin: 20px 20px;
    display: block;
  }

  .parkTitle {
    margin: 20px 20px;
    display: block;
  }

  .parkTime {
    margin: 20px 20px;
  }

  .pay {
    font-size: 36px;
    color: #60A9FA;
  }

  .licCon {
    margin-left: 20px;
    margin-right: 20px;
  }

</style>
