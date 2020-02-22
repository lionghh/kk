<template>
  <div class="iui-flex-content pages-attendance-list">
    <div class="iui-flex-row iui-flex-vertical">
      <div class="iui-flex-col">
        <header class="iui-toolbar">
          <h1 class="iui-toolbar-title">往期记录</h1>
          <a class="iui-fn-right" href="javascript:;" @click="toAdd">
            <i class="iui-icon mdi mdi-plus-circle"></i>
          </a>
        </header>
      </div>

      <div class="iui-flex-col iui-flex-col-auto">
        <div class="iui-flex-content scroll-list-wrap">
          <cube-scroll ref="scroll" :data="items"
                       :options="options"
                       @pulling-down="onPullingDown"
                       @pulling-up="onPullingUp">

            <div class="iui-list iui-list-media">
              <ul>
                <li v-for="item in items" @click="toDetail(item)">
                  <a class="iui-list-item iui-list-item-link">
                    <div class="iui-list-item-inner">
                      <div class="iui-list-item-title-row iui-flex-align-center">
                        <div class="iui-list-item-after">
                          <img src="../../assets/temp/1.png" alt="">
                        </div>
                        <div class="iui-list-item-title">
                          <span class="sub-username">{{item.realName}}</span>
                          <span class="sub-userphone">{{item.realPhone}}</span>
                        </div>
                        <div class="iui-list-item-after">
                          <span class="sub-state"
                                :class="[stateInfo[item.state].cname]">{{stateInfo[item.state].text}}</span>
                        </div>
                      </div>
                      <div class="iui-list-item-subtitle">
                        <ul>
                          <li class="">
                            <span class="sub-label">预约业务：</span>
                            <span class="sub-text">{{item.business}}</span>
                          </li>
                          <li class="">
                            <span class="sub-label">预约网点：</span>
                            <span class="sub-text">{{item.reservationBranch}}</span>
                          </li>
                          <li class="">
                            <span class="sub-label">预约办理时间：</span>
                            <span class="sub-text">{{item.reservationTime}}</span>
                          </li>
                          <li class="">
                            <span class="sub-label">预约提交时间：</span>
                            <span class="sub-text">{{item.createTime}}</span>
                          </li>
                          <li class="">
                            <span class="sub-label">预约留言：</span>
                            <span class="sub-text">{{item.remark}}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div class="list-empty-flag" v-show="items.length==0 && isQuery">
              暂无数据
            </div>
            <div class="no-more-data" v-show="items.length!=0 && !nextPage && isQuery">
              没有更多数据
            </div>
          </cube-scroll>
        </div>
      </div>

      <div class="iui-flex-col">
        <nav class="iui-navbar">
          <a class="iui-navbar-item" :class="{'iui-current' : queryData.dataType==0}" href="javascript:;"
             @click="changeDataType(0)">
            <i class="iui-icon mdi mdi-format-align-justify"></i>
            <div class="iui-navbar-item-label">全部</div>
            <span class="count-num">{{items.length}}</span>
          </a>
          <a class="iui-navbar-item" href="javascript:;" :class="{'iui-current' : queryData.dataType==1}"
             @click="changeDataType(1)">
            <i class="iui-icon mdi mdi-camera-timer"></i>
            <div class="iui-navbar-item-label">待受理</div>
            <span class="count-num">{{items.length}}</span>
          </a>
          <a class="iui-navbar-item" :class="{'iui-current' : queryData.dataType==2}" href="javascript:;"
             @click="changeDataType(2)">
            <i class="iui-icon mdi mdi-account-edit"></i>
            <div class="iui-navbar-item-label">受理中</div>
            <span class="count-num">{{items.length}}</span>
          </a>
          <a class="iui-navbar-item" href="javascript:;" :class="{'iui-current' : queryData.dataType==3}"
             @click="changeDataType(3)">
            <i class="iui-icon mdi mdi-shield-remove-outline"></i>
            <div class="iui-navbar-item-label">已取消</div>
            <span class="count-num">{{items.length}}</span>
          </a>
          <a class="iui-navbar-item" href="javascript:;" :class="{'iui-current' : queryData.dataType==4}"
             @click="changeDataType(4)">
            <i class="iui-icon mdi mdi-verified"></i>
            <div class="iui-navbar-item-label">已完成</div>
            <span class="count-num">{{items.length}}</span>
          </a>
        </nav>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    props: {},
    data: function () {
      return {
        openId:'',
        items: [],
        stateInfo: {
          1: {cname: 'iui-txt-primary', text: '待受理'},
          2: {cname: 'iui-txt-highlight', text: '已受理'},
          3: {cname: 'iui-txt-warning', text: '已取消'},
          4: {cname: 'iui-txt-success', text: '已完成'}
        },
        isQuery: false,   // 未查询
        nextPage: false,  // 有没有下载数据
        queryCount: 0,    // 全局用查询次数计算器
        queryData: {
          pageNum: 1,
          pageSize: 4,      // 数据要满一屏
          dataType: 0       // 0全部，1待受理， 2受理中，3取消，4完成
        }
      }
    },
    mounted () {
      console.log(33333333)
      this.openId = this.$route.query.openId
      this.getMyList()
      console.log(1111)
    },
    computed: {
      options: function () {
        return {
          pullDownRefresh: {
            txt: '数据即将刷新'
          },
          pullUpLoad: this.nextPage && { // 是否可以下拉及下拉选项
            txt: {
              more: '向上加载更多...',
              noMore: ''
            }
          }
        }
      }
    },    
    methods: {
      getMyList:function(){
        let url = "http://watuji111.natapp4.cc/renren-fast/generator/reservation/listAll";
        this.$http({
          url: url,
          method: 'get',
          params: {'openId':this.openId}
        }).then((res)=> {          
          if (res && res.code === 0) {
            this.items = res.list
          }else{
            //console.log(1111)
          }
        })
      },
      toAdd(){
        this.$router.push({name: 'AddSubscribe'})
      },
      toDetail(item){
        this.$router.push({name: 'SubscribeDetail', query: {id: item.id}})
      },
      changeDataType(type){
        if (this.queryData.dataType != type) {
          this.queryData.dataType = type
          this.getApplyList(0)
        }
      },
      onPullingDown(){ // 模拟刷新数据
        this.getApplyList(0)
      },
      onPullingUp(){ // 加载新数据
        if (this.nextPage) {
          this.getApplyList(1)
        } else {
          this.$refs.scroll.forceUpdate()
        }
      },
      getApplyList(type){  // 0刷新，1加载更多
        this.isQuery = false
        let _this = this
        let toast = null
        this.queryCount++
        let localCount = this.queryCount

        if (type == 0) {
          this.items = []   // 重置数据，否则查询出错时，会显示历史数据
          toast = this.$createToast({
            time: 0,
            txt: '加载中',
            mask: true
          })
          toast.show()
        }
        if (type == 0) {
          this.queryData.pageNum = 1
        }

        //this.$http.post("/userapro/getLeaveList", this.queryData).then(function (data) {
        this.getData("/userapro/getLeaveList", this.queryData).then(function (data) {
          if (localCount != _this.queryCount) { // 历史请求的返回数据要被抛弃...
            return
          }
          let item = data || []
          if (type == 0) { //
            _this.items = item
          } else {
            _this.items = _this.items.concat(item)
          }

          _this.nextPage = item.length == _this.queryData.pageSize

          if (_this.nextPage) {
            _this.queryData.pageNum = _this.queryData.pageNum + 1
          }
        }).finally(function () {
          _this.isQuery = true
          if (toast) {
            toast.hide()
          }
          _this.$refs.scroll.forceUpdate()
        })
      },
      getData(url, params){  // 模拟请求得到数据
        return new Promise(function (res, rej) {
          setTimeout(function () {
            var data = [{
              username: '凯凯',
              userphone: '13112341234',
              business: '开户',
              address: '总部',
              subtime: '星期天',
              submittime: '提交时间',
              note: '没有留言啊',
              state: 1
            }, {
              username: '凯凯',
              userphone: '13112341234',
              business: '开户',
              address: '总部',
              subtime: '2020-02-12 12:00',
              submittime: '2020-02-12 12:00',
              note: '没有留言啊',
              state: 2
            }, {
              username: '凯凯',
              userphone: '13112341234',
              business: '开户',
              address: '总部',
              subtime: '星期天',
              submittime: '提交时间',
              note: '没有留言啊',
              state: 3
            }, {
              username: '凯凯',
              userphone: '13112341234',
              business: '开户',
              address: '总部',
              subtime: '星期天',
              submittime: '提交时间',
              note: '没有留言啊',
              state: 4
            }];
            if (params.pageNum == 2) { // 假设第3页没数据了
              data = [];
            }
            res(data);
          }, 2000)
        });
      }
    },
    mounted(){
      this.getApplyList(0)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .iui-list
    margin-top 10px

  .sub-label
    font-size 13px
    color #444

  .sub-text
    font-size 13px
    color #777
    margin-left 10px

  .iui-list .iui-list-item-subtitle
    margin-top 10px

  .sub-username
    margin-left 5px
    font-size 20px

  .sub-userphone
    margin-left 10px

  .sub-username,
  .sub-userphone
    color #0083d3

  .iui-list-item-after img
    display block
    width 30px
    height 30px
    border-radius 4px
    background-color #eee

  .iui-list-item-subtitle
    margin-left 10px

  .iui-navbar .iui-navbar-item
    position relative

  .count-num
    position absolute
    min-width 14px
    min-height 14px
    border-radius 50%
    background-color red
    top 0
    left 60%
    color #fff
    font-size 10px
    line-height 13px
    text-align center
    padding 0 2px
    display none

  .no-more-data,
  .list-empty-flag
    font-size 15px
    text-align center
    padding 10px 0

  .iui-navbar-item.iui-current .count-num
    display block

</style>
