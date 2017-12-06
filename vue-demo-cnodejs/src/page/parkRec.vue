<template>
  <div>
    <div>
      <ul v-for="i in list" :key="i.orderNo">
        <li class="arrRecordli">
          <div>
            <span class="licenseSpan">{{i.roadName}}</span>
            <span v-if="i.porderStatus===0" class="greyTitle">进行中</span>
            <span v-else-if="i.porderStatus===1" class="redTitle">未缴费</span>
            <span v-else class="greyTitle">已完成</span>
          </div>
          <div>
            <span class="ownLicenseSpan font-main">{{i.license}}</span>
            <span class="ownLicenseSpan font-main">{{i.parkDuration}}</span>
            <span class="ownLicenseSpan font-main" style="float: right"
                  v-if="i.porderStatus===0">￥{{i.receivableMoney}}</span>
            <span class="ownLicenseSpan font-main" style="float: right"
                  v-else-if="i.porderStatus===1">￥{{i.arrearage}}</span>
            <span class="ownLicenseSpan font-main" style="float: right" v-else>￥{{i.money}}</span>
          </div>
          <div style="margin-left: 20px; margin-top: 20px;margin-bottom: 10px">
            <span class="time-light">停车时间:</span>
            <span class="time-light">{{i.startTime}}-{{i.endTime}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        list: []
      }
    },
    created() {
      this.$parent.headerTitle = '停车记录';
      this.$api.post('/park-onstreet/appuser/get_park_record', {"userId": localStorage.userId}, r => {
        if (r.data.data) {
          this.list = r.data.data;
        } else {
          this.$toast({
            message: "没有记录！",
            duration: 3000
          });
        }
      });
    }
  }
</script>
<style type="text/css">
  .arrRecordli {
    width: 100%;
    height: 30%;
    background: #FFFFFF;
    box-shadow: 0 1px 0 0 #D9D9D9;
  }

  .ownLicenseSpan {
    margin: 0 20px;
    position: relative;
    top: 15px
  }

  .licenseSpan {
    font-size: 20px;
    color: #333333;
    margin: 0 20px;
    position: relative;
    top: 10px
  }

  .redTitle {
    font-size: 18px;
    color: #DC4141;
    margin: 0 20px;
    position: relative;
    top: 15px;
    float: right;
  }

  .greyTitle {
    font-size: 18px;
    color: #999999;
    margin: 0 20px;
    position: relative;
    top: 15px;
    float: right;
  }

  .time-light {
    font-size: 14px;
    color: #999;
  }

</style>

