<template>
  <div class="auth-main w-screen h-screen" @click="cancel">
    <transition name="flip">
      <LoginAndRegister></LoginAndRegister>
    </transition>
  </div>
</template>

<script>
  import LoginAndRegister from "@/views/auth/LoginAndRegister";

  export default {
    name: "AuthComponent",
    components: {LoginAndRegister},
    props:{
      tabsValueProps: { type: String, default: '1' }
    },
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
    methods: {
      cancel(){
        this.$store.commit('CLEAR_DIALOG')
      }
    }
  }
</script>

<style scoped>
  .auth-main {
    backdrop-filter: blur(2px);
    position: absolute;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
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
