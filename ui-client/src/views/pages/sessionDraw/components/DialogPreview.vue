<template>
  <div class="dialog-preview h100">
    <div class="top" v-if="cursorPreviewItem != undefined && !cursorPreviewItem.error">
      <span class="iconfont icon-fanhui pointer"
            :class="{ disable: cursorPreviewItem.index === 0 }"
            @click="handleItemLastOrNext('last')"></span>
      <div class="image">
        <img :src="staticUrl + cursorPreviewItem.img" @click="previewImgUrl = (staticUrl + cursorPreviewItem.img)" @error="listenerImgError(cursorPreviewItem)" alt="加载失败">
      </div>
      <span class="iconfont icon-jinru pointer"
            :class="{ disable: cursorPreviewItem.index === this.previewList.length - 1 }"
            @click="handleItemLastOrNext('next')"></span>
    </div>
    <div class="bottom">
      <transition-group name="fade-list-to-right">
        <div class="preview-icon"
             v-for="(item,index) in previewList"
             :key="index"
             v-show="!item.error"
             :class="{ active: cursorPreviewItem.index === index }"
             @click="handlePreviewItem(item)" >
          <img :src="staticUrl + item.img" alt="">
        </div>
      </transition-group>
    </div>

    <ImgPreview :img-url="previewImgUrl" v-if="previewImgUrl" @imagePreviewClose="previewImgUrl = undefined"></ImgPreview>

  </div>
</template>

<script>
  import ImgPreview from "@/components/ImageUpload/Preview";
  export default {
    name: "DialogPreview",
    components: {ImgPreview},
    props:{
      imgUrl: { type: String, required: true },
      imgUrls: { type: Array, required: true }
    },
    data(){
      return{
        staticUrl: this.$store.getters.resourceMain.staticWebsite,
        previewList: [],
        previewImgUrl: undefined,
        cursorPreviewItem: undefined
      }
    },
    watch:{
      imgUrls(val){
        const filter = val.filter(item => item !== this.imgUrl);
        let cursor = this.previewList.length;
        for (let i = 0; i < filter.length; i++) {
          this.$nextTick(() => {
            this.previewList.push({
              index: cursor++, img: filter[i],error: false
            })
          })
        }
      }
    },
    created() {
      let previewItem = { index: 0, img: this.imgUrl,error: false }
      this.previewList.push(previewItem)

      this.handlePreviewItem(this.previewList[0])
    },
    methods:{
      handlePreviewItem(item){
        this.cursorPreviewItem = item;
      },
      handleItemLastOrNext(val){
        const maxIndex = this.previewList.length;
        const index = this.cursorPreviewItem.index;
        let goIndex = 0;
        switch (val) {
          case 'last':
            goIndex = index - 1;
            break
          case 'next':
            goIndex = index + 1;
            break
        }
        if (goIndex < 0 || goIndex >= maxIndex){
          return
        }
        this.handlePreviewItem(this.previewList[goIndex])
      },
      listenerImgError(item){
        item.error = true;
      }
    }
  }
</script>

<style scoped lang="scss">
  .dialog-preview{
    padding: 15px;
  }

  .top{
    display: flex;
    justify-content: center;
    align-items: center;

    span.disable{
      /*color: var(--font-color-intror);*/
      opacity: 0.2;
    }
    span{
      height: 100%;
      display: block;
      font-size: 36px;
      margin: 0 5px;
    }
    span:hover{
      color: var(--font-color-no-normal);
    }

    .image{
      max-width: 35vw;
    }
  }

  .bottom{
    margin-top: 6px;
    margin-left: 50px;
    margin-bottom: 10px;
    span:nth-child(1){
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
    }
    .preview-icon{
      display: flex;
      width: 4rem;
      margin-left: 0.85rem;
      border: 1px rgba(255, 255, 255, 0.5) solid;
      border-radius: 0.2rem;
      filter: brightness(50%);

      &:hover{
        border: 1px var(--font-color-no-normal) solid;
        filter: brightness(80%);
      }
    }
    .preview-icon.active{
      filter: brightness(100%);
      border: 1px var(--font-color-no-normal) solid;
    }
  }

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.2rem;
  }

</style>
