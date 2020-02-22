<template>
  <div class="ipu-flex-content">
    <keep-alive max="20">
      <router-view v-if="$route.meta.keepAlive" :key="$route.name + $route.meta.ts"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {}
</script>
