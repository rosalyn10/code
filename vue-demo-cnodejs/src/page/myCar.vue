<template>
  <div class="myCar">
    <div v-if="myCarList.length">
      <ul>
        <li class="myCarli" v-for="(item,index) in myCarList">
          <div class="myCarCon">
            <span class="myCarTitle">{{item.license}}</span>
            <img src="../assets/delete.png" class="delImg" @click="openDialog(item,index)">
            <div class="switchCon">
              <mt-switch v-model="item.isAutoPay" @change="turn(item)"><span class="switchSpan">自动支付</span></mt-switch>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="tipDiv" v-else>
      <span class="welSpan">
        欢迎使用城市停车
      </span>
      <span class="needSpan">
        您需要绑定车牌才可享受停车服务哦
      </span>
    </div>
    <router-link to="/addCar">
      <mt-button type="primary" size="large" class="btn_large"> 添加车辆</mt-button>
    </router-link>
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui';

  export default {
    created() {
      this.$parent.headerTitle = '我的车辆';
      this.$api.post('/park-onstreet/vehicle/get_vehicle_list', {"userId": localStorage.userId}, r => {
        for (let i = 0; i < r.data.length; i++) {
          r.data[i].isAutoPay = !!(parseInt(r.data[i].isAutoPay))
        }
//        console.log(r.data);
        this.myCarList = r.data;
      })

    },
    data() {
      return {
        myCarList: []
      }

    },
    methods: {
      turn: function (item) {
        let s = item.isAutoPay == true ? 1 : 0;
        let para = {
          "license": item.license,
          "isAutopay": s,
          "userId": localStorage.userId
        };
        this.$api.post('/park-onstreet/vehicle/update_autopay', para, r => {

        })

      },
      openDialog: function (item,index) {
        MessageBox.confirm('', {
          message: '确定删除该车辆吗？',
          title: '提示',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action == 'confirm') {
            let parm = {
              "license": item.license,
              "userId": localStorage.userId
            };

            this.$api.post('/park-onstreet/vehicle/unbind_vehicle', parm, r => {
              if (r.code == 1000) {
                this.myCarList.splice(index,1);
              }
            })
          }
        }).catch(err => {
          if (err == 'cancel') {
            console.log('cancel unbind');
          }
        });

      }
    }

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

