<template>
  <div class="main-session">

    <div class="main-session-list" :class="{hiddenStatusSession: hiddenStatusSession}">
      <SessionList
              ref="sessionList"
              :window-data="windowData"
              :session-data="sessionData"
              :loading="loading"
              @clickSessionListItem="getSessionDataBySessionId"
              @handleCreateSession="handleCreateSession"
              @handleClearSession="handleClearSession"
              @handleDeleteSession="handleDeleteSession"
      >
      </SessionList>
    </div>

    <div class="main-session-window">

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
  import SessionList from "./window/SessionList";
  import SessionWindow from "./window/SessionWindow";
  import LoadingLine from "./LoadingLine";
  import StreamResponseType from "@/common/constants/StreamResponseType";
  import {linkSseEvent} from "@/utils/request/SseRequest";

  export default {
    name: "SessionIndex",
    components: { SessionList,SessionWindow,LoadingLine },
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
        connectId: undefined,
        hiddenStatusSession: this.$store.state.settings.hiddenStatusSessionList,

        sessionData: {},
        sessionRecordData: []
      }
    },
    watch:{
      sessionRecordData(val){
        if (val != null){
          this.$refs.sessionWindow.setSessionRecord(val)
        }
      },
      '$store.state.settings.hiddenStatusSessionList':{
        handler:function (val) {
          this.hiddenStatusSession = val;
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
        this.$api.get('/module/session/sessioninfo/userLastDomainSession',{
          sessionType: this.windowData.sessionType,
          domainUniqueKey: this.windowData.domainKey,
        }).then(res => {
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
        this.$api.post('/module/session/sessioninfo/addDomainSession',{
          sessionType: this.windowData.sessionType,
          domainUniqueKey: this.windowData.domainKey,
        }).then(() => {
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
      handleDeleteSession(sessionId){
        if (sessionId == undefined || sessionId == null){
          this.$message.error("未找到会话信息")
          return
        }
        this.loading = true
        this.$confirm('确定要删除当前会话吗，删除后无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteRestful('/module/session/sessioninfo/deleteSession',sessionId).then(res => {
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
          let streamResponseType = this.$store.getters.streamResponseType;
          switch (streamResponseType) {
            case StreamResponseType.Websocket:
              this.socketConnectMessage(inputMessage);
              break;
            case StreamResponseType.SSE:
              this.sseConnectMessage(inputMessage);
              break;
          }
        }else{
          this.$message.warning("内容不能为空")
          this.loadingLine = false
        }
      },
      // sse
      sseConnectMessage(inputMessage) {
        const that = this;
        if (window.EventSource) {
          let sseEvent = linkSseEvent()

          sseEvent.onmessage = function (event) {

            let connectId = event.lastEventId;
            let data = event.data;

            if (connectId == data){
              that.connectId = connectId;
              that.flushSendData(inputMessage);
              that.apiSend(connectId,inputMessage)
            }else{
              let popData = that.sessionRecordData[that.sessionRecordData.length - 1];
              let data = event.data;
              data = data.replaceAll("↖emsp↘"," ")
              data = data.replaceAll("↖br↘","\n")
              data = data.replaceAll("↖tab↘","   ")
              popData.content += data;
            }
          };

          sseEvent.onerror = function () {
            that.$refs.sessionWindow.flushMarkdown()
            that.loadingLine = false
            that.connectId = undefined;
            sseEvent.close();
            sseEvent = null;
          };
        } else {
          console.error("不支持sse")
          this.loadingLine = false;
        }
      },
      // websocket
      socketConnectMessage(inputMessage){
        const that = this;

        const websocketUrl = this.$store.getters.configMain.websocketUrl;
        const wsUrl = websocketUrl +'/socket/chat';
        const webSocket = new WebSocket(wsUrl);

        webSocket.onmessage = function (event) {
          let data = event.data;
          if (that.connectId === undefined){
            that.connectId = data;
            that.flushSendData(inputMessage);
            that.apiSend(that.connectId,inputMessage)
          }else{
            let popData = that.sessionRecordData[that.sessionRecordData.length - 1];
            popData.content += data;
          }
        };

        webSocket.onclose = function () {
          that.$refs.sessionWindow.flushMarkdown()
          that.loadingLine = false
          that.connectId = undefined;
        }

        webSocket.onerror = function () {
          that.$message.error("请求失败");
          that.sessionRecordData.pop();
          that.sessionRecordData.pop();
          that.loadingLine = false
        }

      },
      apiSend(connectId,inputMessage){
        if (connectId == null){
          return;
        }
        this.$api.post(`/module/chat/sendDomain`,{
          connectId: connectId,
          sessionId: this.sessionData.id,
          sessionType: this.windowData.sessionType,
          content: inputMessage,
          domainUniqueKey: this.windowData.domainKey,
          ifConc: this.$refs.sessionWindow.getIfConc()
        });
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

<style lang="scss" scoped>

  .main-session{
    height: 100%;
    width: 100%;
    display: flex;
  }
  .main-session-list{
    width: 15%;
    min-height: 100%;
    display: flex;
    transition: width 0.2s;
  }
  .main-session-list.hiddenStatusSession{
    width: 0;
    transition-property: all;
  }

  .main-session-window{
    min-width: 80%;
    width: auto;
    height: 100%;
    padding: 0px 4px 0px 12px;
    flex: 1;
  }


</style>
