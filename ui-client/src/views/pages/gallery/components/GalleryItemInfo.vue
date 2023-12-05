<template>
  <transition name="web-dialog">
    <div class="gallery-item-info pointer rounded-md" v-show="data.hover && data.show">
      <div class="prompt">
        <span>{{data.prompt}}</span>
      </div>
      <div class="author">
        <div class="headerImg">
          <img :src="staticUrl + data.userImgUrl" alt="">
        </div>
        <span>{{data.userName}}</span>
      </div>
    </div>
  </transition>

</template>

<script>
  export default {
    name: "GalleryItemInfo",
    props:{
      data: { type: Object, required: true }
    },
    data(){
      return{
        staticUrl: this.$store.getters.resourceMain.staticWebsite
      }
    },
    created() {
    },
    methods:{

    }
  }
</script>

<style scoped lang="scss">
  .gallery-item-info{
    position: absolute;
    width: 100%;
    height: calc(100%);
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    color: var(--font-color-default);
    background: var(--gallery-item-hover-background);
  }

  .prompt{
    padding: 5%;

    span{
      font-size: 15px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

  .author{
    width: calc(100% - 10px);
    padding: 0 10px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .headerImg{
      position: relative;
      display: inline-block;
      max-width: 28px;
      max-height: 28px;

      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    span{
      font-size: 14px;
      margin-left: 2px;
      max-width: calc(100% - 46px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--font-color-no-normal);
    }
  }

</style>
