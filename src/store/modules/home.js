//用于操作首页模块数据的vuex模块
import {reqBaseCategoryList, reqBanners, reqFloors} from '@/api'
//初始state
const state = {
  baseCategoryList: [], //所有3级分类的组件
  banners: [], //广告轮播列表
  floors: [], //所有楼层列表
}
const mutations = {
  //接收保存分类列表(内部管理的state)
  RECEIVE_CATEGORYS(state, categorys){
    state.baseCategoryList = categorys.splice(0, categorys.length-2)
  },

  //接收保存广告列表(内部管理的state)
  RECEIVE_BANNERS(state, banners){
    state.banners = banners
  },

  //接收保存所有楼层列表(内部管理的state)
  RECEIVE_FLOORS(state, floors){
    state.floors = floors
  }
}
const actions = {
  //发送ajax,异步获取分类列表
  async getBaseCategoryList({commit}) {
    // console.log('getBaseCategoryList()');
    //1.调用接口请求函数发异步ajax请求
    const result = await reqBaseCategoryList()
    //2.得到成功的数据后,提交给mutations去更新状态
    if(result.code === 200){
      const categorys = result.data;
      commit('RECEIVE_CATEGORYS', categorys);
    }
  },

  //异步获取广告轮播列表
  async getBanners({commit}){
    //异步获取分类列表
    const result = await reqBanners() //{code:200, data:banners}
    //得到成功的数据后,提交给mutations去更新状态
    if(result.code === 200){
      const banners = result.data;
      commit('RECEIVE_BANNERS', banners);
    }
  },

  //异步获取所有楼层列表
  async getFloors({commit}){
    //异步获取分类列表
    const result = await reqFloors() //{code:200, data:banners}
    //得到成功的数据后,提交给mutations去更新状态
    if(result.code === 200){
      const floors = result.data;
      commit('RECEIVE_FLOORS', floors);
    }
  }
}
const getters = {}


export default {
  state,
  mutations,
  actions,
  getters,
}