<template>
  <div class="logo">
    <el-image style="width: 70px" :lazy="true" :src="require('/src/assets/imgs/logo/HugAiLogo1.png')"  @click="goHome"/>
  </div>
</template>

<script>
  export default {
    name: "LogoIndex",
    methods:{
      goHome(){
        this.$router.push("/home")
      },
    }
  }
</script>

<style scoped>
.logo{
  height: 70px;
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
