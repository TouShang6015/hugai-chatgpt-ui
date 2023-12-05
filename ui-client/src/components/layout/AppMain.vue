<template>
  <section>
    <transition name="web-fade">
      <router-view :key="key"/>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key() {
        return this.$route.path
      }
    },
    created() {
    },
    mounted() {
    }
  }
</script>

<style>
  section{
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
