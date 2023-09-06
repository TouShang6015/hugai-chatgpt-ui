<template>
  <div id="app">
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

      }
    },
    created() {
      this.$store.commit('GET_THEME')
    }
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
