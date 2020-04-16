//所有路由配置的数组模块
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupBuy from '@/pages/Center/GroupBuy'

import store from '@/store'

export default [
  {
    path: '/',
    component: Home,
  },

  {
    name: 'detail', //如果是params参数需要指定此名称
    path: '/detail/:skuId',
    component: Detail,
  },
  //注册添加购物的路由跳转
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,

    // c.只有携带的skuId和skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面
    beforeEnter(to, from, next){
      const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
      const {skuId, skuNum} = to.query
      if(skuId && skuNum && skuInfo){
        next() //放行
      }else{
        // 什么都不做, 那就是呆在地 ===> 可能导致没有一个路由显示
        // console.log(from.path);
        next(from.path);        
      }
    }
  },
  //注册结算路由跳转
  {
    path: '/shopcart',
    component: ShopCart,
  },

  {
    name:'search',//如果是params参数需要指定此名称
    path: '/search/:keyword?', //指定通过params参数携带数据 ?代表params参数可以不传
    component: Search,
    //将query/params参数映射成props传递给路由组件
    props:(route) => ({
      keyword1: route.params.keyword, 
      keyword2: route.query.keyword
    })
  },

  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true, //标识footer是否隐藏
    },

    //前置路由守卫
    // beforeEnter:(to, from, next) => { //在即将跳转到login时调用
      //如果已经登录,自动跳转到首页
    //   if(store.state.user.userInfo.name){
    //     next('/')
    //   }else{
        //如果没有登录,放行显示登录界面
    //     next();
    //   }   
    // }
  },

  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true, //标识footer是否隐藏
    }
  },

  //交易路由
  {
    path: '/trade',
    component: Trade,
    /*  d.只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter(to, from, next){
      if(from.path === '/shopcart'){
        next()
      }else{
        next('/shopcart')
      }
    }
  },

  //支付路由
  {
    path: '/pay',
    component: Pay,
    //将query参数映射成路由组件的props
    props: route => ({orderId: route.query.orderId}),
    
    /* e.只能从交易界面, 才能跳转到支付界面 */
    beforeEnter (to, from , next) {
      if (from.path==='/trade') {
        next()
      } else {
        next('/trade')
      }
    }
  },

  //支付成功的路由
  {
    path: '/paysuccess',
    component: PaySuccess,

    /* f.只有从支付界面, 才能跳转到支付成功的界面 */
    beforeEnter (to, from , next) { // 回调函数的形参, 如果后面的没用可以省略, 但前面没用不能省略
      if (from.path==='/pay') {
        next()
      } else {
        next('/pay')
      }
    }
  },

  //个人中心路由
  {
    path: '/center',
    component: Center,
    children: [//配置Center子路由
      {
        path: '/center/myorder', //完整写
        component: MyOrder,
      },
      {
        path: 'groupbuy', //简写
        component: GroupBuy,
      },

      { //自动重定向路由
        // path:'/center',
        path:'',
        redirect: '/center/myorder'
      }
    ]
  },
]
