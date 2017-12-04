<template>
  <div class="myCar">
    <div v-if="myCarList.length">
      <ul>
        <li class="myCarli" v-for="(item,index) in myCarList">
          <router-link :to="{ path: 'park', query: { carNum: item.license }}" replace>
            <div class="myCarCon">
              <span class="myCarTitle">{{item.license}}</span>
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

      this.$api.post('/park-onstreet/vehicle/get_vehicle_list', {"userId": localStorage.userId}, r => {
        this.myCarList = r.data;
      })

    },
    data() {
      return {
        myCarList: []
      }

    },

  }
</script>
<style type="text/css" scoped>
  .myCarli {
    width: 100%;
    height: 30%;
    background: #FFFFFF;
    box-shadow: 0 1px 0 0 #D9D9D9;
    margin: 10px 0;
  }

  .myCarCon {
    position: relative;
    /*top: 10px*/
  }

  .switchCon {
    margin: 10px 20px
  }

  .myCarTitle {
    font-size: 24px;
    color: #999;
    margin: 20px 20px;
  }

  .delImg {
    width: 36px;
    height: 36px;
    float: right;
    margin-right: 20px;
  }

  .switchSpan {
    color: #999;
    font-size: 18px
  }


</style>

