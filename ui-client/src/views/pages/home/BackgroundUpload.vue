<template>
  <div>
    <ImageUpload
            @input="input"
            :value="imgUrl"
            :ifWane="false"
    ></ImageUpload>
  </div>
</template>

<script>
  import ImageUpload from '/src/components/ImageUpload/index';

  export default {
    name: "BackgroundUpload",
    components: { ImageUpload },
    data(){
      return{
        imgUrl: this.$store.getters.userDeskImgUrl
      }
    },
    methods: {
      input(val){
        this.$api.get('/module/user/userinfo/editUserBackground',{ imgUrl: val }).then(res => {
          if (res.status){
            if (val != null && val != ''){
              this.$store.commit('SET_DESK_IMG_URL',val);
            }
          }
        })
        console.log(val)
      }
    }
  }
</script>

<style scoped>
  ::v-deep .el-upload-list--picture-card .el-upload-list__item {
    width: 280px;
  }
  ::v-deep .el-upload--picture-card {
    width: 280px;
  }
</style>
