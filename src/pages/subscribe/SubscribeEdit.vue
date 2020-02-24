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
                    预约业务<span class="input-required">*</span>
                  </div>
                  <div class="iui-list-item-input-wrap">
                    <input class="iui-list-item-input" type="text" v-model="subInfo.business" placeholder="请输入预约业务">
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
          <button class="iui-btn iui-btn-block iui-btn-highlight" @click="submit">提交</button>
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
        //let url = "http://watuji111.natapp4.cc/renren-fast/generator/reservation/info/" + id;
        //延阳服务号
        let url = "https://zzttt.xyz/renren-fast/generator/reservation/info/" + id;
        this.$http({
          url: url,
          method: 'get',
          params: {}
        }).then((res)=> {   
          console.log(res)       
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
        if (!this.datePicker) {
          let self = this
          this.datePicker = this.$createDatePicker({
            title: '选择预约时间',
            value: new Date(),
            columnCount: 6,
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
        if (this.subInfo.realName && this.subInfo.realName !='' && this.subInfo.realName.trim != '') {
          //测试服务号
          //let url = "http://watuji111.natapp4.cc/renren-fast/generator/reservation/save"
          //延阳服务号
          let url = "https://zzttt.xyz/renren-fast/generator/reservation/save"
          this.$http.post(
            url, 
            {
              'id':this.subInfo.id,
              'wxuserId':this.subInfo.openId,
              'realName': this.subInfo.realName,
              'realPhone': this.subInfo.realPhone,
              'business': this.subInfo.business,
              'reservationTime': this.subInfo.reservationTime.toString(),
              'reservationBranch': this.subInfo.reservationBranch.toString(),
              'remark': this.subInfo.remark
            }
            ).then((res)=> {
              //console.log(res);
              if (res && res.code === 0) {
                this.$router.push({name: 'SubscribeDetail', query: {id: this.subInfo.id}})
              }else{
                alert('服务器繁忙，请稍后再试!')
              }              
          });        
        }else{
          alert('请输入预约信息！')
        }
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
