<template>
  <div class="dialog-main rounded-md" @click.stop>
    <dialog-preview
            :img-url="imgUrl"
            :img-urls="imgUrls"
    ></dialog-preview>
    <dialog-description
            :prompt="finalPrompt"
            :platform="platform"
            :draw-api-name="drawApiName"
            :sd-data="apiSdParam"
    ></dialog-description>
  </div>
</template>

<script>
  import DialogDescription from "@/views/pages/sessionDraw/components/DialogDescription";
  import DialogPreview from "@/views/pages/sessionDraw/components/DialogPreview";
  export default {
    name: "DialogDetailInfo",
    components: {DialogPreview, DialogDescription},
    props:{
      sessionInfoDrawId: { type: String, required: true },
      dialog: { type: Boolean, default: true },
      prompt: { type: String, default: '' },
      drawApiName: { type: String, default: '' },
      imgUrl: { type: String, required: true },
      platform: { type: String, required: true },
    },
    data(){
      return{
        recordDrawList: [],
        imgUrls: [],
        apiRequestParam:{},
        apiSdParam:{},
        finalPrompt:this.prompt,
        staticUrl: this.$store.getters.resourceMain.staticWebsite
      }
    },
    mounted() {
      this.$api.getRestful('/module/session/sessioninfodraw/getSessionDetail',this.sessionInfoDrawId).then(res => {
        this.handleResponseData(res.data)
      })
    },
    methods:{
      handleClose(){
        this.$emit('close')
      },
      handleResponseData(resData){
        const data = resData;
        if(data == null){
          return
        }
        if(data.sdResponseInfo != null){
          this.apiSdParam = JSON.parse(data.sdResponseInfo)
        }
        this.recordDrawList = data.recordDrawList;
        this.imgUrls = data.recordDrawList.map(item => item.drawImgUrl);
        this.finalPrompt = data.prompt
      }
    }
  }
</script>

<style scoped lang="scss">

  .dialog-main{
    max-height: 90vh;
    background: var(--dialog-background);
    border: 1px var(--item-border-normal-color) solid;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    overflow: auto;
  }

</style>
