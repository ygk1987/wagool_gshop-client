//路由器对象模块
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes.js'
import store from '@/store'


//方案2.修正Vue原型上的push和replace方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
//给成功的回调参数指定一个默认的函数
VueRouter.prototype.push = function (location, onComplete=() => {}, onAbort) {
  return originPush.call(this, location, onComplete, onAbort);
}

//通过失败的回调参数指定一个默认的函数
// VueRouter.prototype.replace = function (location, onComplete, onAbort=() => {}) {
//   return originPush.call(this, location, onComplete, onAbort);
// }

VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  // return originPush.call(this, location, onComplete, onAbort).catch(() => {});
  return originReplace.call(this, location, onComplete, onAbort).catch(() => {});
}

//声明使用vue的插件
Vue.use(VueRouter)

//创建一个路由器对象
const router = new VueRouter({
  // mode: 'hash', //哈希,路由路径带#号
  mode: 'history', //路由路径不带#号
  //配置应用中的所有路由
  routes,
  //滚动配置行为,跳转路由时自动滚动到最上面
  scrollBehavior(to, from, savePosition){
    //return 期望滚动到哪个位置
    return{
      x:0, //水平方向最左边
      y:0 //垂直方向最上面
    }
  }
})

// 添加全局前置守卫
/*
进行路由跳转前的回调函数
to: 目标的路由route对象
from: 当前的路由route对象
next: 用来控制路由跳转的函数
  next(): 不传参数, 代表放行
  next(path): 传入路径, 代表强制跳转到指定path的路由
  不执行next(): 代表不放行 (没有跳转的效果, 看不到目标界面)
    Login ==> Register
    from: 代表Login的路由信息对象
    to: 代表Register的路由信息对象

  router.beforeEach((to, from, next) => {
  console.log('beforeEach', to.path, from.path);
  if(to.path !== '/login'){ //如果请求的不是login就跳转到login
    next('./login')
  }else{ //如果请求的login就放行
    next();
  }
})
*/
//功能a.只有登陆了, 才能查看交易/支付/个人中心界面 
router.beforeEach((to, from, next) => {
  const checkPaths = ['/trade', '/pay','/center'] //这里面所有的子路径也需要检查
  //要跳转的目标路径
  const targetPath = to.path  // /center/myorder
  // 如果targetPath在checkPaths中, 那就需要检查
  // if (checkPaths.indexOf(targetPath) !== -1) { // /center/myorder 就不会检查
  // 如果targetPath是checkPaths中的某个路径或者其子路由路径  /center/myorder也会检查
  // const targetPath2 = '/center/myorder'
  // 在checkPaths看能不能找到一个与targetPath2匹配的路径
  // const result = checkPaths.find(item => targetPath2.indexOf(item)===0)
  // if (result) {
    // 需要检查
  // }

  if(checkPaths.find(item => targetPath.indexOf(item)===0)){
    //如果已经登陆,放行
    if(store.state.user.userInfo.name){
      next()
    }else{
      //如果没有,跳转到登录界面
      next('/login?redirect=' + targetPath) // 同时需要使用query参数将目标路径携带给Login
    }
  }else{
    //否则不需要检查,直接放行
    next()
  }
})

//向外暴露路由器对象模块
export default router;