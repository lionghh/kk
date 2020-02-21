import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionId: '5121574847416796' ,   // 默认应该为null，测试用
    userInfo:null
  },
  mutations: {
    setSessionId: function (state, sid) {   // 用来更新session或置为空
      state.sessionId = sid
    },
    setUserInfo: function (state, sid) {   // 用来更新session或置为空
      state.userInfo = sid
    }
  },
  actions: {},
  modules: {}
})
