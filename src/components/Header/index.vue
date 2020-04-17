<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 已登陆显示 -->
          <p v-if="userInfo.name">
            <span>{{userInfo.name}}</span>
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:;" @click="logout">退出</a>
          </p>
          <!-- 未登陆显示 -->
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/">
          <img src="./images/Logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'Header',
    data(){
      return{
        keyword: '',
      }
    },

    //计算属性
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },

    //生命周期函数
    mounted(){
      //通过全局事件总线绑定removeKeyword事件监听
      this.$bus.$on('removeKeyword', () => {
        this.keyword = '';
      })
    },

    methods: {
      //退出
      async logout(){
        try{
          await this.$store.dispatch('loginout')
          //退出登录后,自动跳转到首页
          this.$router.replace('/');
        }catch(error){
          alert(error.message)
        }
      },

      //搜索
      toSearch(){
        /*
          利用router对象来跳转路由
          this.$router:得到的是路由器对象(包含跳转路由的一些方法,比如push/replace)
          this.$route:得到的是当前路由信息对象(包含的是当前路由的相关数据属性:path/params/query/meta)
        */
        //问题: 编程时路由跳转到当前路由,控制台抛出'NavigationDuplicated'的错误
        // this.$router.push('/search')
        // this.$router.replace('/search');

        //路由传query参数:
        //1.传query字符参数
        // this.$router.push(`/search?keyword=${this.keyword}`)
        //2.传query对象参数
        // this.$router.push({path:'/search', query: {keyword: this.keyword}})
        
        //路由传params参数:需要在路由配置的时候携带上params参数
         //1.传params字符参数
        // this.$router.push(`/search/${this.keyword}`)
        //2.传params对象参数
        // this.$router.push({path:'/search', params: {keyword: this.keyword}}) //错误

        //判断是否有参数数据
        //得到当前的请求路径和query参数对象
        const {path, query} = this.$route
        if(this.keyword){ //一、有关键字搜索
          //判断是否在搜索页面
          //如果有关键字搜索并当前在搜索页面,需要同时携带params和query参数
          if(path.indexOf('/search')===0){
            this.$router.push({
              name:'search', 
              params: {keyword: this.keyword},
              query
            })
          }else{ //如果有关键字搜索但不在搜索页面,只携带params参数
              this.$router.push({name:'search', params: {keyword: this.keyword}})
            }
        }else{//二、没有关键字搜索
          //如果没有关键字搜索但当前在搜索页面,需要同时携带params和query参数
          if(path.indexOf('/search')===0){
            this.$router.push({name:'search',query});
          }else{
            //如果没有关键字搜索,当前也不在搜索页面,需要同时携带params参数
            this.$router.push({name:'search'});
          } 
        }
        
        //解决方案1:在跳转时指定成功的或失败的回调函数
        // this.$router.push('/search', () => {
          // console.log('跳转成功!!!');
        // })
        /*
         (error) => {
            console.log('跳转路由出错', error)
          }
        */ 

        // this.$router.push('/search', undefined, () => {})
        // this.$router.push('/search').catch(() => {})

        //解决方案2.修正Vue原型上的push和replace方法
        // this.$router.push('/search')

      }
    },
  }
</script>

<style lang="less" scoped>
  .header {
    &>.top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;

            &+a {
              border-left: 1px solid #b3aeae;
            }
          }

        }

      }
    }

    &>.bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;

            &:focus {
              outline: none;
            }
          }

          button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>