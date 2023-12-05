<template>
  <div class="logo">
<<<<<<< HEAD
    <el-image style="width: 60px" :lazy="true" :src="require('/src/assets/imgs/logo/HugAiLogo1.png')"  @click="goHome"/>
=======
    <el-image style="width: 70px" :lazy="true" :src="require('/src/assets/imgs/logo/HugAiLogo1.png')"  @click="goHome"/>
>>>>>>> origin/devloper
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
<<<<<<< HEAD
  width: 80%;
=======
  width: auto;
>>>>>>> origin/devloper
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px var(--col-border-color) solid;
  margin-bottom: 10px;
}
  img {

  }
  span{
    color: white;
  }
</style>
