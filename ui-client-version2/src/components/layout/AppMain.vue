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
      // 访问次数接口
      this.$api.get('/common/interface/info');
    }
  }
</script>

<style>

</style>
