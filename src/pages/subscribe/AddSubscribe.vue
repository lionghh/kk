<template>
  <div class="iui-flex-content pages-add-subscribe">
    <div class="iui-flex-content">
      <div class="page-content">
        <div class="sub-banner">
          <cube-slide ref="slide" :data="items" @change="changePage" class="" :showDots="false">
            <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
              <a href="javascript:;">
                <img :src="item.image">
              </a>
            </cube-slide-item>
          </cube-slide>

          <div class="banner-desc">
            宁乡农商银行—建设有温度的百姓银行
          </div>
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
              您的身份证号码
            </div>
            <div class="list-form-input-wrap">
              <input class="list-form-input" type="text" placeholder="请输入您的身份证号码" v-model="subInfo.cardId">
            </div>
          </div>
          <div class="list-form-row">
            <div class="list-form-label">
              您的地址
            </div>
            <div class="list-form-input-wrap">
              <input class="list-form-input" type="text" placeholder="请输入您的地址" v-model="subInfo.address">
            </div>
          </div>
          <div class="list-form-row">
            <div class="list-form-label">
              预约业务<span class="list-form-required">*</span>
            </div>
            <!-- <div class="list-form-input-wrap">
              <input class="list-form-input" type="text" placeholder="请输入预约业务" v-model="subInfo.business">
            </div> -->
            <div class="list-form-input-wrap">
              <input class="list-form-input" type="text" placeholder="请输入预约业务" v-model="subInfo.business"
                     readonly
                     @click="showBusiness">
            </div>
          </div>
          <div class="list-form-row">
            <div class="list-form-label">
              预约办理时间<span class="list-form-required">*</span>
            </div>
            <div class="list-form-input-wrap">
              <input class="list-form-input" type="text" placeholder="请输预约办理时间" v-model="subInfo.reservationTime"
                     readonly
                     @click="showDatePicker">
            </div>
          </div>
          <div class="list-form-row">
            <div class="list-form-label">
              预约办理网点<span class="list-form-required">*</span>
            </div>
            <div class="list-form-input-wrap">
              <input class="list-form-input" type="text" placeholder="请输入预约办理网点" v-model="subInfo.reservationBranch"
                     readonly
                     @click="showAddressPicker">
            </div>
          </div>

          <div class="list-form-row">
            <div class="list-form-input-wrap">
              <textarea class="list-form-textarea" placeholder="您需要的其他金融服务请留言!" v-model="subInfo.remark"></textarea>
              <div class="list-form-input-tips">*限50字</div>
            </div>
          </div>


          <div class="list-form-row">
            <div class="list-form-input-wrap">
              <button class="list-form-btn" :disabled="isDisable" @click="submit">{{buttonValue}}</button>
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
<script type="text/ecmascript-6">
  import axios from 'axios'
  import VueCookies from 'vue-cookies'
  import img1 from "../../assets/img/1.jpg"
  import img2 from "../../assets/img/2.jpg"
  import img3 from "../../assets/img/3.jpg"

  function formatDate(date) {
    if (date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      return y + "-" + formatNum(m) + "-" + formatNum(d) + " " + formatNum(date.getHours()) + ":" + formatNum(date.getMinutes())
      //return y + "-" + formatNum(m) + "-" + formatNum(d) + " " + formatNum(date.getHours())
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
        isDisable:false,
        buttonValue:'立即提交',
        items: [
          {
            url: '',
            image: img1
          },
          {
            url: '',
            image: img2
          },
          {
            url: '',
            image: img3
          }
        ],
        test: 10,
        subInfo: {
          openId: '',
          realName: '',
          realPhone: '',
          cardId:'',
          address:'',
          business: '',
          reservationTime: '',
          reservationBranch: "",
          remark: ''
        },
        wxUrl: '',
        wxInfo: {
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
      // let isweixin = this.isWeixinBrowser();
      // if(!isweixin){
      //   alert('请在微信中打开该页面！')
      //   return
      // }
      
      //console.log(this.host)
      $cookies.set('openId', this.$route.query.openId)
      $cookies.set('nickname', this.$route.query.nickname)
      $cookies.set('headImgUrl', this.$route.query.headImgUrl)
      console.log(this.$route.query)
      this.subInfo.openId = this.$route.query.openId
      this.wxInfo.openId = this.$route.query.openId
      this.wxInfo.nickname = this.$route.query.nickname
      this.wxInfo.headImgUrl = this.$route.query.headImgUrl
      console.log(this.wxInfo)
    },
    computed: {},
    methods: {
      changePage(current) {
      },
      clickHandler(item, index) {
      },
      //判断是否微信浏览器
      isWeixinBrowser: function () {
        var ua = navigator.userAgent.toLowerCase();
        var result = (/micromessenger/.test(ua)) ? true : false;
        if (result) {
          console.log('你正在访问微信浏览器');
        }
        else {
          console.log('你访问的不是微信浏览器');
        }
        return result;
      },
      
      getWxInfo: function () {
        this.$http({
          url: this.wxUrl,
          method: 'get',
          params: ''//this.$http.adornParams()
        }).then((res)=> {
          //console.log(data)
          //if (res && res.code === 200) {
          if (res && res.code === 0) {
            console.log(res)
          } else {

          }
        })
      },
      pageBack(){
        this.$router.back()
      },
      showDatePicker(){
        let d = new Date(Date.now())
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        let date = d.getDate()
        let hours = d.getHours()

        //console.log(year + '-' + month + '-' + date + '-' + hours)
        if (!this.datePicker) {
          let self = this
          this.datePicker = this.$createDatePicker({
            title: '选择预约时间',
            value: new Date(),            
            //min: [year, 2, 30 , 8],
            //max: [parseInt(year), parseInt(month), parseInt(day)+7 , 16],
            min: new Date(Date.now() + 1*24*60*60*1000),
            max: new Date(Date.now() + 7*24*60*60*1000),
            //startColumn: 'hour',
            columnCount: 4,
            onSelect: function (date) {
              self.subInfo.reservationTime = formatDate(date)
            }
          })
        }
        this.datePicker.show()
      },
      showAddressPicker(){
        if (!this.addressPicker) {
          let self = this
          let data = [{text: '营业部', value: '营业部value'}, {text: '玉潭支行', value: '玉潭支行value'},
            {text: '城郊支行', value: '城郊支行value'},{text: '白马桥支行', value: '白马桥支行value'},
            {text: '沩东支行', value: '沩东支行value'},{text: '道林支行', value: '道林支行value'},
            {text: '大屯营支行', value: '大屯营支行value'},{text: '大屯营支行', value: '大屯营支行value'},
            {text: '花明楼支行', value: '花明楼支行value'},{text: '东湖塘支行', value: '东湖塘支行value'},
            {text: '南田坪支行', value: '南田坪支行value'},{text: '坝塘支行', value: '坝塘支行value'},
            {text: '资福支行', value: '资福支行value'},{text: '灰汤支行', value: '灰汤支行value'},
            {text: '偕乐桥支行', value: '偕乐桥支行value'},{text: '双江口支行', value: '双江口支行value'},
            {text: '金洲支行', value: '金洲支行value'},{text: '朱良桥支行', value: '朱良桥支行value'},
            {text: '夏铎铺支行', value: '夏铎铺支行value'},{text: '回龙铺支行', value: '回龙铺支行value'},
            {text: '菁华铺支行', value: '菁华铺支行value'},{text: '煤炭坝支行', value: '煤炭坝支行value'},
            {text: '喻家坳支行', value: '喻家坳支行value'},{text: '大成桥支行', value: '大成桥支行value'},
            {text: '双凫铺支行', value: '双凫铺支行value'},{text: '老粮仓支行', value: '老粮仓支行value'},
            {text: '枫木桥支行', value: '枫木桥支行value'},{text: '流沙河支行', value: '流沙河支行value'},
            {text: '青山桥支行', value: '青山桥支行value'},{text: '横市支行', value: '横市支行value'},
            {text: '黄材支行', value: '黄材支行value'},{text: '沩山支行', value: '沩山支行value'},
            {text: '巷子口支行', value: '巷子口支行value'},{text: '龙田支行', value: '龙田支行value'},
            {text: '沙田支行', value: '沙田支行value'},{text: '青年支行', value: '青年支行value'},
            {text: '宁宾支行', value: '宁宾支行value'},{text: '工业园支行', value: '工业园支行value'}];
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
      showBusiness(){
        //存款、贷款、信用卡、ETC、POS
        if (!this.businesPicker) {
          let self = this
          let data = [{text: '存款', value: '存款value'}, {text: '贷款', value: '贷款value'},
            {text: '信用卡', value: '信用卡value'},{text: 'ETC', value: 'ETCvalue'},
            {text: 'POS', value: 'POSvalue'},{text: '大额取款', value: '大额取款value'}];
          this.businesPicker = this.$createPicker({
            title: '选择预约业务',
            data: [data],
            onSelect: function (value, index, text) {
              self.subInfo.business = text
            }
          })
        }
        this.businesPicker.show()
      },
      submit(){
        if (!this.subInfo.realName || !this.subInfo.realName.trim || !this.subInfo.reservationTime
                || !this.subInfo.realPhone || !this.subInfo.business || !this.subInfo.reservationBranch) {
          this.$createDialog({
            type: 'alert',
            //title: '我是标题',
            content: '请输入预约信息！',
            icon: 'cubeic-alert'
          }).show()
          return
        }

        if (!(/[\u4e00-\u9fa5]/g.test(this.subInfo.realName))){
          this.$createDialog({
            type: 'alert',
            //title: '我是标题',
            content: '请输入您的中文名，谢谢！',
            icon: 'cubeic-alert'
          }).show()
          return     
        }

        if (!(/^1[34578]\d{9}$/.test(this.subInfo.realPhone))){
          this.$createDialog({
            type: 'alert',
            //title: '我是标题',
            content: '请输入正确的手机号码，谢谢！',
            icon: 'cubeic-alert'
          }).show()
          return          
        }

        let d = new Date(this.subInfo.reservationTime.toString())   
        let hours = d.getHours()     
        if(hours < 9 || hours > 16){
          this.$createDialog({
            type: 'alert',
            //title: '我是标题',
            content: '请在预约时间范围内（早上9点至下午4点）选择，谢谢！',
            icon: 'cubeic-alert'
          }).show()
          return
        }

        this.isDisable=true
        this.buttonValue='正在提交请稍后... ...'
        setTimeout(()=>{
           this.isDisable=false   //点击一次时隔10秒后才能再次点击
           this.buttonValue='立即提交'
        },10000)

        //return
        
        //测试服务号
        let url = "/renren-fast/generator/reservation/save"
        //延阳服务号
        //let url = "https://zzttt.xyz/renren-fast/generator/reservation/save"
        this.$http.post(
            url,
            {
              'wxuserId': this.subInfo.openId,
              'realName': this.subInfo.realName,
              'realPhone': this.subInfo.realPhone,
              'cardId':this.subInfo.cardId,
              'address':this.subInfo.address,
              'business': this.subInfo.business.toString(),
              'reservationTime': this.subInfo.reservationTime.toString(),
              'reservationBranch': this.subInfo.reservationBranch.toString(),
              'remark': this.subInfo.remark
            }
        ).then((res)=> {
          console.log(res);
          //if (res && res.code === 200) {
          if (res && res.code === 0) {  
            this.$router.push({
              path: '/SubscribeList', query: this.$route.query
            })
          } else {
            this.$createDialog({
              type: 'alert',
              //title: '我是标题',
              content: '服务器繁忙，请稍后再试!',
              icon: 'cubeic-alert'
            }).show()            
          }
        });
        
      },
      toList(){
        // let isweixin = this.isWeixinBrowser();
        // if(!isweixin){
        //   alert('请在微信中打开该页面！')
        //   return
        // }else{
        //   this.$router.push({name: 'SubscribeList', query: this.$route.query})
        // }
        this.$router.push({name: 'SubscribeList', query: this.$route.query})
      }
    },
    created: function () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .sub-banner
    position relative

  .sub-banner  img
    display block
    width 100%

  .sub-banner  .banner-desc
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
