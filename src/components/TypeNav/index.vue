<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="isShowFirst=true" @mouseleave="hideFirst">
        <h2 class="all">全部商品分类</h2>
        <transition name="move">
          <div class="sort" v-if="isShowFirst" @click="toSearch">
            <div class="all-sort-list2">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{item_on:currentIndex === index}" @mouseenter="showSubCategorys(index)">
                <h3>
                  <a href="javascript:;" :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                  <!-- <router-link :to="{path: '/search', query:{categoryName:c1.categoryName, category1Id:c1.categoryId}}">{{c1.categoryName}}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a href="javascript:;" :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                        <!-- <router-link :to="{path: '/search', query:{categoryName:c2.categoryName, category2Id:c2.categoryId}}">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a href="javascript:;" :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                          <!-- <router-link :to="{path: '/search', query:{categoryName:c3.categoryName, category3Id:c3.categoryId}}">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
  //读取vuex中数据
  import {
    mapState
  } from 'vuex';
  // import _ from 'lodash'; //引入lodash包含所有工具函数方法的对象 ==> 会打包整个lodash库
  // 只引入要用的throttle
  import throttle from 'lodash/throttle'; //对lodash按需引入打包,减小文件的大小
  export default {
    name: 'TypeNav',
    data() {
      return {
        isShowFirst: true,
        currentIndex: -1 //当前一级分类下标:需要显示2/3分类列表的一级分类下标
      }
    },

    methods: {
      //显示指定一级分类下的 2/3级分类列表
      //未做函数节流处理
      // showSubCategorys: function(index){
      //   this.currentIndex = index
      // }
      //使用lodash的throttle进行函数节流处理,减少高频触发
      // showSubCategorys: _.throttle(function (index) { //通过lodash对象_中的throttle方法处理
      showSubCategorys: throttle(function (index) { //直接使用throttle函数处理
        // console.log('处理mouseenter事件的回调函数', index);
        this.currentIndex = index
      }, 300),

      /*
        点击某个分类项跳转到search路由
      */
      toSearch(event) { //只绑定了一个点击监听 
        //  console.dir(event.target.tagName);
        // console.log(event.target.dataset);
        //得到所有标签上的data自定义属性
        const dataset = event.target.dataset;
        //取出自定义属性值
        const {
          categoryname,
          category1id,
          category2id,
          category3id
        } = dataset;
        //严谨的写法
        if (categoryname) { //必然点击了分类项
          //准备query参数对象
          const query = {
            categoryName: categoryname
          }
          if (category1id) {
            query.category1Id = category1id
          } else if (category2id) {
            query.category2Id = category2id
          } else if (category3id) {
            query.category3Id = category3id
          }
          /* 区分是否在当前搜索界面 */
          //1.如果当前已经在搜索界面
          //得到当前路由路径
          const {path,params} = this.$route;

          this.isShowFirst = false;
          this.currentIndex = -1;


          if (path.indexOf('/search') === 0) {
            //跳转到搜索界面,path为原本的路径(可能携带了params参数)
            // this.$router.push({path, query})
            this.$router.replace({
              path,
              query
            }) //这里用replace是为了可以直接回退到home
          } else {
            //2.当前没有在搜索界面
            //跳转路由并携带query参数
            this.$router.push({
              path: '/search',
              query
            });
          }
        }

        //这种写法不严谨
        // if(event.target.tagName === 'A'){ //如果是点击的a标签,才进行跳转
        //   this.$router.push({path:'/search'});
        // }
      },

      hideFirst() {
        //离开时隐藏2/3级分类列表
        this.currentIndex = -1

        //离开的时候,只有不在首页时才去隐藏
        if (this.$route.path !== '/') {
          this.isShowFirst = false
        }
      }
    },

    mounted() {
      //触发vuex中的getBaseCategoryList action调用
      // this.$store.dispatch('getBaseCategoryList');

      //得到当前路由路径
      const path = this.$route.path;
      //如果不在首页指定隐藏一级分类列表
      if (path != '/') {
        this.isShowFirst = false;
      }
    },

    computed: {
      // ...mapState(['home']), //{baseCategoryList: []}
      // ...mapState({home: 'home'}), //{baseCategoryList: []}

      /*
        数组和对象的写法无法得到某个模块的state内部的某个数据
        只要是Vuex的多模块编程就得用函数的这种写法
      */
      ...mapState({
        //计算属性值有vue自动调用右侧的函数返回
        categoryList: state => state.home.baseCategoryList,
      })
      /*
        [
          {
            categoryId: 1,
            categoryName:'一级分类名',
            categoryChild: [
              categoryId: 1,
              categoryName:'二级分类名',
              categoryChild:[
                categoryId: 1,
                categoryName:'三级分类名',
              ]
            ]
          }
        ]
      */
    }
  }
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;
        &.move-enter-active, &.move-leave-active {
          transition: all .3s;
        }
        &.move-enter, &.move-leave-to {
          opacity: 0;
          height: 0;
        }

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              _height: 200px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &.item_on {
              background: #ccc;

              .item-list {
                display: block;
              }
            }
          }
        }
      }
    }
  }
</style>