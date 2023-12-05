<template>
  <div class="main">
    <gallery-header @change="handleHeaderChange"></gallery-header>
    <gallery-search></gallery-search>
    <div class="gallery-content">
      <gallery-content :api-url="'/module/draw/gallery/commonGallery'" v-if="headerValue === 1" :key="headerValue"></gallery-content>
      <gallery-content :api-url="'/module/draw/gallery/ownerGallery'" v-if="headerValue === 2" :key="headerValue"></gallery-content>
    </div>
  </div>
</template>

<script>
  import GalleryHeader from "@/views/pages/gallery/components/Header";
  import GallerySearch from "@/views/pages/gallery/components/Search";
  import GalleryContent from "@/views/pages/gallery/components/Gallery";
  export default {
    name: "GalleryIndex",
    components: { GallerySearch, GalleryContent, GalleryHeader},
    data(){
      return{
        headerValue: 1,
      }
    },
    created() {

    },
    methods:{
      handleHeaderChange(val){
        this.headerValue = val;
      }
    }
  }
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  overflow: hidden;
}
  .gallery-content{
    flex: 1;
    overflow: auto;
    position: relative;
  }
</style>
