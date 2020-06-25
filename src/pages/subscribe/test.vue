<template>
  <div id="demo">
    <div class="box">
      <vue-big-wheel
        ref="luckyWheel"
        :prizeList = 'listData'
        :colors = 'colors'
        fontColor = 'red'
        goClassName = 'btn'
        :strMaxLength = '10'
        :strLineLength = '6'
        strKey='name'
        @go-click = "go"
        @on-over = "onOver"
      >
      </vue-big-wheel>
    </div>
  </div>
</template>

<script>
import vueBigWheel from 'vue-big-wheel'
export default {
  data() {
    return {
      listData: [
        {name: "iphone 6s", val: 1},
        {name: "马来西亚一周游", val: 2},
        {name: "谢谢参与", val: 0},
        {name: "满10减5购物券", val: 3},
        {name: "谢谢参与", val: 0},
        {name: "全球限量定制版GTX2080Ti显卡", val: 8},
        {name: "10元话费充值券", val: 4},
        {name: "谢谢参与", val: 0},
        {name: "100元红包", val: 5},
        {name: "谢谢参与", val: 0},
      ],
      colors: ["#F47F45", "#FFA468"],
      targetIndex: 0,
      openId: '',
      prizeName: ''
    };
  },
  mounted() {},
  methods: {
    onOver() {
      this.openId = this.$route.query.openId
      this.prizeName = this.listData[this.targetIndex].name
      //alert(this.listData[this.targetIndex].name)
      this.saveprize()
    },
    go(event) {
      console.log("TCL: go -> event", event)
      // 模拟请求 200ms
      setTimeout(() => {
        // 随机
        this.targetIndex = Math.floor(Math.random() * this.listData.length)
				console.log("TCL: go -> this.targetIndex", this.targetIndex)
        this.$refs.luckyWheel.rotateFunc(this.targetIndex)
      }, 200);
    },
    saveprize(){
      let url = "/renren-fast/generator/userprize/save"
      this.$http.post(
          url,
          {
            'openId': this.openId,
            //'prizeId': this.dataForm.prizeId,
            'prizeName': this.prizeName,
          }
      ).then((res)=> {
        //console.log(res);
        //if (res && res.code === 200) { //直连全接口url方式返回200
        if (res && res.code === 0) {    //代理接口ip:端口号模式返回0
          
        } else {
            this.$createDialog({
              type: 'alert',
              //title: '我是标题',
              content: '服务器繁忙，请稍后再试!',
              icon: 'cubeic-alert'
            }).show()  
        }
      });
    }
  },
  components: {
    vueBigWheel
  }
};
</script>
<style  lang='scss'>
#demo {
  width: 100vw;
  min-height: 100vh;
  background-image: url('../../assets/img/wheel_bg.jpg');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%;
  overflow: hidden;
  .box {
    box-sizing: border-box;
    width: 360px;
    height: 360px;
    // margin: 5.08rem auto 0;
    // padding: .22rem;
    margin: 5.08rem auto 0;
    padding: auto;
    background-image: url('../../assets/img/disk_bg.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    overflow: hidden;
    .btn { // 使用自定义类 不能用scope
      width: 3rem;
    }
  }
}
</style>