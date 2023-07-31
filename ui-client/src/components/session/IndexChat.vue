<template>
  <div class="main-session">

    <div class="main-session-list">
      <SessionList
              ref="sessionList"
              :window-data="windowData"
              :session-data="sessionData"
              :loading="loading"
              @clickSessionListItem="getSessionDataBySessionId"
      >
      </SessionList>
    </div>

    <div class="main-session-window">
      <SessionTop
              ref="sessionTop"
              :window-data="windowData"
              @handleCreateSession="handleCreateSession"
              @handleClearSession="handleClearSession"
              @handleDeleteSession="handleDeleteSession"
      ></SessionTop>

      <LoadingLine :loading-line="loadingLine"></LoadingLine>

      <SessionWindow
              ref="sessionWindow"
              :window-data="windowData"
              :session-data="sessionData"
              :loading="loading"
              @sendInputMessage="sendInputMessage"
      ></SessionWindow>
    </div>

    <transition name="web-dialog">
      <div class="loading-iframe" v-if="loading"></div>
    </transition>
  </div>
</template>

<script>
  import SessionTop from "./SessionTop";
  import SessionWindow from "./window/SessionWindow";
  import SessionList from "./window/SessionList";
  import LoadingLine from "./LoadingLine";
  import { linkSseEvent } from "/src/utils/request/SseRequest";

  export default {
    name: "SessionIndex",
    components: { SessionTop,SessionWindow,SessionList,LoadingLine },
    props: {
      windowData: {
        type: Object,
        required: true
      }
    },
    data(){
      return {

        loading: true,
        loadingLine: false,
        sessionLoadingStatus: false,

        sessionData: {},
        sessionRecordData: []
      }
    },
    watch:{
      sessionRecordData(val){
        if (val != null){
          this.$refs.sessionWindow.setSessionRecord(val)
        }
      }
    },
    created() {
      this.getLastSessionData();
    },
    methods: {
      // 获取当前窗口最新的会话
      getLastSessionData(){
        this.loading = true
        this.$api.getRestful('/module/session/sessioninfo/userLastSession',this.windowData.sessionType).then(res => {
          if (res.data != null){
            this.sessionData = res.data;
            this.getSessionRecordData(this.sessionData.id);
            this.loading = false
          }
        })
      },
      getSessionDataBySessionId(sessionId){
        this.loading = true
        this.$api.getRestful('/module/session/sessioninfo/getSessionInfo',sessionId).then(res => {
          if (res.data != null){
            this.sessionData = res.data;
            this.getSessionRecordData(this.sessionData.id);
            this.loading = false
          }
        })
      },
      // 会话列表
      getSessionRecordData(sessionId){
        this.$api.get('/module/session/sessionrecord/getRecordSession',{sessionId}).then(res => {
          if (res.status){
            this.sessionRecordData = res.data;
            this.$refs.sessionWindow.flushMarkdown()
          }
        })
      },
      handleCreateSession(){
        this.$api.getRestful('/module/session/sessioninfo/addSession',this.windowData.sessionType).then(res => {
          this.getLastSessionData();
        })
      },
      handleClearSession(){
        this.loading = true
        this.$confirm('确定要清空当前会话记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.getRestful('/module/session/sessioninfo/clearSession',this.sessionData.id).then(res => {
            this.getLastSessionData()
          })
        }).catch(() => {
          this.loading = false
        });
      },
      handleDeleteSession(){
        this.loading = true
        this.$confirm('确定要删除当前会话吗，删除后无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteRestful('/module/session/sessioninfo/deleteSession',this.sessionData.id).then(res => {
            if (res.status){
              this.handleCreateSession();
            }else{
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.loading = false
        });
      },
      // 发送消息
      sendInputMessage(inputMessage){
        if (this.loadingLine){
          this.$message.error("会话加载中，不要心急嗷~~")
          return
        }
        this.loadingLine = true
        if (inputMessage) {
          this.createSse(inputMessage);
        }else{
          this.$message.warning("内容不能为空")
          this.loadingLine = false
        }
      },
      // 建立sse连接
      createSse(inputMessage) {
        const that = this;
        if (window.EventSource) {
          let sseEvent = linkSseEvent()

          sseEvent.onmessage = function (event) {

            let sseId = event.lastEventId;
            let data = event.data;

            if (sseId == data){
              that.sseId = sseId;
              that.flushSendData(inputMessage);
              that.apiSend(sseId,inputMessage)
            }else{
              let popData = that.sessionRecordData[that.sessionRecordData.length - 1];
              let data = event.data;
              data = data.replaceAll("↖emsp↘"," ")
              data = data.replaceAll("↖br↘","\n")
              data = data.replaceAll("↖tab↘","   ")
              popData.content += data;
            }
          };

          sseEvent.onerror = function (error) {
            sseEvent.close();
            that.$refs.sessionWindow.flushMarkdown()
            sseEvent = null;
          };
        } else {
          console.error("不支持sse")
          this.loadingLine = false;
        }
      },
      apiSend(sseId,inputMessage){
        if (sseId == null){
          return;
        }
        this.$api.post(`/module/chat/send`,{
          sseId: sseId,
          sessionId: this.sessionData.id,
          sessionType: this.windowData.sessionType,
          content: inputMessage
        }).then(res => {
          if (!res.status){
            this.$message.error(res.message);
            this.sessionRecordData.pop();
            this.sessionRecordData.pop();
          }
          this.loadingLine = false
        })
      },
      // 发送前整理数据
      flushSendData(inputMessage) {
        let userData = {
          role: 'user',
          content: JSON.parse(JSON.stringify(inputMessage)),
          createTime: new Date().toLocaleString()
        }
        this.sessionRecordData.push(userData)

        let assistantData = {
          role: 'assistant',
          content: "",
          createTime: new Date().toLocaleString()
        }
        this.sessionRecordData.push(assistantData)
      }
    }
  }
</script>

<style scoped>

  .main-session{
    height: 100%;
    width: 100%;
    display: flex;
  }
  .main-session-list{
    width: 18%;
    min-height: 100%;
    padding: 0px 5px;
    display: flex;
  }
  .main-session-window{
    width: 82%;
    height: 100%;
    border: 1px #6572aa solid;
    padding: 5px 4px 5px 12px;
    border-radius: 10px;
    box-shadow: 1px 0px 5px 2px rgba(221, 225, 234, 0.4) inset;
    flex: 1;
  }

</style>
