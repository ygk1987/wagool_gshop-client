<template>
  <div class="home">
    <!-- 商品分类导航 -->
    <TypeNav />
    
    <!--列表-->
    <ListContainer />

    <!--今日推荐-->
    <TodyRecommend />
    
    <!-- 商品排行 -->
    <Rank />

    <!-- 猜你喜欢 -->
    <Like />

    <!--楼层-->
    <!-- Floor组件没有轮播效果的原因:
      1.数据绑定流程: 更新状态数据  ==> 同步调用监视的回调函数 ==> 界面就会自动 `异步`更新;
      2.v-for属性遍历的是空数组, 不会渲染组件标签;
      3.组件Floor中v-for的属性没有数据是不会渲染的,但组件中一般属性如果没有属性值则会去渲染,所以才导致Floor组件没有轮播效果;
      而ListContainer组件(<Carousel :carouselList="banners" />)有轮播效果.
    -->
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>

    <!--商标-->
    <Brand />
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import TodyRecommend from './TodayRecommend/TodayRecommend'
  import Brand from './Brand/Brand'
  import Floor from './Floor/Floor'
  import Like from './Like/Like'
  import ListContainer from './ListContainer/ListContainer'
  import Rank from './Rank/Rank'
  export default {
    name: 'Home',

    mounted(){
      //触发vuex的异步action调用,从mock接口请求数据到state中
      this.$store.dispatch('getBanners');
      this.$store.dispatch('getFloors');
    },

    computed: {
      ...mapState({
        floors: state => state.home.floors
      })
    },

    

    components: { // 局部注册, 只能在当前组件中使用
      TodyRecommend,
      Brand,
      Floor,
      Like,
      ListContainer,
      Rank
    }
  }
</script>

<style lang="less" scoped>
</style>