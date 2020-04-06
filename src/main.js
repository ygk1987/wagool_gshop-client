//应用程序入口js

import Vue from 'vue';

import App from './App';
import router from './router';
import TypeNav from './components/TypeNav';

//注册全局组件
Vue.component('TypeNav', TypeNav);

new Vue({
  // el:'#app',
  render: h => h(App), //将App组件渲染到页面上
  router, //配置路由器(内部路由才生效正常访问)
}).$mount('#app')