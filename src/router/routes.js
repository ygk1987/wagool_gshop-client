//所有路由配置的数组模块
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

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
    }
  },

  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true, //标识footer是否隐藏
    }
  },

]
