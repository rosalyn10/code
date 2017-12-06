import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import LicensePay from '@/page/licensePay'
import ChargeDetail from '@/page/chargeDetail'
import ArrearsRecord from '@/page/arrearsRecord'
import AddCar from '@/page/addCar'
import MyCar from '@/page/myCar'
import Account from '@/page/account'
import ChargeRec from '@/page/chargeRec'
import Purse from '@/page/purse'
import FindPark from '@/page/findPark'
import Success from '@/page/success'
import ParkRec from '@/page/parkRec'
import AppDownload from '@/page/appDownload'
import Park from'@/page/park'
import CarList from'@/page/carList'
import ParkSuccess from'@/page/parkSuccess'

import utils from '@/utils'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Login,
      title: '智慧停车',
      meta: { requiresAuth: true }

    }, {
      path: '/login',
      component: Login,
      title: '登录'
    },
    {
      path: '/licensePay',
      component: LicensePay,
      title: '车牌缴费',
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/chargeDetail/:license/:roadName/:startTime/:endTime/:parkDuration/:receivableMoney/:arrearage/:orderNo/:parkingId',
    //   component: ChargeDetail
    // },
    {
      path: '/chargeDetail',
      component: ChargeDetail,
      title: '缴费详情',
      meta: { requiresAuth: true }
    },
    {
      path: '/arrearsRecord',
      component: ArrearsRecord,
      title: '欠费记录',
      meta: { requiresAuth: true }
    },
    {
      path: '/addCar',
      component: AddCar,
      title: '添加车辆',
      meta: { requiresAuth: true }
    }, {
      path: '/myCar',
      component: MyCar,
      title: '我的车辆',
      meta: { requiresAuth: true }
    },
    {
      path: '/account',
      component: Account,
      title: '账户首页',
      meta: { requiresAuth: true }
    },
    {
      path: '/chargeRec',
      component: ChargeRec,
      title: '消费记录',
      meta: { requiresAuth: true }
    },
    {
      path: '/purse',
      component: Purse,
      title: '我的钱包',
      meta: { requiresAuth: true }
    },
    {
      path: '/findPark',
      component: FindPark,
      title: '找车场',
      meta: { requiresAuth: true }
    },
    {
      path: '/success',
      component: Success,
      title: '账户首页'
    }, {
      path: '/parkRec',
      component: ParkRec,
      title: '停车记录',
      meta: { requiresAuth: true }
    }, {
      path: '/appDownload',
      component: AppDownload,
      title: 'app下载',
      meta: { requiresAuth: true }
    }, {
      path: '/park',
      component: Park,
      title: '我要停车',
      meta: { requiresAuth: true }
    }, {
      path: '/carList',
      component: CarList,
      title: '选择车辆',
      meta: { requiresAuth: true }
    }, {
      path: '/parkSuccess',
      component: ParkSuccess,
      title: '停车成功',
      meta: { requiresAuth: true }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let info = document.cookie;
//   console.log("cookie info:" + info);
//   let f = decodeURIComponent(info);
//   let a = 'userInfo={"redirectUrl":"http://weixintest.smart-tv.cn/park/#/myCar","openId":"oHJiDv__-fc_ikjLcAqpYEvMkQNw","loginStatus":0},homet=s;'
//   let start = a.indexOf("userInfo=");
//   let end = a.indexOf("}") + 1;
//   let str = a.substring(start, end);
//   let c = str.split("=")[1];
//   console.log("str:" + c);
//   let obj = JSON.parse(c)
//   // console.log("obj:" + JSON.stringify(obj));
//   if (obj.loginStatus == 0) {
//     next({
//       path: '/login',
//       query: {
//         'openId': obj.openId,
//         'sourceCode': obj.sourceCode,
//         'to': from
//       }
//     })
//   } else {
//     next()
//   }
//
//
// });
router.beforeEach((to, from, next) => {
  try{
    let info = document.cookie;
    console.log("cookie info:" + info);
    let f = decodeURIComponent(info);
    let start = f.indexOf("userInfo=");
    let end = f.indexOf("}") + 1;
    let str = f.substring(start, end);
    let c = str.split("=")[1];
    console.log("str:" + c);
    let obj = JSON.parse(c);
    console.log("loginStatus:" + obj.loginStatus);
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (obj.loginStatus === 0) {
        next({
          path: '/login',
          query: {
            'openId': obj.openId,
            'sourceCode': obj.sourceCode,
            'redirect': to.fullPath
          }
        })
      } else {
        localStorage.setItem("userId", obj.userId);
        next()
      }
    } else {
      next() // 确保一定要调用 next()
    }
  }catch (ex){
    next()
  }

})

router.afterEach((transition) => {
  let path = transition.path

  let item = router.options.routes.filter((ele) => {
    return ele.path === path
  })

  item.length ? utils.setTitle(item[0].title) : utils.setTitle('智慧停车')
})

export default router
