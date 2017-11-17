<template>
  <div>
    <div id="map-container" class="mapCon"></div>
    <div id="tip">
      <mt-search
        v-model="roadNameValue"
        cancel-text="取消"
        placeholder="请输入路段名称" @change.native="searchRoad" :result.sync='roadResult'>
        <mt-cell v-show="show"
          v-for="item in roadResult"
          :title="item.roadName" @click.native="showTheRoad(item)" :key="item.id">
        </mt-cell>
      </mt-search>



      <!--<input type="text" id="keyword" name="keyword" placeholder="请输入路段名称：(选定后搜索)" v-model="roadNameValue"-->
      <!--@change="searchRoad"/>-->
    </div>
    <!--<div class="showResultCon">-->
    <!--<transition name="fade">-->
    <!--<ul v-if="show">-->
    <!--<li class="searchRli" v-for="(item,index) in roadResult" @click="showTheRoad(item)">-->
    <!--<span class="roadNameSpan">{{item.roadName }}</span>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</transition>-->
    <!--</div>-->
    <mt-popup class="popCon"
              v-model="popupVisible"
              popup-transition="popup-fade" position="bottom">
      <div class="roadCon">
        <div class="firstDiv">
          <div class="divCon">
            <span class="roadNameSpan">{{this.theRoadName}}</span>
          </div>
          <div class="divLeft">
            <span class="roadDistance">{{ this.dis}}</span>
          </div>
        </div>
        <div>
          <div class="firDiv"><span class="moneySpan">{{this.spaceAvl}}/{{this.spaceTotal}}</span></div>
          <div class="sndDiv"><span class="moneySpan">{{this.freeTime}}分钟</span></div>
          <div class="thDiv"><span class="moneySpan">{{this.hourMoney}}元/小时</span></div>
        </div>
        <div class="lastDiv">
          <div class="firDiv firstDiv"><span class="showSpan">空闲车位</span></div>
          <div class="sndDiv firstDiv"><span class="showSpan">免费</span></div>
          <div class="thDiv firstDiv"><span class="showSpan">收费</span></div>
        </div>
        <div class="directionDiv">
          <img src="../assets/go.png" class="goImg"/>
          <span class="moneySpan" @click="openPhoneMap">导航</span>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import AMap from 'AMap'
  import AMapUI from 'AMapUI'
  import {Toast} from 'mint-ui';

  export default {
    created: function () {
//      this.init();

    },
    data() {
      return {
        roadNameValue: '',
        popupVisible: false,
        roadResult: [],
        theRoadName: '',
        spaceAvl: '',
        spaceTotal: '',
        freeTime: '',
        hourMoney: '',
        mylat: '',
        mylng: '',
        dis: '',
        roadLongitude: '',
        roadLatitude: '',
        show: false
      }
    },
    mounted() {
      this.init();

    },
    methods: {
      init: function () {
        var _this = this;
        window.mapObj = new AMap.Map('map-container', {
          center: [117.000923, 36.675807],
          zoom: 6
        })
        mapObj.plugin(['AMap.ToolBar', 'AMap.MapType'], function () {
          var toolopt = {
            offset: new AMap.Pixel(10, 250),//相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10)
            position: 'LT',
            ruler: true,//标尺键盘是否可见，默认为true
            noIpLocate: false,//定位失败后，是否开启IP定位，默认为false
            locate: false,//是否显示定位按钮，默认为false
            liteStyle: true,//是否使用精简模式，默认为false
            direction: false,//方向键盘是否可见，默认为true
            autoPosition: true,//是否自动定位，即地图初始化加载完成后，是否自动定位的用户所在地，在支持HTML5的浏览器中有效，默认为false
            useNative: false
          }
          var toolBar = new AMap.ToolBar(toolopt);
          mapObj.addControl(toolBar);
//          mapObj.addControl(new AMap.MapType({showTraffic: false, showRoad: false}))
        })

        mapObj.plugin(['AMap.Geolocation'], function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //  是否使用高精度定位，默认:true
            timeout: 10000, //  超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //  显示定位按钮，默认：true
            buttonPosition: 'LB',  // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,  //  定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          mapObj.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', (result) => {
            mapObj.setCenter(result.position)
//            console.log(result.position);
            let parm = {
              "lat": result.position.lat,
              "lng": result.position.lng,
              "radius": 5000
            };
            _this.mylat = result.position.lat;
            _this.mylng = result.position.lng;
            _this.$api.post('/park-onstreet/road/get_road_list', parm, r => {
              if (r.code == 1000) {

                for (let i = 0; i < r.data.length; i++) {

                  AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
                    var marker = new SimpleMarker({
                      //普通文本
                      iconStyle: {
                        src: (r.data[i].spaceAvl > 4) ? '/static/mapImg/b.png' : '/static/mapImg/r.png',
                        style: {
                          width: '32px',
                          height: '44px'
                        }
                      },
                      iconLabel: {
                        innerHTML: r.data[i].spaceAvl,
                        //设置样式
                        style: {
                          color: '#fff',
                          fontSize: '120%',
                          marginTop: '10px'
                        }
                      },
                      map: mapObj,
                      position: [r.data[i].roadLongitude, r.data[i].roadLatitude]
                    });
                    AMap.event.addListener(marker, 'click', (e) => {
                      console.log('marker click ');
                      marker.setIconStyle(
                        {
                          src: (r.data[i].spaceAvl > 4) ? '/static/mapImg/br.png' : '/static/mapImg/rr.png',
                          style: {
                            width: '32px',
                            height: '44px'
                          }
                        }
                      );
                      marker.setIconLabel(
                        {
                          innerHTML: r.data[i].spaceAvl,
                          //设置样式
                          style: {
                            color: '#49B5F6',
                            fontSize: '120%',
                            marginTop: '10px'
                          }
                        }
                      );
                      _this.popUpDetail(r.data[i]);
                    })
                  });


                }

              }
            })


          })  //  返回定位信息
          AMap.event.addListener(geolocation, 'error', (result) => {
            console.log("geolocation error"+result)
          })  //  返回定位出错信息
        })
      },
      searchRoad() {
//        console.log("searchRoad");
        if (this.roadNameValue == '') {
          return;
        }
//        console.log(this.roadNameValue);
        let para = {
          roadName: this.roadNameValue
        }
        this.$api.post('/park-onstreet/road/search_road', para, r => {
          if (r.code == 1000) {
            if (r.data.length) {
//              console.log(r.data);
              this.roadResult = r.data;
              this.show = true;
            } else {
              Toast("未搜索到路段！");
              this.roadNameValue='';
            }

          }
        })
      },
      showTheRoad(item) {
//        console.log(item);
        mapObj.clearMap();
        var _this = this;

        AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
          var marker = new SimpleMarker({
            //普通文本
            iconStyle: {
              src: (item.spaceAvl > 4) ? '/static/mapImg/b.png' : '/static/mapImg/r.png',
              style: {
                width: '32px',
                height: '44px'
              }
            },
            iconLabel: {
              innerHTML: item.spaceAvl,
              //设置样式
              style: {
                color: '#fff',
                fontSize: '120%',
                marginTop: '10px'
              }
            },
            map: mapObj,
            position: [item.roadLongitude, item.roadLatitude]
          });
          AMap.event.addListener(marker, 'click', (e) => {
            marker.setIconStyle(
              {
                src: (item.spaceAvl > 4) ? '/static/mapImg/br.png' : '/static/mapImg/rr.png',
                style: {
                  width: '32px',
                  height: '44px'
                }
              }
            );
            marker.setIconLabel(
              {
                innerHTML: item.spaceAvl,
                //设置样式
                style: {
                  color: '#49B5F6',
                  fontSize: '120%',
                  marginTop: '10px'
                }
              }
            );
            _this.popUpDetail(item);
          })
        });
        mapObj.setCenter([item.roadLongitude, item.roadLatitude]);
        _this.popUpDetail(item);
      },
      popUpDetail(item){
//        console.log('in fun popUpDetail');
        this.show = false;
        this.popupVisible = true;
        this.theRoadName = item.roadName;
        this.spaceTotal = item.spaceTotal;
        this.spaceAvl = item.spaceAvl;
        this.freeTime = item.rulePlain.freeTime;
        this.hourMoney = item.rulePlain.hourMoney;
        var lngLat = new AMap.LngLat(item.roadLongitude, item.roadLatitude);
        var dist = Math.round(lngLat.distance([this.mylng, this.mylat])) + '米';
//        console.log(dist);
        this.dis = dist;
        this.roadLongitude = item.roadLongitude;
        this.roadLatitude = item.roadLatitude;
      },

      openPhoneMap() {
        var _this = this;
        this.popupVisible = false;
        AMap.plugin(["AMap.Driving"], function () {
          var drivingOption = {
            policy: AMap.DrivingPolicy.LEAST_TIME,
            map: mapObj
          };
          var driving = new AMap.Driving(drivingOption); //构造驾车导航类
          driving.search(
            [{origin: [_this.mylng, _this.mylat]}, {destination: [_this.roadLongitude, _this.roadLatitude]}],
            function (status, result) {
              driving.searchOnAMAP({
                origin: result.origin,
                destination: result.destination
              });
            });
        });

      }

    }
  }
