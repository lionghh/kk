<template>
  <div class="iui-flex-content pages-add-subscribe">
    <div class="iui-flex-content">
      <div class="page-content">
        <div class="sub-banner">
          <ul>
            <li>
              <img src="../../assets/img/sub-banner.png" alt="">
              <div class="banner-desc">
                浏阳XX银行—建设有温度的百姓银行
              </div>
            </li>
          </ul>
        </div>

        <div class="list-form">
          <div class="list-form-row">
            <div class="list-form-label">
              您的姓名<span class="list-form-required">*</span>
            </div>
            <div class="list-form-input-wrap">
              <input class="list-form-input" type="text" placeholder="请输入您的姓名" v-model="subInfo.realName">
            </div>
          </div>
          <div class="list-form-row">
            <div class="list-form-label">
              您的电话<span class="list-form-required">*</span>
            </div>
            <div class="list-form-input-wrap">
              <input class="list-form-input" type="text" placeholder="请输入您的电话" v-model="subInfo.realPhone">
            </div>
          </div>
          <div class="list-form-row">
            <div class="list-form-label">
              预约业务<span class="list-form-required">*</span>
            </div>
            <div class="list-form-input-wrap">
              <input class="list-form-input" type="text" placeholder="请输入预约业务" v-model="subInfo.business">
            </div>
          </div>
          <div class="list-form-row">
            <div class="list-form-label">
              预约办理时间<span class="list-form-required">*</span>
            </div>
            <div class="list-form-input-wrap">
              <input class="list-form-input" type="text" placeholder="请输预约办理时间" v-model="subInfo.reservationTime" readonly
                     @click="showDatePicker">
            </div>
          </div>
          <div class="list-form-row">
            <div class="list-form-label">
              预约办理网点<span class="list-form-required">*</span>
            </div>
            <div class="list-form-input-wrap">
              <input class="list-form-input" type="text" placeholder="请输入预约办理网点" v-model="subInfo.reservationBranch" readonly
                     @click="showAddressPicker">
            </div>
          </div>

          <div class="list-form-row">
            <div class="list-form-input-wrap">
              <textarea class="list-form-textarea" placeholder="您需要的其他金融服务请留言!" v-model="subInfo.remark"></textarea>
              <div class="list-form-input-tips">*限800字</div>
            </div>
          </div>


          <div class="list-form-row">
            <div class="list-form-input-wrap">
              <button class="list-form-btn" @click="submit">立即提交</button>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="to-sub-history" @click="toList">
      <i class="mdi mdi-history"></i>
      往期记录
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  function formatDate(date) {
    if (date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      return y + "-" + formatNum(m) + "-" + formatNum(d) + " " + formatNum(date.getHours()) + ":" + formatNum(date.getMinutes())
    } else {
      return ''
    }
  }

  // 格式化数字
  function formatNum(num) {
    let str = num.toString()
    if (str.length < 2) {
      str = "0" + str;
    }
    return str;
  }

  export default {
    props: {},
    data() {
      return {
        test:10,
        subInfo: {
          openId:'',
          realName: '',
          realPhone: '',
          business: '',
          reservationTime: '',
          reservationBranch: "",
          remark: ''
        },
        wxUrl:'',
        wxInfo:{
          openId: '',
          nickname: '',
          sexDesc: '',
          sex: '',
          language: '',
          city: '',
          province: '',
          country: '',
          headImgUrl: '',
          privileges: ''
        }
      }
    },
    mounted () {
      //this.getWxUrl();
      console.log(this.$route.query)
      this.subInfo.openId = this.$route.query.openId
      this.wxInfo.openId = this.$route.query.openId
      this.wxInfo.nickname = this.$route.query.nickname
      this.wxInfo.headImgUrl = this.$route.query.headImgUrl
      console.log(this.wxInfo)
    },
    computed: {},
    methods: {
      getWxUrl:function(){
        //console.log(window.location.href)
        this.$http({
          // url: "https://zzttt.xyz/renren-fast/generator/reservation/wx/wxurl/wxa548cb4128d6400b",
          // method: 'get',
          // params: {'redirectUrl':'https://zzttt.xyz/renren-fast/'}
          url: "http://watuji111.natapp4.cc/renren-fast/generator/reservation/wx/wxurl/wx2ad03fd034a898d8",
          method: 'get',
          params: {'redirectUrl':'http://watuji111.natapp4.cc/renren-fast/generator/reservation//wx/wxlogin/wx2ad03fd034a898d8'}
        }).then((res)=> {          
          if (res && res.code === 0) {

          }else{
            //console.log(1111)
          }
        })
      },
      getWxInfo:function(){
        this.$http({
          url: this.wxUrl,
          method: 'get',
          params: ''//this.$http.adornParams()
        }).then((res)=> {
          //console.log(data)
          if (res && res.code === 0) {            
            console.log(res)
          }else{
            
          }
        })
      },
      pageBack(){
        this.$router.back()
      },
      showDatePicker(){
        if (!this.datePicker) {
          let self = this
          this.datePicker = this.$createDatePicker({
            title: '选择预约时间',
            value: new Date(),
            columnCount: 6,
            onSelect: function (date) {
              self.subInfo.date = formatDate(date)
            }
          })
        }
        this.datePicker.show()
      },
      showAddressPicker(){
        if (!this.addressPicker) {
          let self = this
          let data = [{text: '剧毒', value: '剧毒value'}, {text: '蚂蚁', value: '蚂蚁value'},
            {text: '幽鬼', value: '幽鬼value'}];
          this.addressPicker = this.$createPicker({
            title: '选择预约网点',
            data: [data],
            onSelect: function (value, index, text) {
              self.subInfo.reservationBranch = text
            }
          })
        }
        this.addressPicker.show()
      },
      submit(){
        console.log(this.subInfo.reservationBranch.toString())
        if (!this.subInfo.realName) {
          let url = "http://watuji111.natapp4.cc/renren-fast/generator/reservation/save"
          this.$http.post(
            url, 
            {
              'openId':this.subInfo.openId,
              'realName': this.subInfo.realName,
              'realPhone': this.subInfo.realPhone,
              'business': this.subInfo.business,
              'reservationTime': this.subInfo.reservationTime.toString(),
              'reservationBranch': this.subInfo.reservationBranch.toString(),
              'remark': this.subInfo.remark
            }
            ).then((res)=> {
              console.log(res);
              if (res && res.code === 0) {
                this.$router.push({
                path: '/SubscribeList?openId=' + this.subInfo.openId,
              })
              }else{
                
              }              
          });


          // this.$createDialog({type: 'alert', title: '提示', content: '补卡申请已经审核过了'}).show()
          // this.$createToast({txt: '请填写您的姓名', type: 'text'}).show()
         // this.$createToast({txt: '请填写您的姓名', type: 'loading'}).show()
          // this.$router.push({name: 'SubscribeList'})          
        }
      },
      toList(){
        this.$router.push({name: 'SubscribeList'})
      }
    },
    created: function () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .sub-banner ul li
    position relative

  .sub-banner li img
    display block
    width 100%

  .sub-banner li .banner-desc
    position absolute
    bottom 0
    left 0
    right 0
    background-color rgba(0, 0, 0, 0.5)
    text-align center
    font-size 12px
    padding 0 10px
    color #fff
    line-height 28px

  .iui-list-item-input
    text-align right

  .list-form
    padding 0 15px 60px

  .list-form-row
    padding-top 20px

  .list-form-label
    font-size 14px
    color #000
    font-weight bold
    padding-bottom 5px

  .list-form-required
    color red

  .list-form-textarea,
  .list-form-input
    display block
    width 100%
    -webkit-appearance none
    border: solid 1px #f5f5f5;
    border-radius: 3px;
    padding: 5px 10px;
    background-color: #fff;
    font-size 17px
    line-height 26px
    color #666

    &::-webkit-input-placeholder
      text-align right
      color #999
      font-size 14px

  .list-form-textarea
    height 100px
    &::-webkit-input-placeholder
      text-align left

  .list-form-input-tips
    text-align right
    font-size 12px
    color #b2b2b2
    margin-top 5px

  .list-form-btn
    -webkit-appearance none
    display block
    width 100%
    background-color #ef4f4f
    border none
    text-align center
    color #fff
    border-radius 5px
    font-size 16px
    line-height 42px

  .to-sub-history
    position absolute
    bottom 0
    left 0
    right 0
    padding 5px 0 10px 0
    text-align center
    font-size 12px
    color #61749b
    line-height 18px
    .mdi
      font-size 14px

</style>
