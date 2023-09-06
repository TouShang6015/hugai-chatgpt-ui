<template>
  <div>
    <transition name="web-dialog">
      <div class="loading-iframe" v-if="loading"></div>
    </transition>
  </div>

</template>

<script>
  import SessionType from "@/common/constants/SessionType";
  import DrawType from "@/common/constants/DrawType";
  import {getToken} from "@/utils/auth";
  export default {
    name: "index",
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
        this.$api.get('/module/session/sessioninfodraw/userLastDrawSession', { drawUniqueKey: DrawType.OPENAI }).then(res => {
          if (res.status){
            this.sessionData = res.data
            if (this.sessionData != null) {
              this.sessionRecordLastData = this.sessionData.recordList
            }else{
              this.loading = false
              return
            }
            this.handleShowData()
            this.loading = false
          }else{
            this.$message.error(res.message)
          }
        })
      },
      handleShowData(){
        const data = JSON.parse(JSON.stringify(this.sessionRecordLastData));

        this.userPrompt = this.sessionData.prompt

        if (data != null){
          this.imgUrlList = data.map(item => item.drawImgUrl)
        }
        // this.$refs.responseShow.dataList = this.imgUrlList
        // this.$refs.responseShow.userPrompt = this.userPrompt
      },
      submitPrompt(input){
        this.loadingServer = true
        this.form.prompt = input
        this.form.sessionType = SessionType.DRAW
        if (this.form.apiType === 1){
          this.$api.post('/module/draw/openai/sendAiDraw',this.form).then(res => {
            if (res.status){
              this.$message.success(res.message)
              this.getLastSessionData()
            }else{
              this.$message.error(res.message)
            }
            this.loadingServer = false
          })
        }else if(this.form.apiType === 2){
          this.$api.post('/module/draw/openai/sendAiDrawEdit',this.form).then(res => {
            if (res.status){
              this.$message.success(res.message)
              this.getLastSessionData()
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
