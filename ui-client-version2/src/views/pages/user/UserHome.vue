<template>
  <div>
    <div class="userHomeMain">
      <div class="components-userInfo">
        <UserInfo></UserInfo>
        <ApiKeyManager v-if="!ifTourist"></ApiKeyManager>
      </div>
      <div class="components-apiKeyInfo" v-if="!ifTourist">
        <ApiKeyInfo></ApiKeyInfo>
      </div>
      <div class="components-apiKeyManager" v-if="!ifTourist">

      </div>
    </div>
  </div>
</template>

<script>
  import UserInfo from "@/views/pages/user/userHome/UserInfo";
  import ApiKeyInfo from "@/views/pages/user/apiKeyInfo/ApiKeyInfo";
  import ApiKeyManager from "@/views/pages/user/apikeyManager/index";

  export default {
    name: "UserHome",
    components: {ApiKeyInfo, UserInfo,ApiKeyManager},
    data(){
      return{
        ifTourist: this.$store.getters.ifTourist === '1'
      }
    }
  }
</script>

<style scoped>
.userHomeMain{
  width: 100%;
  height: 94vh;
  position: relative;
  overflow: auto;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
}
.components-userInfo{
  width: 50%;
  height: auto;
}
.components-apiKeyInfo{
  width: 50%;
  height: auto;
}
.components-apiKeyManager{
  width: 50%;
  height: auto;
}
</style>
