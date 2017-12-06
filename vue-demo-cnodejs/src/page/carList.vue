<template>
  <div class="myCar">
    <div v-if="myCarList.length">
      <ul>
        <li class="myCarli" v-for="(item) in myCarList">
          <router-link :to="{ path: 'park', query: { carNum: item.license }}" replace>
            <div class="myCarCon">
              <span class="myCarTitle font-main">{{item.license}}</span>
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

  .myCarTitle {
    margin: 20px 20px;
  }

</style>

