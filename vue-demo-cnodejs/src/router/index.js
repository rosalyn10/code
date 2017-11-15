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
import Success from '@/page/Success'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    }, {
      path: '/login',
      component: Login
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
      component: ArrearsRecord
    },
    {
      path: '/addCar',
      component: AddCar
    }, {
      path: '/myCar',
      component: MyCar
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
      component: FindPark
    },
    {
      path: '/success',
      component: Success
    }
  ]
})
