<template>
    <div>
      <mt-cell v-for="item in items" v-if="item.handleType=0" :key="item.walletId" :title="item.payTypeName" :label="'支付时间:'+item.createTime" :value="'￥'+item.amount"></mt-cell>
      <h1 v-else style="margin-top:30px;text-align:center;font-size: 22px;font-weight: 200;">无充值记录</h1>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data:function(){
          return{
            items: []
          }
        },
        created(){
            this.$parent.headerTitle="充值记录";
            this.$api.post('/park-onstreet/appuser/get_consume_list',{userId:this.$route.query.userId},r=>{
              if(r.data.data){
                this.items=r.data.data;
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
