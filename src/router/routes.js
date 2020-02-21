import  NotFind from '../pages/NotFind.vue'
import  Error from '../pages/Error.vue'


// 预约
import SubscribeList from '../pages/subscribe/SubscribeList.vue'
import AddSubscribe from '../pages/subscribe/AddSubscribe.vue'


// meta设置页面是否缓存
// keepAlive则页面缓存
// keepAliveFrom 设置从哪些页面返回时保留缓存(通常是从此页面进入的后续页面)，其它页面进入此页面则页面内容重新加载

export default [
  {
    path: '/SubscribeList',
    name: 'SubscribeList',
    component: SubscribeList
  }, {
    path: '/',
    name: 'AddSubscribe',
    component: AddSubscribe
  },{
    path: '/error',
    name: 'Error',
    component: Error
  }, {
    path: '/*',
    name: 'NotFind',
    component: NotFind
  }
]
