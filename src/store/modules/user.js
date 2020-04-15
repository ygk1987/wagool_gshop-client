/* 
用于操作首页模块数据的vuex模块
*/
import {reqLogin, reqRegister, reqLogout} from '@/api'
import {getUUID} from '@/utils/storageUtils'

const state = {
  userInfo: {}, // 登陆的用户信息对象
  userTempId: getUUID()
}
const mutations = {
  RECEIVE_USER_INFO(state, userInfo){
    state.userInfo = userInfo
  },

  RESET_USER_INFO(state){
    state.userInfo = {}
  }
}
const actions = {
  //登录的异步action
  async login({commit}, {mobile, password}){
    const result = await reqLogin(mobile, password)
    if(result.code === 200){ //登陆成功
      const userInfo = result.data //{nickName, name, token}
      commit('RECEIVE_USER_INFO', userInfo);
    }else{//登录失败
      throw new Error(result.message || '登录失败');
    }
  },

  //注册的异步action
  async register({commit}, userInfo){ //主要是将数据提交到后台保存
    const result = await reqRegister(userInfo)
    if(result.code !== 200){ //注册失败
      throw new Error(result.message || '登录失败');
    }
  },

  //退出登录的异步action
  async loginout({commit}){ 
    const result = await reqLogout()
    if(result.code !== 200){ //退出登录失败
      throw new Error(result.message || '退出登录失败');
    }else{ //退出登录成功
      commit('RESET_USER_INFO');
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}