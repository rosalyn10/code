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

import utils from '@/utils'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Login,
      title: '智慧停车'

    }, {
      path: '/login',
      component: Login,
      title: '登录'
    },
    {
      path: '/licensePay',
      component: LicensePay,
      name: 'LicensePay'
    },
    // {
    //   path: '/chargeDetail/:license/:roadName/:startTime/:endTime/:parkDuration/:receivableMoney/:arrearage/:orderNo/:parkingId',
    //   component: ChargeDetail
    // },
    {
      path: '/chargeDetail',
      component: ChargeDetail
    },
    {
      path: '/arrearsRecord',
      component: ArrearsRecord,
      title: '欠费记录'
    },
    {
      path: '/addCar',
      component: AddCar,
      title: '添加车辆'
    }, {
      path: '/myCar',
      component: MyCar,
      title: '我的车辆'
    },
    {
      path: '/account',
      component: Account
    },
    {
      path: '/chargeRec',
      component: ChargeRec
    },
    {
      path: '/purse',
      component: Purse
    },
    {
      path: '/findPark',
      component: FindPark,
      title: '找车场'
    },
    {
      path: '/success',
      component: Success
    },{
      path:'/parkRec',
      component:ParkRec,
      title:'停车记录'
    },{
      path:'/appDownload',
      component:AppDownload
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
});

router.afterEach((transition) => {
  let path = transition.path

  let item = router.options.routes.filter((ele) => {
    return ele.path === path
  })

  item.length ? utils.setTitle(item[0].title) : utils.setTitle('智慧停车')
})

export default router
