<template>
  <div class="gallery-main"
       v-resize="listenerGalleryDiv"
  >
    <div class="empty" v-if="total === 0">
      <span class="pointer" @click="goDraw">暂无数据，去创作你的素材吧~</span>
    </div>

    <waterfall
      :col="col"
      :data="galleryData"
      @loadmore="loadMore"
      :width="itemWidth"
      :gutterWidth="gutterWidth"
      @finish="galleryFinishEvent"
    >
      <template>
        <div class="img-item rounded-md"
             v-for="(item,index) in galleryData"
             :key="index"
             @click="handleImgClick(item)"
             @mouseenter="handleMouseEnter(item)"
             @mouseleave="handleMouseLeave(item)">
          <div v-if="item.loading" class="loader">
            <div class="effect"></div>
          </div>
          <img :src="staticUrl + item.imgUrl"
               :lazy-src="staticUrl + item.imgUrl"
               v-show="!item.loading && item.show"
               @error="imgError(item)"
               @load="imgOnload(item)"
          />
          <gallery-item-info
            :data="item"
            :show-icon-common="type === 2"
          ></gallery-item-info>
        </div>
      </template>
    </waterfall>
  </div>
</template>

<script>
  import GalleryItemInfo from "@/views/pages/gallery/components/GalleryItemInfo";
  export default {
    name: "GalleryIndex",
    components: {GalleryItemInfo},
    props: {
      apiUrl: { type: String, required: true },
      // type 1 公开画廊 2 我的画廊
      type: { type: Number, required: true }
    },
    data(){
      return{
        col: undefined,
        queryParam: {
          page: 1,
          size: 25
        },
        galleryData: [],
        total: 0,
        selectLoading: false,
        selectNextLoading: false,
        staticUrl: this.$store.getters.resourceMain.staticWebsite,
        asideStatus: this.$store.state.settings.hiddenStatusLeft,
      }
    },
    watch: {
      '$store.state.settings.hiddenStatusLeft': {
        handler: function (val) {
          this.asideStatus = val
        },
      },
    },
    computed: {
      itemWidth() {
        let number;
        // true 隐藏
        if (this.asideStatus) {
          number = 146 * 0.5 * (document.documentElement.clientWidth / 420);
        }else{
          number = 130 * 0.5 * (document.documentElement.clientWidth / 420);
        }
        return number;
      },
      gutterWidth() {
        return 4 * 0.5 * (document.documentElement.clientWidth / 425);
      },
    },
    created() {
      this.queryDataList()
    },
    methods: {
      queryDataList() {
        if (this.selectLoading){
          return
        }
        this.selectLoading = true
        this.$api.post(this.apiUrl, this.queryParam).then(res => {
          if (res.status){
            const data = res.data;
            data.forEach(item => {
              item.show = false
              item.loading = true
              item.hover = false
              item.error = false
              this.galleryData.push(item)
            })
            this.total = res.total
            this.$nextTick(() => {
              setTimeout(() => {
                this.selectLoading = false
                this.selectNextLoading = false
              },1000)
            })
          }else{
            this.$store.commit('SET_AUTH_DIALOG',true)
          }
        })
      },
      nextQueryList(){
        if (this.selectNextLoading){
          return
        }
        this.selectNextLoading = true

        const page = this.queryParam.page;
        const size = this.queryParam.size;
        if ((page * size) >= this.total) {
          return
        }
        this.queryParam.page = page + 1
        this.queryDataList()
      },
      imgOnload(row){
        row.show = true
        row.loading = false
      },
      imgError(row){
        row.show = false
        row.loading = false
        row.error = true
        const index = this.galleryData.findIndex(item => item.id === row.id);
        if (index !== -1) {
          this.galleryData.splice(index, 1);
        }
      },
      handleImgClick(item){
        if (!item.show) return
      },
      handleMouseEnter(item){
        item.hover = true
      },
      handleMouseLeave(item){
        item.hover = false
      },
      goDraw(){
        this.$router.push("/sessionDraw")
      },
      loadMore(index){
        this.data = this.data.concat(this.data)
      },
      galleryFinishEvent(){
      },
      listenerGalleryDiv(data){
        let { width } = data;
        const widthNumber = width.split('.')[0];
        this.col = widthNumber / this.itemWidth
      }
    },
    directives:{
      resize: { // 指令的名称
        bind(el, binding) {
          let width = '', height = '';
          function isReize() {
            const style = document.defaultView.getComputedStyle(el);
            if (width !== style.width || height !== style.height) {
              binding.value({width:style.width,height:style.height});
            }
            width = style.width;
            height = style.height;
          }
          el.__vueSetInterval__ = setInterval(isReize, 200);
        },
        unbind(el) {
          clearInterval(el.__vueSetInterval__);
        }
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
    flex: 1;
    padding: 5px 3%;
    overflow: auto;
    transition: all 0.2s ease-out;
    justify-content: center;
    align-items: center;

    .empty {
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

      span:hover {
        color: var(--font-color-no-normal);
        transition: all 0.2s ease-out;
      }
    }

  }

  .img-item {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    margin: 8px 0;

    img {
      width: 100%;
      height: auto;
      display: block;

      opacity: 0;
      animation-name: fadeIn;
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
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
    }
  }
  @media (max-width: 960px) {
    .gallery-main {
    }
  }
  @media (max-width: 640px) {
    .gallery-main {
    }
  }
  @media (max-width: 384px) {
    .gallery-main {
    }
  }

</style>
