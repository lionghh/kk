<template>
  <div class="ipu-flex-content pages-audit-result">
    <div class="ipu-flex-row ipu-flex-vertical">
      <div class="ipu-flex-col">
        <header class="ipu-toolbar">
          <h1 class="ipu-toolbar-title">鉴权失败</h1>
        </header>
      </div>

      <div class="ipu-flex-col ipu-flex-col-auto">
        <div class="ipu-flex-content">
          <div class="result-block">
            <div class="result-flag result-flag-fail"></div>
            <div class="result-message">请重新登录</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {},
    data: function () {
      return {}
    },
    computed: {},
    methods: {
      pageBack(){
        this.$router.back()
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .link-back-index-wrap
    padding 15px

  .link-back-index
    display block
    width 100%
    border-radius 4px
    border 1Px solid rgba(0, 0, 0, .09) /*no*/
    font-size 16px
    font-weight 600
    color rgba(0, 0, 0, 1)
    line-height 50px
    text-align center

  .result-block
    position absolute
    top: 35%
    left 20px
    right 20px

  .result-flag
    width 50px
    height 50px
    margin 0 auto
    border-radius 25px
    background-size 100% 100%

  .result-message
    margin-top 17px
    font-size 18px
    font-weight 500
    color rgba(0, 0, 0, .85)
    line-height 1
    text-align center

</style>