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
                    光头强
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约人电话
                  </div>
                  <div class="iui-list-item-input-wrap">
                    13112341234
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
                    2020-12-12 12:12
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
                    开户
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约办理时间
                  </div>
                  <div class="iui-list-item-input-wrap">
                    2020-12-12 12:12
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约办理网点
                  </div>
                  <div class="iui-list-item-input-wrap">
                    总部
                  </div>
                </div>
              </li>
              <li class="iui-list-item">
                <div class="iui-list-item-inner">
                  <div class="iui-list-item-label">
                    预约留言
                  </div>
                  <div class="iui-list-item-input-wrap">
                    用户输入的文本内容用户输入的文本内容用户输入的文本内容用户输入的文本内容用户输入的文本内容
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
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

      <div class="iui-flex-col iui-fn-bd-t">
        <ul class="iui-tiled iui-tiled-space iui-fn-p btn-wrap ">
          <li class="">
            <button class="iui-btn iui-btn-block iui-btn-warning" @click="toDelete">删除</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {},
    data: function () {
      return {
        subInfo: {
          name: '',
          phone: '',
          business: '',
          date: '',
          address: "",
          note: ''
        }
      }
    },
    computed: {},
    methods: {
      pageBack(){
        this.$router.back()
      },
      toEdit(){
        this.$router.push({name: 'SubscribeEdit', query: {id: this.subInfo.id}})
      },
      toDelete(){
        this.$createDialog({
          type: 'confirm',
          title: '我是标题',
          content: '我是内容',
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

          },
          onCancel: function () {

          }
        }).show()
      }
    },
    created: function () {
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