</script>

<style type="text/css">
  .btn_large {
    margin: 80px auto 100px auto;
  }

  .mapCon {
    height: 1080px;
  }

  #tip {
    /*background-color: #ddf;*/
    /*color: #333;*/
    /*border: 1px solid silver;*/
    /*box-shadow: 3px 4px 3px 0px silver;*/
    position: fixed;
    top: 1px;
    /*left: 11%;*/
    border-radius: 5px;
    overflow: hidden;
    line-height: 20px;
    width: 100%;
  }

  #tip input[type="text"] {
    height: 30px;
    border: 0;
    padding-left: 5px;
    width: 280px;
    border-radius: 3px;
    outline: none;
  }

  /*input {*/
  /*text-indent: 0;*/
  /*background: transparent;*/
  /*border: 0 none;*/
  /*resize: none;*/
  /*outline: none; !*清除选中效果的默认蓝色边框 *!*/
  /*-webkit-appearance: none; !*清除浏览器默认的样式 *!*/
  /*line-height: normal;*/
  /*/ / 光标问题*/
  /*}*/

  /*input::-webkit-input-placeholder { !* WebKit browsers *!*/
  /*line-height: 0.44rem;*/
  /*/ / placeholder*/
  /*}*/

  /*input:focus {*/
  /*color: #8b8791;*/
  /*}*/

  .searchRli {
    width: 100%;
    height: 30%;
    box-shadow: 0 1px 0 0 #D9D9D9;
    margin: 10px 0;
  }

  .roadNameSpan {
    font-size: 16px;
    color: #333;
    margin: 0 5%;
  }

  .showResultCon {
    position: absolute;
    top: 6%;
    width: 100%;
    background-color: #fff;
  }

  .roadCon {
    border: 1px solid #D9D9D9;
    border-radius: 11.53px;
    margin: 3%;
    background-color: #fff;
    padding: 3%;
  }

  .popCon {
    width: 100%;
    background: none;
  }

  .roadDistance {
    color: rgba(0, 0, 0, .6);
    font-size: 16px;

  }



  .moneySpan {
    font-size: 12px;
    color: #4A90E2;
    margin: 0 5%;
  }

  .showSpan {
    font-size: 12px;
    color: #333;
    margin: 0 5%;
  }



  .lastDiv {
    box-shadow: 0 1px 0 0 #D9D9D9;
  }

  .directionDiv {
    text-align: center;
  }

  .divCon {
    display: inline-block;
    width: 80%;
  }

  .divLeft {
    display: inline-block;
  }

  .thDiv {
    display: inline-block;
    width: 27%;
    text-align: center;

  }
  .sndDiv{
    display: inline-block;
    width: 40%;
    text-align: center;
  }
  .goImg{
    width: 30px;
    height: 30px;
    position: relative;
    top: 10px;
    right: -15px;
  }
  .firstDiv{
    margin-bottom: 5%;
  }
  .firDiv{
    display: inline-block;
    width: 30%;
    text-align: center;

  }



</style>
