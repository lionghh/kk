<template>
  <div class="iui-flex-content pages-attendance-list">
    <div class="iui-flex-row iui-flex-vertical">
      <div class="iui-flex-col">
        <header class="iui-toolbar">
          <a class="iui-fn-left common-page-back" href="javascript:;">
          </a>
          <h1 class="iui-toolbar-title">往期记录</h1>
        </header>
      </div>

      <div class="iui-flex-col iui-flex-col-auto">
        <div class="iui-flex-content">
          <div class="iui-nav-content">
            <ul>
              <li class="iui-show iui-current">
                <div class="page-content">
                  <div class="iui-list iui-list-block">
                    <ul>
                      <li class="">
                        <a class="iui-list-item iui-list-item-link" href="list-1.html">
                          <div class="iui-list-item-inner">
                            <div class="iui-list-item-title iui-flex-vertical">
                                <div >
                                  <img src="" alt="" >
                                  <span class="sub-user-name">码工</span>
                                  <span class="sub-user-pnone">13112341234</span>
                                </div>
                              <div >
                                aaa
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li class="iui-list-item">
                        <div class="iui-list-item-inner">
                          <div class="iui-list-item-title">列表项</div>
                        </div>
                      </li>
                      <li class="iui-list-item">
                        <div class="iui-list-item-inner">
                          <div class="iui-list-item-title">列表项</div>
                        </div>
                      </li>
                      <li class="iui-list-item">
                        <div class="iui-list-item-inner">
                          <div class="iui-list-item-title">列表项</div>
                        </div>
                      </li>
                      <li class="iui-list-item">
                        <div class="iui-list-item-inner">
                          <div class="iui-list-item-title">
                            列表项
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="">
              </li>
              <li class="">
              </li>
              <li>
              </li>
              <li>

              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="iui-flex-col">
        <nav class="iui-navbar">
          <a class="iui-navbar-item " href="javascript:;">
            <i class="iui-icon mdi mdi-desktop-tower-monitor mdi-home"></i>
            <div class="iui-navbar-item-label">全部</div>
          </a>
          <a class="iui-navbar-item  iui-current" href="javascript:;">
            <i class="iui-icon mdi mdi-code-array"></i>
            <div class="iui-navbar-item-label">待受理</div>
          </a>
          <a class="iui-navbar-item" href="javascript:;">
            <i class="iui-icon mdi mdi-language-css3"></i>
            <div class="iui-navbar-item-label">受理中</div>
          </a>
          <a class="iui-navbar-item" href="javascript:;">
            <i class="iui-icon mdi mdi-more"></i>
            <div class="iui-navbar-item-label">已取消</div>
          </a>
          <a class="iui-navbar-item" href="javascript:;">
            <i class="iui-icon mdi mdi-information"></i>
            <div class="iui-navbar-item-label">已完成</div>
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
        dateType: 0,    // 0是周，1是月
        beginDate: null,
        endDate: null,
        record: {}    // 一周或一月内出勤统计结果
      }
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

</style>
