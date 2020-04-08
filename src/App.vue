<template>
  <div class="app">
    <Header />
    <!-- 一级路由显示区域 -->
    <router-view></router-view>
    <!-- 判断是否需要显示底部 -->
    <Footer v-if="!$route.meta.isHideFooter"/>
  </div>
</template>

<script>
import Footer from './components/Footer/'
import Header from './components/Header/'
// import {reqBaseCategoryList} from '@/api';
export default {
  name: 'App',

  async mounted(){
    // const result = await reqBaseCategoryList();
    // console.log('result', result);

    //触发vuex中的getBaseCategoryList action调用 ==> 此处在切换路由时不会发送请求(只发一次请求)
      this.$store.dispatch('getBaseCategoryList');
  },

  //注册路由
  components:{
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>
  
</style>
