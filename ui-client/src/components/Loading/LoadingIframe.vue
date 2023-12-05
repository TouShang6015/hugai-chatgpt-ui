<template>
  <div class="loading-iframe rounded-md" :style="{width: width,height: height}">
    <ring-loader></ring-loader>
  </div>
</template>

<script>
  import ringLoader from 'vue-spinner/src/RingLoader.vue'

  export default {
    name: "LoadingIframe",
    components: { ringLoader },
    props:{
      width: { type: String, default: '100%' },
      height: { type: String, default: '100%' },
    }
  }
</script>

<style scoped>
  /* 页面加载虚化 */
  .loading-iframe{
    backdrop-filter: blur(1px);
    background: rgba(135, 132, 132, 0.0);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
