<template>
  <div class="iui-flex-content pages-add-subscribe">
    <div class="iui-flex-row iui-flex-vertical">
      <div class="iui-flex-col">
        <header class="iui-toolbar">
          <a class="iui-fn-left" href="javascript:;" @click="pageBack">
            <i class="iui-icon mdi mdi-chevron-left"></i>
          </a>
          <h1 class="iui-toolbar-title">预约详情</h1>
        </header>
      </div>
      <div class="iui-flex-col iui-flex-col-auto">
        <div class="page-content">
          <div class="iui-list iui-list-form">
          </div>
          <div class="iui-list iui-list-form">
            <ul>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约人
                  </div>
                  <div class="iui-list-item-input-wrap">
                    {{subInfo.realName}}
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约人电话
                  </div>
                  <div class="iui-list-item-input-wrap">
                    {{subInfo.realPhone}}
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    受理状态
                  </div>
                  <div class="iui-list-item-input-wrap">
                    待受理
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    提交时间
                  </div>
                  <div class="iui-list-item-input-wrap">
                    {{subInfo.createTime}}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="iui-list iui-list-form">
            <ul>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约业务
                  </div>
                  <div class="iui-list-item-input-wrap">
                    {{subInfo.business}}
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约办理时间
                  </div>
                  <div class="iui-list-item-input-wrap">
                    {{subInfo.reservationTime}}
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约办理网点
                  </div>
                  <div class="iui-list-item-input-wrap">
                    {{subInfo.reservationBranch}}
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约留言
                  </div>
                  <div class="iui-list-item-input-wrap">
                    {{subInfo.remark}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="subInfo.state == 1">
        <div class="iui-flex-col iui-fn-bd-t">
          <ul class="iui-tiled iui-tiled-space iui-fn-p btn-wrap ">
            <li class="">
              <button class="iui-btn iui-btn-block iui-btn-warning" @click="toDelete">删除</button>
            </li>
            <li class="">
              <button class="iui-btn iui-btn-block" @click="toEdit">编辑</button>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <div class="iui-flex-col iui-fn-bd-t">
          <ul class="iui-tiled iui-tiled-space iui-fn-p btn-wrap ">
            <li class="">
              <button class="iui-btn iui-btn-block iui-btn-warning" @click="toDelete">删除</button>
            </li>
          </ul>
        </div>
      </div>  
    </div>
  </div>
</template>
<script>
import VueCookies from 'vue-cookies'
  export default {
    props: {},
    data: function () {
      return {        
        subInfo: {
          id:'',
          openId:'',
          realName: '',
          realPhone: '',
          business: '',
          reservationTime: '',
          reservationBranch: "",
          remark: '',
          state:''
        }
      }
    },
    computed: {},
    methods: {
      getDetail:function(id){
        //测试服务号
        let url = "/renren-fast/generator/reservation/info/" + id;
        //延阳服务号
        //let url = "https://zzttt.xyz/renren-fast/generator/reservation/info/" + id;
        this.$http({
          url: url,
          method: 'get',
          params: {}
        }).then((res)=> {   
          console.log(res)       
          //if (res && res.code === 200) {
          if (res && res.code === 0) {    
            this.subInfo = res.reservation
          }else{
            //console.log(1111)
          }
        })
      },
      delbyid:function(ids){
        //测试服务号
        let url = "/renren-fast/generator/reservation/delete";
        //延阳服务号
        //let url = "https://zzttt.xyz/renren-fast/generator/reservation/delete";
        this.$http({
          url: url,
          method: 'post',
          data: ids
        }).then((res)=> {   
          console.log(res)       
          //if (res && res.code === 200) {
          if (res && res.code === 0) {    
            this.$router.push({name: 'SubscribeList', query: {openId: $cookies.get('openId'),nickname: $cookies.get('nickname'),headImgUrl: $cookies.get('headImgUrl')}})
          }else{
            this.$createDialog({
              type: 'alert',
              //title: '我是标题',
              content: '服务器繁忙，请稍后再试!',
              icon: 'cubeic-alert'
            }).show()  
          }
        })
      },
      pageBack(){
        this.$router.back()
      },
      toEdit(){
        this.$router.push({name: 'SubscribeEdit', query: {id: this.subInfo.id}})
      },
      toDelete(){
        // 如果访问不了变量，则通过这种方式先缓存this
        let _this = this
        this.$createDialog({
          type: 'confirm',
          title: '删除提醒',
          content: '确定删除么?',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: function () {
            //console.log(_this.subInfo.id)
            let ids = []
            ids.push(_this.subInfo.id)
            _this.delbyid(ids)
          },
          onCancel: function () {

          }
        }).show()
      }
    },
    created: function () {
      this.getDetail(this.$route.query.id)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .iui-list-item-label
    min-width 35%

  .iui-list-item-input-wrap
    text-align left

  .btn-wrap
    background-color #fff
</style>
