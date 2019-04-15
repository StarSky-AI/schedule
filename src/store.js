import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //存入登陆token
    token: '',
    LOADING: false
  },
  mutations: {
    //写一个方法设置token
    settoken(state, token) {
      state.token = token
    },
    showLoading(state){
      state.LOADING = true    
    },
    hideLoading (state) {
        state.LOADING = false
    }
  },
  actions: {

  },
  getters: {

  }
})
