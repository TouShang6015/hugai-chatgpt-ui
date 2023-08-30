<template>
  <div class="auth-main">
    <transition name="flip">
      <Login v-if="stateLogin"></Login>
    </transition>
    <transition name="flip">
      <Register v-if="stateRegister"></Register>
    </transition>
  </div>
</template>

<script>
  import Login from "./Login";
  import Register from "./Register";

  export default {
    name: "Auth",
    components: {Login, Register},
    data() {
      return {
        stateLogin: false,
        stateRegister: false,
      }
    },
    watch: {
      '$store.getters.loginDialog': {
        handler: function (val) {
          this.stateLogin = val
        },
      },
      '$store.getters.registerDialog': {
        handler: function (val) {
          this.stateRegister = val
        },
      }
    },
    created() {
    },
    mounted() {

    },
    methods: {}
  }
</script>

<style scoped>
  .auth-main {
    backdrop-filter: blur(1px);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10000;
  }

  .flip-enter-active,
  .flip-leave-active {
    transition: transform 0.3s;
  }

  .flip-enter,
  .flip-leave-to {
    transform: rotateY(90deg);
  }
</style>
