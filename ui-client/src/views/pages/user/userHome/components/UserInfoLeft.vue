<template>
  <div class="userInfoLeft">
    <div class="user-header-info">
      <el-row style="margin-top: 1.75rem">
        <div class="img">
          <el-image :src="staticUrl + userInfoForm.imgUrl"  fit="fill" :lazy="true">
            <div slot="error" class="image-slot">
              <img :src="require('/src/assets/imgs/loadingError.png')">
            </div>
          </el-image>
        </div>
      </el-row>
      <el-row>
        <h2 v-if="userInfoForm.ifTourist === '0'">{{userInfoForm.nickName}}</h2>
        <h2 v-if="userInfoForm.ifTourist === '1'">游客</h2>
      </el-row>
      <el-row>
        <h3 v-if="userInfoForm.ifTourist === '0'">{{userInfoForm.email}}</h3>
        <h3 v-if="userInfoForm.ifTourist === '1'">{{userInfoForm.ipAddress}}</h3>
      </el-row>
      <el-row>
        <div style="padding: 0 35px">
          <h4>拥抱AI工具点亮创新的火花,让AI成为你的生产力助推器</h4>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfoLeft",
    data(){
      return{
        staticUrl: this.$store.getters.resourceMain.staticWebsite,
        userInfoForm: this.$store.state.user.userDetail || {},
      }
    },
    watch:{
    },
    created() {
    },
    methods:{
      imgUploadCallBack(val){
        this.userInfoForm.imgUrl = val;
      },
    }
  }
</script>

<style scoped lang="scss">
.userInfoLeft{
  width: 100%;
  height: 90%;
  position: relative;
}
  .user-header-info{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .img{
      width: 180px;
      height:180px;
      ::v-deep img{
        border-radius: 12px;
      }
    }

    h2{
      padding: 6px 0;
      color: var(--font-color-default);
      font-size: 22px;
    }
    h3{
      padding: 6px 0;
      color: var(--font-color-default);
      font-size: 16px;
    }
    h4{
      margin-top: 5px;
      color: var(--font-color-intror);
      margin-bottom: 50px;
      font-weight: 100;
      font-family: "幼圆", sans-serif;
    }
  }

::v-deep .el-image{
  display: inline-flex;
  max-width: 95%;
  max-height: 95%;
}
</style>
