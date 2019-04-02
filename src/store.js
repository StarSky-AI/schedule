import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //存入登陆token
    token: ''
  },
  mutations: {
    //写一个方法设置token
    settoken(state, token) {
      state.token = token
    }
  },
  actions: {

  },
  getters: {

  }
})
