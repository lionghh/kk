<template>
  <div class="iui-flex-content pages-add-subscribe">
    <div class="iui-flex-row iui-flex-vertical">
      <div class="iui-flex-col">
        <header class="iui-toolbar">
          <a class="iui-fn-left" href="javascript:;" @click="pageBack">
            <i class="iui-icon mdi mdi-chevron-left"></i>
          </a>
          <h1 class="iui-toolbar-title">预约编辑</h1>
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
                    您的姓名<span class="input-required">*</span>
                  </div>
                  <div class="iui-list-item-input-wrap">
                    <input class="iui-list-item-input" type="text" v-model="subInfo.realName" placeholder="请输入您的姓名">
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    您的电话<span class="input-required">*</span>
                  </div>
                  <div class="iui-list-item-input-wrap">
                    <input class="iui-list-item-input" type="text" v-model="subInfo.realPhone" placeholder="请输入您的电话">
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    您的身份证号码
                  </div>
                  <div class="iui-list-item-input-wrap">
                    <input class="iui-list-item-input" type="text" v-model="subInfo.cardId" placeholder="请输入您的身份证号码">
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    您的地址
                  </div>
                  <div class="iui-list-item-input-wrap">
                    <input class="iui-list-item-input" type="text" v-model="subInfo.address" placeholder="请输入您的地址">
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约业务<span class="input-required">*</span>
                  </div>
                  <!-- <div class="iui-list-item-input-wrap">
                    <input class="iui-list-item-input" type="text" v-model="subInfo.business" placeholder="请输入预约业务">
                  </div> -->
                  <div class="iui-list-item-input-wrap">
                    <input class="iui-list-item-input" type="text" placeholder="请输入预约业务" v-model="subInfo.business"
                          readonly
                          @click="showBusiness">
                  </div>                  
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约办理时间<span class="input-required">*</span>
                  </div>
                  <div class="iui-list-item-input-wrap">
                    <input class="iui-list-item-input" type="text" v-model="subInfo.reservationTime" placeholder="请选择预约办理时间"
                           readonly @click="showDatePicker">
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约办理网点<span class="input-required">*</span>
                  </div>
                  <div class="iui-list-item-input-wrap">
                    <input class="iui-list-item-input" type="text" v-model="subInfo.reservationBranch" placeholder="请选择办理网点" readonly
                           @click="showAddressPicker">
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约留言
                  </div>
                  <div class="iui-list-item-input-wrap">
                    <textarea class="iui-list-item-textarea" v-model="subInfo.remark" placeholder="您需要的其他金融服务请留言!"></textarea>
                    <div class="textarea-tips">限50字</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="iui-flex-col iui-fn-bd-t">
        <ul class="iui-tiled iui-tiled-space iui-fn-p btn-wrap ">
          <button class="iui-btn iui-btn-block iui-btn-highlight" @click="submit">{{buttonValue}}</button>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
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
    data: function () {
      return {
        isDisable:false,
        buttonValue:'提交',
        subInfo: {
          id:'',
          openId:'',
          realName: '',
          realPhone: '',
          cardId:'',
          address:'',
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
      pageBack(){
        this.$router.back()
      },
      showDatePicker(){
        let d = new Date(Date.now())
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        let date = d.getDate()
        let hours = d.getHours()

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
            {text: 'POS', value: 'POSvalue'}];
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
           this.buttonValue='提交'
        },10000)

        //if (this.subInfo.realName && this.subInfo.realName !='' && this.subInfo.realName.trim != '') {
        //测试服务号
        let url = "/renren-fast/generator/reservation/save"
        //延阳服务号
        //let url = "https://zzttt.xyz/renren-fast/generator/reservation/save"
        this.$http.post(
          url, 
          {
            'id':this.subInfo.id,
            'wxuserId':this.subInfo.openId,
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
            //console.log(res);
            //if (res && res.code === 200) {
            if (res && res.code === 0) {    
              this.$router.push({name: 'SubscribeDetail', query: {id: this.subInfo.id}})
            }else{
              this.$createDialog({
                type: 'alert',
                //title: '我是标题',
                content: '服务器繁忙，请稍后再试!',
                icon: 'cubeic-alert'
              }).show()  
            }              
        });        
        // }else{
        //   alert('请输入预约信息！')
        // }
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

  .input-required
    color red

  .textarea-tips
    text-align right
    font-size 12px
    color #999

  .iui-list-item-textarea
    height 100px

  .iui-list-item-input::-webkit-input-placeholder
    text-align right
</style>
