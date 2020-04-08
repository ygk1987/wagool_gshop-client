//vuex最核心的管理对象
import Vue from 'vue';
import Vuex from 'vuex';

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//声明使用Vuex的插件
Vue.use(Vuex);

const moduleA = {
  state: {
    xxx:1,
    yyy:{},
  },
  mutations: {},
  actions: {},
  getters: {},
}

const moduleB = {
  state: {
    zzz: []
  },
  mutations: {},
  actions: {},
  getters: {},
}

//向外暴露store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    a: moduleA,
    b: moduleB,
  }
})