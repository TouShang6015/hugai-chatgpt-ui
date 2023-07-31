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
  }
</script>

<style>
  @import url(./assets/font/iconfont.css);

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: rgb(39, 42, 55);
    width: 100vw;
    height: 100vh;
    background-size: cover;
    position: fixed;
  }

</style>
