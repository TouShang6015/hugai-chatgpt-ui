<template>
  <div class="main-session">

    <div class="main-session-list" :class="{hiddenStatusSession: hiddenStatusSession}">
      <SessionList
        ref="sessionList"
        :window-data="windowData"
        :session-data="sessionData"
        :type="SessionTypeConstant.DOMAIN"
        :domain-unique-key="windowData.domainKey"
        :loading="loading"
        :loadingLine="loadingLine"
        @clickSessionListItem="getSessionData"
        @handleFlushList="handleFlushList"
        @handleCreateSession="handleCreateSession"
        @handleClearSession="handleClearSession"
        @handleDeleteSession="handleDeleteSession"
      >
      </SessionList>
    </div>

    <div class="main-session-window">

      <session-window-header
        ref="sessionWindowHeader"
        @changeModel="handleChangeModel"
      ></session-window-header>

      <LoadingLine :loading-line="loadingLine"></LoadingLine>

      <SessionWindow
        ref="sessionWindow"
        :window-data="windowData"
        :session-data="sessionData"
        :loading="loading"
        :loadingLine="loadingLine"
        @sendInputMessage="sendInputMessage"
        @stopStream="handleStopStream"
      ></SessionWindow>
    </div>

    <transition name="web-dialog">
      <LoadingIframe v-if="loading"></LoadingIframe>
    </transition>
  </div>
</template>

<script>
  import SessionTypeConstant from '@/common/constants/SessionType';
  import SessionWindow from "./window/SessionWindow";
  import SessionList from "./window/SessionList";
  import LoadingLine from "./LoadingLine";
  import {linkSseEvent} from "@/utils/request/SseRequest";
  import StreamResponseType from "@/common/constants/StreamResponseType";
  import {getToken} from "@/utils/auth";
  import SessionWindowHeader from "@/components/session/window/header/Header";

  export default {
    name: "SessionIndex",
    components: { SessionWindowHeader, SessionWindow,SessionList,LoadingLine },
    props: {
      windowData: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        SessionTypeConstant,
        loading: true,
        loadingLine: false,
        sessionLoadingStatus: false,
        connectId: undefined,
        ifConnect: false,
        chatModelId: undefined,
        isLogin: !!getToken(),
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
      if (this.handleBefore()){
        this.getLastSessionData();
      }
    },
    methods: {
      handleBefore(){
        if (!this.isLogin) {
          this.$message.info('登录后体验更多功能~')
          return false;
        }
        return true
      },
      // 获取当前窗口最新的会话
      getLastSessionData(){
        this.loading = true
        this.$api.get('/module/session/sessioninfo/userLastDomainSession',{
          sessionType: SessionTypeConstant.DOMAIN,
          domainUniqueKey: this.windowData.domainKey,
        }).then(res => {
          if (res.data != null){
            this.sessionData = res.data;
            this.loading = false
            this.$refs.sessionList.clickSessionListItem(this.sessionData)
            this.handleFlushList()
          }
        })
      },
      getSessionData(item){
        this.loading = true
        setTimeout(() => {
          this.sessionData = JSON.parse(JSON.stringify(item));
          this.getSessionRecordData(this.sessionData.id);
          this.loading = false
          this.$refs.sessionWindowHeader.setModelValue(this.sessionData.chatModelId)
        },30)
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
            this.ifConnect = false
          }
        })
      },
      handleFlushList(){
        this.$refs.sessionList.handleFlushList()
      },
      handleCreateSession(){
        this.$api.post('/module/session/sessioninfo/addDomainSession',{
          sessionType: SessionTypeConstant.DOMAIN,
          domainUniqueKey: this.windowData.domainKey,
        }).then(() => {
          this.getLastSessionData();
          this.$refs.sessionList.handleFlushList()
        })
      },
      handleClearSession(sessionId){
        this.loading = true
        this.$confirm('确定要清空当前会话记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.getRestful('/module/session/sessioninfo/clearSession',sessionId).then(res => {
            this.$refs.sessionList.handleFlushList()
            this.$refs.sessionList.flushRecord()
            this.loading = false
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
          this.$message.error("会话加载中......")
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
              that.ifConnect = true
              that.flushSendData(inputMessage);
              that.apiSend(connectId,inputMessage)
            }else{
              if (!that.ifConnect){
                return
              }
              let popData = that.sessionRecordData[that.sessionRecordData.length - 1];
              let data = event.data;
              data = data.replaceAll("↖emsp↘"," ")
              data = data.replaceAll("↖br↘","\n")
              data = data.replaceAll("↖tab↘","   ")
              popData.content += data;
            }
          };

          sseEvent.onerror = function () {
            that.loadingLine = false
            that.connectId = undefined;
            sseEvent.close();
            sseEvent = null;
          };
        } else {
          this.$message.error("浏览器版本不支持sse，请更换浏览器")
          this.loadingLine = false;
        }
      },
      // websocket
      socketConnectMessage(inputMessage){
        const that = this;

        const websocketUrl = this.$store.getters.resourceMain.websocketUrl;
        const wsUrl = websocketUrl +'/socket/chat';
        const webSocket = new WebSocket(wsUrl);

        webSocket.onmessage = function (event) {
          let data = event.data;
          if (that.connectId === undefined){
            that.connectId = data;
            that.ifConnect = true
            that.flushSendData(inputMessage);
            that.apiSend(that.connectId,inputMessage)
          }else{
            if (!that.ifConnect){
              return
            }
            let popData = that.sessionRecordData[that.sessionRecordData.length - 1];
            popData.content += data;
          }
        };

        webSocket.onclose = function () {
          that.loadingLine = false
          that.connectId = undefined;
        }

        webSocket.onerror = function () {
          that.apiErrorHandle("请求失败")
        }

      },
      apiErrorHandle(msg){
        const that = this;
        that.$message.error(msg);
        that.sessionRecordData.pop();
        that.sessionRecordData.pop();
        that.loadingLine = false
      },
      apiSend(connectId,inputMessage){
        if (connectId == null){
          return;
        }
        let ifConc = this.$refs.sessionWindow.getIfConc();
        if (ifConc === '1' || ifConc === 'true' || ifConc === 1 || ifConc === true){
          ifConc = '1'
        }else{
          ifConc = '0'
        }
        this.$api.post(`/module/chat/sendDomain`,{
          connectId: connectId,
          sessionId: this.sessionData.id,
          chatModelId: this.chatModelId,
          sessionType: SessionTypeConstant.DOMAIN,
          content: inputMessage,
          domainUniqueKey: this.windowData.domainKey,
          ifConc2: ifConc
        }).then(res => {
          if (!res.status){
            this.apiErrorHandle(res.message)
          }
        })
      },
      handleStopStream(){
        this.$api.get('/module/chat/stopStreamResponse/' + this.connectId);
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
      },
      handleChangeModel(chatModelId){
        this.chatModelId = chatModelId
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
    word-break: keep-all;
  }
  .main-session-list.hiddenStatusSession{
    width: 0;
    transition-property: all;
  }

  .main-session-window{
    position: relative;
    min-width: 80%;
    width: auto;
    height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

</style>
