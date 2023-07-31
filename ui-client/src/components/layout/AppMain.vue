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
    }
  }
</script>

<style>

</style>
