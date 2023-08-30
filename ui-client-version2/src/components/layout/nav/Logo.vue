<template>
  <div class="logo">
    <img lazy :src="require('/src/assets/imgs/logo/logo_icon2.png')" width="70" height="70" @click="goHome">
  </div>
</template>

<script>
  export default {
    name: "Logo",
    methods:{
      goHome(){
        this.$router.push("/home")
      },
    }
  }
</script>

<style scoped>
.logo{
  height: 10%;
  width: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
  img {

  }
  span{
    color: white;
  }
</style>
