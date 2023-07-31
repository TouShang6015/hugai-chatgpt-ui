<template>
  <div class="main-image">
    <div class="image-pic" :style="{'max-width': width,'max-height': height}">
      <el-image lazy :src="staticWebsite + imgUrl" fit="fill" @click="handleImgClick(staticWebsite + imgUrl)"></el-image>
    </div>
    <transition name="web-fade">
      <Preview :img-url="staticWebsite + imgUrl" @imagePreviewClose="cancel" v-if="show"></Preview>
    </transition>
  </div>
</template>

<script>
  import Preview from "@/components/ImageUpload/Preview";
  export default {
    name: "ImagePic",
    components: { Preview },
    props: {
      imgUrl: { type: String, default: "" },
      width: { type: String, default: "200px"},
      height: { type: String, default: "200px" },
    },
    data(){
      return{
        staticWebsite: this.$store.getters.configMain.staticWebsite,
        show: false,
        showImgUrl: ''
      }
    },
    methods:{
      cancel(){
        this.show = false;
      },
      handleImgClick(url){
        this.showImgUrl = '';
        this.showImgUrl = url;
        this.show = true;
      }
    }
  }
</script>

<style scoped>
  .main-image{
    display: flex;
  }
.image-pic{
  padding: 8px;
  width: auto;
  height: auto;
  max-height: 500px;
  max-width: 500px;
}

  ::v-deep .el-image{
    padding: 2px;
    border: 1px #f3f3f3 solid;
    border-radius: 5px;
    box-shadow: 2px 2px 10px 2px rgba(203, 179, 179, 0.6) inset;
  }
</style>
