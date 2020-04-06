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
export default {
  name: 'App',

  //注册路由
  components:{
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>
  
</style>
