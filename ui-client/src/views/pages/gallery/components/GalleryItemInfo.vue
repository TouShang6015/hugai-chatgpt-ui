<template>
  <transition name="web-dialog">
    <div class="gallery-item-info pointer rounded-md"  v-if="finalData != null" v-show="finalData.hover && finalData.show">
      <!-- 图标 -->

      <div class="flex1 pd-sm">

        <li class="icon flex flex-center"
            :class="{ iconActive: ifCommon === '1' }"
            v-if="showIconCommon"
            @click="handleSetCommon"
        >
          <span style="color: white;font-size: 1.1rem;opacity: 1;" class="iconfont icon-global"></span>
        </li>

      </div>

      <!-- prompt -->

      <div class="prompt">
        <span>{{finalData.prompt}}</span>
      </div>
      <div class="author">
        <div class="headerImg">
          <img :src="staticUrl + finalData.userImgUrl" alt="">
        </div>
        <span>{{finalData.userName}}</span>
      </div>
    </div>
  </transition>

</template>

<script>
  export default {
    name: "GalleryItemInfo",
    props:{
      data: { type: Object, required: true },
      showIconCommon: { type: Boolean, default: false }
    },
    data(){
      return{
        staticUrl: this.$store.getters.resourceMain.staticWebsite,
        finalData: null,
        handleState: false,
        ifCommon: undefined,
        galleryCommonId: undefined,
      }
    },
    created() {
      this.finalData = JSON.parse(JSON.stringify(this.data))
      this.ifCommon = this.finalData.ifCommon
      this.galleryCommonId = this.finalData.galleryCommonId
    },
    watch:{
      data: {
        deep: true,
        handler(val) {
          this.finalData = JSON.parse(JSON.stringify(val))
        }
      }
    },
    methods:{
      handleSetCommon(){
        if (this.handleState)
          return
        this.handleState = true;

        // 是公开，取消公开
        if (this.ifCommon === '1'){
          this.$api.post('/module/draw/gallery/cancelDrawCommon',{ id: this.galleryCommonId }).then(res => {
            if (res.status){
              this.$notify.success("图片取消公开，仅自己可见")
              this.ifCommon = '0'
              this.galleryCommonId = null
              this.handleState = false;
            }
          })
        }else{
          const sessionRecordDrawId = this.finalData.sessionRecordDrawId;
          this.$api.post('/module/draw/gallery/setDrawCommon',{ sessionRecordDrawId: sessionRecordDrawId }).then(res => {
            if (res.status){
              this.$notify.success("图片公开成功，所有人可见")
              this.ifCommon = '1'
              this.galleryCommonId = res.data.id
              this.handleState = false;
            }
          })
        }
      },
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
    color: white;
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
      color: #cecccc;
    }
  }

  /*  图标  */
  .icon{
    width: 2.5rem;
    height: 2.5rem;
    border-radius: .6rem;
    background-color: rgba(60, 60, 60, 0.5);

    &:hover{
      background-color: rgba(60, 60, 60, 1);
    }
  }
  .icon .iconfont{
    color: rgba(60, 60, 60, 1);
  }

  .icon.iconActive{
    background-color: rgba(60, 60, 60, 0.8);
    &:hover{
      background-color: rgba(60, 60, 60, 1);
    }
  }
  .icon.iconActive .iconfont{
    color: rgb(0, 255, 136) !important;
  }

</style>
