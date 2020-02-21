<template>
  <div class="ipu-flex-content pages-notfind">
    <div class="ipu-flex-row ipu-flex-vertical">
      <div class="ipu-flex-col">
        <header class="ipu-toolbar">
          <a class="ipu-fn-left common-page-back" href="javascript:;" @click="pageBack">
          </a>
          <h1 class="ipu-toolbar-title">404</h1>
        </header>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      pageBack(){
        this.$router.back()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
