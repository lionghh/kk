import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import VueAxios from 'vue-axios'
import store from '../store'
import {Toast, Dialog} from 'cube-ui'

Vue.use(VueAxios, axios);


axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，添加公共前缀，自动添加sessionid
  let sessionId = store.state.sessionId;
  if (config.method == 'post') {
   

  } else if (config.method == 'get') {

  }

  // 添加loading
  return config;
}, function (error) { // 对请求错误做些什么
  console.error(error)
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {  // 在接收请求之前做些什么
    // 这里就是status == 200
    let data = response.data

    // 未登录，登录
    // if (data.respCode != '0000') {
    //   if (data.respCode == '0001') {  // 权限失败
    //     router.push({name: "Error"})  // 往错误页面跳转
    //   } else if (!response.config.headers.errorHandler) {  // 可在请求时在header里面设置参数表示自己处理异常
    //     Dialog.$create({type: 'alert', title: '提示', content: response.data.respMsg || '系统异常，请稍后重试'}).show()
    //   }
    //   return Promise.reject(response)
    // }
    return data
  },
  function (error) {    // 对响应错误做些什么
    Toast.$create({
      type: 'text',
      txt: '服务器开小差了，请稍后重试',
      time: 2000
    }).show()
    return Promise.reject(error);
  })