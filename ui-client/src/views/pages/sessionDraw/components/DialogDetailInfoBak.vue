<template>
  <div class="dialogDetailInfo">
    <div class="dialog-main">
      <DialogTopClose :if-global="false" @cancel="handleClose"></DialogTopClose>
      <div class="main-content">

        <div class="btn-select">
          <button type="button"
                  v-for="(item,index) in recordDrawList"
                  :key="index"
                  class="btn transparent"
                  :class="{active: item.id === recordItemData.id}"
                  style="width: 80px;max-width: 80px"
                  @click="handleImgBtnClick(item)">
            图 {{index + 1}}
          </button>

        </div>

        <div class="show-content" v-if="recordDrawList.length > 0">
          <div class="show-img">
            <el-image style="width: 95%" :src="staticUrl + recordItemData.drawImgUrl" :preview-src-list="[staticUrl + recordItemData.drawImgUrl]" :lazy="true"></el-image>
          </div>
          <div class="description">
            <div class="item">
              <span class="label">正向 Prompt</span>
              <span class="txt">{{recordItemData.prompt}}</span>
            </div>
          </div>
        </div>


        <div class="show-content" v-if="detailInfo">
          <div class="description">
            <div class="item">
              <span class="label">模型名</span>
              <span class="txt">{{detailInfo.sd_model_name}}</span>
            </div>
            <div class="item">
              <span class="label">VAE模型</span>
              <span class="txt">{{detailInfo.sd_vae_name}}</span>
            </div>
            <div class="item">
              <span class="label">采样方法</span>
              <span class="txt">{{detailInfo.sampler_name}}</span>
            </div>
            <div class="item">
              <span class="label">随机种子</span>
              <span class="txt">{{detailInfo.seed}}</span>
            </div>
            <div class="item">
              <span class="label">重绘幅度</span>
              <span class="txt">{{detailInfo.cfg_scale}}</span>
            </div>
            <div class="item">
              <span class="label">迭代步数</span>
              <span class="txt">{{detailInfo.steps}}</span>
            </div>
            <el-row>
              <div class="item">
                <span class="label">反向 Prompt</span>
                <span class="txt">{{detailInfo.negative_prompt}}</span>
              </div>
            </el-row>
          </div>
        </div>


      </div>

      <ImgPreview :img-url="previewImgUrl" v-if="previewState" @imagePreviewClose="cancelImgPreview"></ImgPreview>

    </div>
  </div>
</template>

<script>
  import ImgPreview from "@/components/ImageUpload/Preview";
  export default {
    name: "DialogDetailInfo",
    components: {ImgPreview},
    props:{
      sessionInfoDrawId: { type: String, required: true },
    },
    data(){
      return{
        detailData: {},
        detailInfo: null,
        recordDrawList: [],
        recordItemData: {},
        previewImgUrl: {},
        previewState: false,
        staticUrl: this.$store.getters.resourceMain.staticWebsite
      }
    },
    mounted() {
      this.$api.getRestful('/module/session/sessioninfodraw/getSessionDetail',this.sessionInfoDrawId).then(res => {
        this.detailData = res.data;
        if(res.data.sdResponseInfo != null){
          this.detailInfo = JSON.parse(res.data.sdResponseInfo)
        }
        this.recordDrawList = res.data.recordDrawList;
        this.handleImgBtnClick(this.recordDrawList[0])
        console.log(this.detailInfo);
      })
    },
    methods:{
      handleClose(){
        this.$emit('close')
      },
      handleImgBtnClick(item){
        this.recordItemData = item
      },
      handleImgClick(imgUrl){
        this.previewImgUrl = imgUrl
        this.previewState = true
      },
      cancelImgPreview(){
        this.previewState = false
        this.previewImgUrl = ''
      }
    }
  }
</script>

<style scoped lang="scss">
.dialogDetailInfo{
  position: fixed;
  backdrop-filter: blur(1px);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1501;
  display: flex;
  align-items: center;
  justify-content: center;
}
  .dialog-main{
    background: var(--dialog-background);
    box-shadow: var(--dialog-box-shadow);
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    overflow: auto;
  }

  .main-content{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

.btn-select{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button:nth-child(1){
    margin-left: 5%;
  }
  ::v-deep .btn{
    padding: 4px 8px;
    margin: 10px 5px;
  }
}

  .show-content{
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background: var(--help-background);

    .show-img{
      min-width: 30%;
      width: 30%;
      max-width: 380px;
      height: 100%;
      border: 1px var(--item-border-default-color) solid;
      border-radius: 12px;
      margin: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
    }
  }

  .description{
    flex: 1;
    line-height: 26px;
  }

  .description span{
    font-family: "幼圆", sans-serif;
  }

.description .item{
  margin: 10px 15px;
  display: inline-block;
  min-width: 25%;

  .label{
    padding: 4px 25px;
    background: var(--background-textarea);
    color: var(--item-border-hover-color);
    border-radius: 5px;
  }
  .txt{
    margin-left: 15px;

  }
}

  .btn-select .btn.active{
    border: 1px var(--item-border-hover-color) solid;
    box-shadow: var(--item-border-hover-color) 0px 0px 3px 0px;
  }
</style>
