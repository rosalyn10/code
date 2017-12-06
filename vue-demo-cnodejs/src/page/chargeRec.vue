<template>
  <div>
    <div v-if="this.items.length>0">
      <ul v-for="item in items">
        <li style="border-bottom:  1px solid #eee">
          <div style="margin-left: 20px;margin-top: 10px">
            <div style="display: inline">
              <span class="font-main" v-if="item.handleType==0">钱包充值</span>
              <span class="font-main" v-else-if="item.handleType==1">提现</span>
              <span class="font-main" v-else-if="item.handleType==2">停车消费</span>
              <span class="font-main" v-else-if="item.handleType==3">包期消费</span>
              <span class="font-main" v-else-if="item.handleType==4">退款</span>
            </div>
            <div style="display: inline">
              <img class="icon" src="../assets/ic_alipay.png" v-if="item.payTypeName=='支付宝'"/>
              <img class="icon" src="../assets/ic_wechat.png" v-else-if="item.payTypeName=='微信'"/>
              <img class="icon" src="../assets/balance_pay.png" v-else-if="item.payTypeName=='钱包'"/>
              <img class="icon" src="" v-else/>
            </div>
          </div>
          <div style="margin-left: 20px;margin-bottom: 10px">
            <div style="display: inline">
              <span style="font-size: 16px;color: #999" v-if="item.handleType==0">操作时间</span>
              <span style="font-size: 16px;color: #999" v-else-if="item.handleType==4">操作时间</span>
              <span style="font-size: 16px;color: #999" v-else>支付时间</span>
            </div>
            <span style="font-size: 16px;color: #999">{{item.createTime}}</span>
          </div>
          <div class="font-main" style="position: relative ;float: right;margin-right: 20px; top:-50px">
            ￥{{item.amount}}
          </div>
        </li>
      </ul>
    </div>
    <div v-else style="margin-top:30px;text-align:center;font-size: 22px;font-weight: 200;">无消费记录</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        items: []
      }
    },
    created() {
      this.$parent.headerTitle = "消费记录";
      this.$api.post('/park-onstreet/appuser/get_consume_list', {
        userId: localStorage.userId,
        curPage: 1,
        pageSize: 10
      }, r => {
        if (r.data.data) {
          this.items = r.data.data;
        }
//                var data=r.data.data;
//              if(data.length!=0){
//                var oArr=[];
//                var option={};
//                for(var i=0;i<data.length;i++){
//                  option.id=data[i].walletId;
//                  option.name=data[i].payTypeName;
//                  option.time=data[i].createTime;
//                  option.amount=data[i].amount;
//                  option.type=data[i].handleType;
//                  oArr.push(option);
//                }
//                this.items=oArr;
//              }
      })
    }
  }
</script>
<style type="text/css">
  .icon {
    width: 16px;
    height: 16px;
  }
</style>
