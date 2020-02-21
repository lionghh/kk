import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 注册路由插件
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: './',
  routes
})
router.beforeEach((to, from, next) => {

  //
  if (to.meta.keepAlive) {    //　如果去往的页面有缓存
    let keepAliveFrom = to.meta.keepAliveFrom

    // 缓存的key设置的是组件名称+ts的值，如果不是从指定的页面前往缓存页面，则更新ts参数，使用新的页面，不使用缓存页面
    if (keepAliveFrom && keepAliveFrom.indexOf(from.name) == -1) {
      to.meta.ts = Date.now()   // meta新增字段信息不会丢失，在params或query里面新增字段，回退页面时信息丢失
    }
  }
  next()
})

export default router
