<template>
  <div class="image-preview-main w-screen h-screen">
    <div class="top">
      <span class="iconfont icon-e_guanbi" @click="cancel"></span>
    </div>
    <img class="img" :src="imgUrl" style="display: block; max-width: 100%; margin: 0 auto"/>
  </div>
</template>

<script>
  export default {
    name: "ImgPreview",
    props:{
      imgUrl: { type: String, default: "" }
    },
    methods:{
      cancel(){
        this.$emit('imagePreviewClose')
      }
    }
  }
</script>

<style scoped>

  .image-preview-main{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    z-index: 9999;
  }

  .image-preview-main .top{
    display: block;
    height: 32px;
    width: 100%;
    float: right;
    line-height: 32px;
    text-align: right;
  }

  .image-preview-main .top span:hover{
    cursor: pointer;
  }

  .image-preview-main .img{
    max-width: 90%;
    max-height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
