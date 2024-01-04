<template>
  <div class="gallery-main">
    <div class="empty" v-if="total === 0">
      <span>暂无数据，</span>
      <span class="pointer" @click="goDraw">快去创作你的专属图片吧~~</span>
    </div>
    <div class="img-item"
         v-for="(item,index) in dataList"
         :key="index"
         @click="handleImgClick(item)"
         @mouseenter="handleMouseEnter(item)"
         @mouseleave="handleMouseLeave(item)">
      <div v-if="!item.loading" class="loader">
        <div class="effect"></div>
      </div>
      <img v-show="item.show" :src="staticUrl + item.imgUrl" alt="" @load="imgOnload(item)" @error="imgError(item)"/>
      <gallery-item-info :data="item"></gallery-item-info>
    </div>
  </div>
</template>

<script>
  import GalleryItemInfo from "@/views/pages/gallery/components/GalleryItemInfo";
  export default {
    name: "GalleryIndex",
    components: {GalleryItemInfo},
    props: {
      apiUrl: { type: String, required: true }
    },
    data(){
      return{
        queryParam: {
          page: 1,
          size: 30
        },
        dataList: [],
        errorImgIds: [],
        total: 0,
        loading: true,
        staticUrl: this.$store.getters.resourceMain.staticWebsite
      }
    },
    created() {
      this.queryDataList()
    },
    methods: {
      queryDataList() {
        this.$api.post(this.apiUrl, this.queryParam).then(res => {
          if (res.status){
            const data = res.data;
            data.forEach(item => {
              item.show = false
              item.loading = false
              item.hover = false
            })
            this.total = res.total
            this.dataList = data
          }else{
            this.$store.commit('SET_AUTH_DIALOG',true)
          }
        })
      },
      imgOnload(row){
        this.$nextTick(() => {
          setTimeout(() => {
            row.show = true
            row.loading = true
          },50)
        })
      },
      imgError(row){
        this.$nextTick(() => {
          setTimeout(() => {
            row.show = false
            row.loading = true
          },50)
        })
      },
      handleImgClick(item){
        if (!item.show) return
        console.log('图片点击',item)
      },
      handleMouseEnter(item){
        item.hover = true
      },
      handleMouseLeave(item){
        item.hover = false
      },
      goDraw(){
        this.$router.push("/sessionDraw")
      }
    }
  }
</script>

<style scoped lang="scss">

  @keyframes fadeIn {
    from { opacity: 0; }
    to {opacity: 1;}
  }

  @keyframes zoomIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }

  .gallery-main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 5px 4%;
    overflow: auto;
    transition: all 0.2s ease-out;
  }

  .gallery-main .empty {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--font-color-default);
    font-size: 20px;
    transition: all 0.2s ease-out;
    left: 0;
    top: 0;

    span:nth-child(2) {
      &:hover {
        color: var(--font-color-no-normal);
        transition: all 0.2s ease-out;
      }
    }
  }

  .img-item {
    flex: 1 1 calc(16% - 6px);
    margin: 2px 0;
    position: relative;
    max-width: 100%;
  }

  .img-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;

    opacity: 0;
    animation-name: fadeIn;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  .loader {
    width: 100px;
    height: 100px;
    padding: 60px;

    .effect{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 8px solid #f3f3f3;
      border-top: 8px solid var(--item-border-active-color);
      border-bottom: 8px solid var(--item-border-hover-color);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

  }

  @media (max-width: 1280px) {
    .gallery-main {
      column-count: 5;
    }
  }
  @media (max-width: 960px) {
    .gallery-main {
      column-count: 4;
    }
  }
  @media (max-width: 640px) {
    .gallery-main {
      column-count: 3;
    }
  }
  @media (max-width: 384px) {
    .gallery-main {
      column-count: 2;
    }
  }

</style>
