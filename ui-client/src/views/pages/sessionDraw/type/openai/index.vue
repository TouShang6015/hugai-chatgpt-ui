<template>
  <div>
    <transition name="web-dialog">
      <div class="loading-iframe" v-if="loading"></div>
    </transition>
    <div class="prompt-input">
      <PromptInput
              ref="promptInput"
              @submitPrompt="submitPrompt"
      ></PromptInput>
    </div>
    <div class="prompt-content">
      <div class="params">
        <ParamForm
                @getFormData="getFormData"
        ></ParamForm>
      </div>
      <div class="show">
        <ResponseShow ref="responseShow"></ResponseShow>
      </div>
    </div>
  </div>

</template>

<script>
  import PromptInput from "/src/views/pages/sessionDraw/components/PromptInput";
  import ResponseShow from "/src/views/pages/sessionDraw/components/ResponseShow";
  import ParamForm from "/src/views/pages/sessionDraw/type/openai/ParamForm.vue";
  import SessionType from "@/common/constants/SessionType";
  import DrawType from "@/common/constants/DrawType";
  import {getToken} from "@/utils/auth";
  export default {
    name: "index",
    components: { PromptInput,ParamForm,ResponseShow },
    data(){
      return {
        loading: true,
        loadingServer: false,
        form: {},
        sessionData: {},
        sessionRecordLastData: [],
        imgUrlList: [],
        userPrompt: "",
        isLogin: !!getToken()
      }
    },
    watch:{
      loadingServer(val){
        this.$refs.promptInput.loadingServer = val
      }
    },
    created() {
    },
    mounted() {
      if(this.isLogin){
        this.getLastSessionData();
      }
    },
    methods:{
      getLastSessionData(){
        this.loading = true;
        this.$api.get('/module/session/sessioninfo/userLastDrawSession', { sessionType: SessionType.DRAW,drawUniqueKey: DrawType.OPENAI }).then(res => {
          if (res.status){
            this.loading = false
            this.sessionData = res.data
            this.getSessionRecordLastData()
          }else{
            this.$message.error(res.message)
          }
        })
      },
      getSessionRecordLastData(){
        this.loadingServer = false
        this.$api.get('/module/session/sessionrecord/getLastOneRecordSession', { sessionId: this.sessionData.id }).then(res => {
          if (res.status){
            this.sessionRecordLastData = res.data
            this.handleShowData()
          }
          this.loadingServer = false
        })
      },
      handleShowData(){
        const data = JSON.parse(JSON.stringify(this.sessionRecordLastData));

        let userData = data.filter(item => item.role === 'user')[0];
        let assistantData = data.filter(item => item.role === 'assistant')[0];
        if (userData != null){
          this.userPrompt = userData.content
        }
        if (assistantData != null){
          this.imgUrlList = assistantData.content.split(',')
        }
        this.$refs.responseShow.dataList = JSON.parse(JSON.stringify(this.imgUrlList))
        this.$refs.responseShow.userPrompt = JSON.parse(JSON.stringify(this.userPrompt))
      },
      submitPrompt(input){
        this.loadingServer = true
        this.form.prompt = input
        this.form.sessionId = this.sessionData.id
        this.form.sessionType = SessionType.DRAW
        if (this.form.apiType === 1){
          this.$api.post('/module/draw/openai/sendAiDraw',this.form).then(res => {
            if (res.status){
              this.$message.success(res.message)
              this.getSessionRecordLastData()
            }else{
              this.$message.error(res.message)
            }
            this.loadingServer = false
          })
        }else if(this.form.apiType === 2){
          this.$api.post('/module/draw/openai/sendAiDrawEdit',this.form).then(res => {
            if (res.status){
              this.$message.success(res.message)
              this.getSessionRecordLastData()
            }else{
              this.$message.error(res.message)
            }
            this.loadingServer = false
          })
        }
      },
      getFormData(val) {
        this.form = JSON.parse(JSON.stringify(val))
      }
    }
  }
</script>

<style scoped>
  .prompt-input{

  }

.prompt-content .params{
  width: 50%;
  float: left;
}
.prompt-content .show{
  width: 50%;
  float: left;
}
</style>
