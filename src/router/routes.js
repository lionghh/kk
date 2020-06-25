import  NotFind from '../pages/NotFind.vue'
import  Error from '../pages/Error.vue'


// 预约
import SubscribeList from '../pages/subscribe/SubscribeList.vue'
import AddSubscribe from '../pages/subscribe/AddSubscribe.vue'
import SubscribeDetail from '../pages/subscribe/SubscribeDetail.vue'
import SubscribeEdit from '../pages/subscribe/SubscribeEdit.vue'

//网点管理员处理
import ManageList from '../pages/subscribe/ManageList.vue'

//转盘
import test from '../pages/subscribe/test.vue'

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
    path: '/SubscribeDetail',
    name: 'SubscribeDetail',
    component: SubscribeDetail
  },{
    path: '/SubscribeEdit',
    name: 'SubscribeEdit',
    component: SubscribeEdit
  },{
    path: '/ManageList',
    name: 'ManageList',
    component: ManageList
  },{
    path: '/test',
    name: 'test',
    component: test
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
