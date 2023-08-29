<template>
  <div id="app" :class="theme">
    <transition name="web-fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
        theme: this.$store.state.settings.theme
      }
    },
  }
</script>

<style>
  @import url(./assets/font/iconfont.css);

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    position: fixed;
  }

</style>
