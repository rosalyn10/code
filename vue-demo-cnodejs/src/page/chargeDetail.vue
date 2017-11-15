<template>
  <div id="detail">
    <form>
      <mt-cell title="车辆" :value="license"></mt-cell>
      <mt-cell title="停车场" :value="roadName"></mt-cell>
      <mt-cell align="left" readonly :value="timer"></mt-cell>
      <mt-cell title="停车时长" readonly :value="parkDuration"></mt-cell>
      <mt-cell title="停车费用" readonly :value="receivableMoney"></mt-cell>
      <div v-if="this.$route.query.parkingId">
        <mt-cell title="预收费用" readonly :value="preMoney"></mt-cell>
        <mt-cell title="应付费用" readonly :value="payMoney"></mt-cell>
      </div>
      <div v-else>
        <mt-cell title="欠费金额" readonly :value="arrearage"></mt-cell>
      </div>
      <mt-radio
        align="right"
        :options="options" style="margin-bottom: 20px;" v-model="payWay">
      </mt-radio>
      <router-link to="success">
        <mt-button type="primary" class="largeBtn" @click.native='confirmPay'>确认缴费</mt-button>
      </router-link>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
      this.$parent.headerTitle = '缴费详情'
      this.$api.post('/park-onstreet/account/get_balance', {"userId": localStorage.userId}, r => {
        this.balance = r.data;
        console.log(this.balance);
        console.log(this.$route.query.arrearage);
        if (this.balance <= this.$route.query.arrearage) {
          this.options = [
            {
              label: '余额支付',
              value: '4',
              disabled: true
            },
            {
              label: '微信',
              value: '3'
            }
          ];
          this.payWay = '3';
          console.log('1111')
        }
        else {
          this.options = [
            {
              label: '余额支付',
              value: '4',
              disabled: false
            },
            {
              label: '微信',
              value: '3'
            }
          ];
          this.payWay = '4';
          console.log('2222')
        }

      })
      console.log(this.$route.query.parkingId);
      if(this.$route.query.parkingId){
        let para = {
          orderNo:this.$route.query.orderNo,
          parkingId:this.$route.query.parkingId
        }
        this.$api.post('/park-onstreet/payOrder/get_park_payment_info', para, r => {
          this.license = r.data.license;
          this.roadName = r.data.roadName;
          this.timer = r.data.startTime + '-' + r.data.endTime;
          this.parkDuration = r.data.parkDuration;
          this.receivableMoney = r.data.receivableMoney;
          this.preMoney = '￥'+r.data.preMoney;
          this.payMoney ='￥'+(r.data.receivableMoney-r.data.preMoney) ;

        })
      }
    },
    data() {
      return {
        license: this.$route.query.license,
        roadName: this.$route.query.roadName,
        timer: this.$route.query.startTime + '-' + this.$route.query.endTime,
        parkDuration: this.$route.query.parkDuration,
        receivableMoney: '￥' + this.$route.query.receivableMoney,
        arrearage: '￥' + this.$route.query.arrearage,
        orderNo:this.$route.query.orderNo,
        payWay: '',
        preMoney:'',
        payMoney:'',
        balance: '',
        options: []

      }
    },
    methods: {
      confirmPay: function () {
        let para = {
          "porderPayType": this.payWay,
          "money": this.$route.query.arrearage,
          "porderNo": this.orderNo,
          scanCode:'WAP'
        };
        this.$api.post('/park-onstreet/orders/online_pay', para, r => {

        })

      }
    }

  }

</script>
