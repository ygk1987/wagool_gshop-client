<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  /*
    如果使用vue函数对象上的方法,Vue.nextTick需要引入vue (import Vue from 'vue' )
    如果使用vue实例对象的方法,则不需要引入vue
  */
  // 
  import Swiper from 'swiper'
  export default {
    name: 'Carousel',
    props:{
      carouselList: Array //接收外部传入的轮播列表数据
    },
    //在页面初始显示后立即执行
    mounted() {
      // console.log('mounted', this.carouselList.length); //banners数据是异步获取,所以长度是0
      /*setTimeout(() => { //此方案,延迟的时间不好指定,所以此方案不可用
        //要求: 创建Swiper对象必须要在轮播列表页面显示之后执行才可以 ==> 否则轮播效果有问题
        // new Swiper ('.swiper-container', { //配置对象
        new Swiper (this.$refs.swiper, { //配置对象
          // direction: 'vertical', // 垂直切换选项     默认是水平切换
          loop: true, // 循环模式选项
          
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
          
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        }) 
      }, 1000);*/
    },

    watch: {
      //监视carouselList,因为是赋值(state.banners = banners)操作,所以使用一般监视就可以了
      carouselList:{
        handler(){ //说明carouselList状态数据发送了改变,但此时页面还没有更新,只是数据绑定了
          //只有数组中有数据,才需要创建swiper对象
          if(this.carouselList.length === 0) return;
          
          console.log('watch carouselList', this.carouselList.length);
          /*数据绑定的流程:
            更新状态数据 ==> 同步调用监视的回调函数 ==>界面就会自动 [异步] 更新
          */
          /*vm.$nextTick( [callback] )
            将回调延迟到下次 DOM 更新循环(更新界面)之后执行。$nextTick()在修改数据之后立调用，然后等待 DOM 更新。
            它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
          */
          // Vue.nextTick(() => { //回调函数在界面更新之后执行
          this.$nextTick(() => { //回调函数在界面更新之后执行
            //必须在轮播列表界面显示之后创建
            new Swiper(this.$refs.swiper, { //配置对象
              // direction: 'vertical', // 垂直切换选项     默认是水平切换
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            })
          })
        },
        immediate: true //在初始显示时就立即执行一次; 默认是false(只有数据改变才立即执行)
      },
      
      // carouselList() {//说明carouselList状态数据发送了改变,但此时页面还没有更新,只是数据绑定了 
      //   console.log('watch carouselList', this.carouselList.length);
      //   /*数据绑定的流程:
      //     更新状态数据 ==> 同步调用监视的回调函数 ==>界面就会自动 [异步] 更新*/
      //   /*vm.$nextTick( [callback] )
      //     将回调延迟到下次 DOM 更新循环(更新界面)之后执行。$nextTick()在修改数据之后立调用，然后等待 DOM 更新。
      //     它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。*/ 
      //   // Vue.nextTick(() => { //回调函数在界面更新之后执行
      //   this.$nextTick(() => { //回调函数在界面更新之后执行
      //     //必须在轮播列表界面显示之后创建
      //     new Swiper(this.$refs.swiper, { //配置对象
      //       // direction: 'vertical', // 垂直切换选项     默认是水平切换
      //       loop: true, // 循环模式选项
      //       // 如果需要分页器
      //       pagination: {
      //         el: '.swiper-pagination',
      //       },
      //       // 如果需要前进后退按钮
      //       navigation: {
      //         nextEl: '.swiper-button-next',
      //         prevEl: '.swiper-button-prev',
      //       },
      //     })
      //   })
      // }
    },
  }
</script>

<style lang="less" scoped>

</style>