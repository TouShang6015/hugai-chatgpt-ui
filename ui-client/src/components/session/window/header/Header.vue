<template>
  <div class="session-window-header bd-bottom">
    <div style="margin-left: .8rem">
      <span class="mg-left-sm mg-right-sm text-xs bkgy-success rounded-md" v-if="ifChatPlus === '0'">一般模型</span>
      <span class="mg-left-sm mg-right-sm text-xs bkgy-danger rounded-md" v-if="ifChatPlus === '1'">增强模型</span>
      <el-select v-model="chatModeId" clearable>
        <el-option v-for="(item,index) in labelOptionsChatModel" :label="item.label" :value="item.value" :key="index"/>
      </el-select>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SessionWindowHeader",
    data(){
      return{
        labelOptionsChatModel: [],
        chatModeId: undefined,
        ifChatPlus: false,
      }
    },
    watch:{
      chatModeId(val){
        this.$emit('changeModel',val)
        if (this.labelOptionsChatModel != null && this.labelOptionsChatModel.length > 0){
          const element = this.labelOptionsChatModel.filter(item => item.value === val)[0];
          this.ifChatPlus = element.ifChatPlus
        }
      }
    },
    created() {
      this.getChatModelLabel()
    },
    methods:{
      getChatModelLabel(){
        this.$api.get('/module/config/chatmodel/getLabelOption').then(res => {
          if (res.status){
            this.labelOptionsChatModel = res.data
            this.chatModeId = this.labelOptionsChatModel[0].value
          }
        })
      }
    }
  }
</script>

<style scoped>
.session-window-header{
  background: var(--background-main);
  position: absolute;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: 1510;
  color: var(--font-color-default);
}


::v-deep .el-select{
  width: 300px
}
::v-deep .el-input__icon{
  line-height: 0;
}
</style>
