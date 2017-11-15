<template>
    <div>
        <div>
            <ul>
                <li class="arrRecordli" v-for="item in arrearageList">
                  <!--<router-link :to="{path:`/chargeDetail/${item.license}/${item.roadName}/${item.startTime}/${item.endTime}/${item.parkDuration}/${item.receivableMoney}/${item.arrearage}/${item.orderNo}/`}" >-->
                  <router-link :to="{path:`/chargeDetail`,query:{license:item.license,roadName:item.roadName,startTime:item.startTime,startTime:item.startTime,endTime:item.endTime,parkDuration:item.parkDuration,receivableMoney:item.receivableMoney,arrearage:item.arrearage,orderNo:item.orderNo}}" >
                  <div>
                      <span class="licenseSpan">{{item.roadName}}</span>
                      <span class="redTitle">未缴费</span>
                    </div>
                    <div>
                      <span class="ownLicenseSpan">{{item.license}}</span>
                      <span class="ownLicenseSpan">{{item.parkDuration}}</span>
                      <span class="ownLicenseSpan">￥{{item.arrearage}}</span>
                    </div>
                    <div>
                      <span class="ownTime">停车时间:</span>
                      <span class="ownTimeItem">{{item.startTime}}-{{item.endTime}}</span>
                    </div>
                  </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

  export default {
    created() {
      this.$parent.headerTitle = '欠费记录';
      this.$api.post('/park-onstreet/payOrder/get_arrearage_list', {"userId": localStorage.userId}, r => {
        this.arrearageList = r.data.data;
        console.log(this.arrearageList);
      })
    },
    data() {
      return {
        arrearageList:[]
      }
    },

  }
</script>
<style type="text/css">
    .arrRecordli{
        width: 100%;
        height: 30%;
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
    .ownTime{
        font-size: 16px;
        color:#999;
        margin: 20px 20px 0;
        display: block;
        width: 100%;
    }
    .ownTimeItem{
      font-size: 14px;
      color:#999;
      margin: 5px 20px; ;
      display: block;
      width: 100%;
    }
</style>
