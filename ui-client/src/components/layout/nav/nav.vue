<template>
  <div class="nav">
    <Logo></Logo>
    <Menu></Menu>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Logo from './Logo'
  import Menu from "@/components/layout/nav/Menu";
  import Bottom from "@/components/layout/nav/Bottom";

  export default {
    name: 'navIndex',
    components: {Bottom, Menu, Logo },
    data() {
      return{

      }
    },
  };
</script>

<style lang="scss" scoped>

  .nav {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
  }
  .nav > *:first-child {
    margin-left: auto;
    margin-right: auto;
  }

</style>
