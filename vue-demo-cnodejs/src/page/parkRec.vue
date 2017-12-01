<template>
  <div>
    <div>
      <ul v-for="i in list" :key="i.orderNo">
        <li class="arrRecordli">
          <div>
            <span class="licenseSpan">{{i.roadName}}</span>
            <span v-if="i.porderStatus===0" class="greyTitle">进行中</span>
            <span v-else-if="i.porderStatus===1" class="redTitle">未缴费</span>
            <span v-else class="greTitle">已完成</span>
          </div>
          <div>
            <span class="ownLicenseSpan">{{i.license}}</span>
            <span class="ownLicenseSpan">{{i.parkDuration}}</span>
            <span class="ownLicenseSpan" v-if="i.porderStatus===0">￥{{i.receivableMoney}}</span>
            <span class="ownLicenseSpan" v-else-if="i.porderStatus===1">￥{{i.arrearage}}</span>
            <span class="ownLicenseSpan" v-else>￥{{i.money}}</span>
          </div>
          <div>
            <span class="ownTime">停车时间:</span>
            <span class="ownTimeItem">{{i.startTime}}-{{i.endTime}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data:function(){
      return{
        list:[]
      }
    },
    created (){
      this.$parent.headerTitle = '停车记录';
      this.$api.post('/park-onstreet/appuser/get_park_record',{"userId":localStorage.userId},r=>{
        if(r.data.data){
          this.list=r.data.data;
          }else{
            this.$toast({
              message:"没有记录！",
              duration:3000
            });
          }
      });
    }
  }
</script>
<style type="text/css">
  .arrRecordli{
    width: 100%;
    height: 30%;
    background: #FFFFFF;
    box-shadow: 0 1px 0 0 #D9D9D9;
  }
  .ownLicenseSpan{
    font-size: 20px;
    color:#333333;
    margin: 0 20px;
    position: relative;
    top:15px
  }
  .licenseSpan{
    font-size: 24px;
    color:#333333;
    margin: 0 20px;
    position: relative;
    top:10px
  }
  .redTitle{
    font-size: 18px;
    color: #DC4141;
    margin: 0 20px;
    position: relative;
    top:15px;
    float: right;
  }
  .greyTitle{
    font-size: 18px;
    color:#999999;
    margin: 0 20px;
    position: relative;
    top:15px;
    float: right;
  }
  .ownTime{
    font-size: 18px;
    color:#999;
    margin: 20px 20px 0;
    display: block;
    width: 100%;
  }
  .ownTimeItem{
    font-size: 18px;
    color:#999;
    margin: 5px 20px; ;
    display: block;
    width: 100%;
  }

</style>

