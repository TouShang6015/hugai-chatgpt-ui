<template>
  <div class="session-window">
    <div class="chat-session-content rounded-md" ref="sessionWindow">
      <div class="chat-content" ref="chatContent" @scroll="onScroll">
        <li v-for="(item,index) in sessionRecordData" :key="index">
          <window-session-content
            :role="item.role"
            :content-show-type="windowData.contentShowType"
            :item-data="item"
            @handleFlushThisSession="handleFlushThisSession"
          ></window-session-content>
        </li>
        <div class="spacer"></div>
      </div>
    </div>
    <div class="input-main">
      <div class="stop">
        <div class="stop-item pointer rounded-md" v-if="loadingLine" @click="handleStopStream">
          <img :src="require('/src/assets/imgs/stop.png')" alt=""/>
          <span>停止输出</span>
        </div>
      </div>
      <InputMsg
        ref="componentInputMsg"
        @setInputMsg="setInputMsg"
        @flushIfConc="flushIfConc"
        @sendInputMessage="sendInputMessage"
      ></InputMsg>
    </div>
  </div>

</template>

<script>
  import InputMsg from './inputMsg/inputMsg';
  import ContentShowType from "@/common/constants/ContentShowType";
  import WindowSessionContent from "@/components/session/window/chat/WindowSessionContent";

  export default {
    name: "SessionWindow",
    components: {
      WindowSessionContent,
      InputMsg
    },
    props: {
      windowData: {
        type: Object,
        default: () => {
        }
      },
      sessionData: {
        type: Object,
        default: () => {
        }
      },
      loading: {type: Boolean, default: false},
      loadingLine: {type: Boolean, default: false},
      defaultInputMessage: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        ContentShowType,
        isAutoScroll: true,
        ifConc: this.$store.state.settings.ifConc,
        inputMsg: '',
        sessionRecordData: []
      }
    },
    watch: {
      sessionRecordData: {
        deep: true,
        handler(val) {
          if (val != null) {
            this.$nextTick(() => {
              this.scrollBottom();
            })
          }
        }
      },
    },
    created() {
    },
    mounted() {
      this.$refs.componentInputMsg.inputMsg = this.defaultInputMessage
    },
    methods: {
      setInputMsg(val) {
        this.inputMsg = val
      },
      setSessionRecord(val) {
        this.sessionRecordData = val;
      },
      getIfConc(){
        return this.ifConc;
      },
      flushIfConc(val){
        this.ifConc = val
      },
      onScroll() {
        const scrollDom = this.$refs.chatContent;
        const scrollTop = scrollDom.scrollTop;
        const offsetHeight = scrollDom.offsetHeight;
        const scrollHeight = scrollDom.scrollHeight;
        // 当滚动到底部，设置 isAutoScroll 为 true
        if (scrollTop + offsetHeight >= scrollHeight) {
          this.isAutoScroll = true;
        } else {
          // 否则，用户正在手动滑动，设置为 false，停止自动滚动
          this.isAutoScroll = false;
        }
      },
      sendInputMessage() {
        this.$emit('sendInputMessage', this.inputMsg)
        this.scrollBottom();
      },
      handleFlushThisSession(sessionId){
        this.$emit('handleFlushThisSession',sessionId)
      },
      handleStopStream(){
        this.$emit('stopStream')
      },
      /**
       * 获取窗口高度并滚动至最底层
       */
      scrollBottom() {
        this.$nextTick(() => {
          if (!this.isAutoScroll) return;
          const scrollDom = this.$refs.chatContent;
          scrollDom.scrollTop = scrollDom.scrollHeight;
        });
      },
      /**
       * 设置加载线
       * @param val
       */
      setLoadingLine(val) {
        this.$emit('setLoadingLine', val);
      },
      flushMarkdown() {
        // setTimeout(() => {
        //   this.$nextTick(() => {
        //     const mv = this.$refs.mv;
        //     if (mv != null && mv.length > 0) {
        //       for (let i = 0; i < mv.length; i++) {
        //         mv[i].initCodes();
        //       }
        //     }
        //   })
        // }, 300)
      }
    },
  }
</script>

<style lang="scss" scoped>

  .session-window{
    position: relative;
    width: 100%;
    flex: 1;
    max-height: 100%;
    display: flex;
  }

  .chat-session-content {
    width: 100%;
    height: 100%;
    margin-top: 44px;
    background-size: 100% 100%;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    flex-direction: column;
  }

  .chat-content {
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
    padding: 8px 0 14px 0;
    box-sizing: border-box;
    flex-grow: 1;

    .chat-main-content {
      width: 100%;
      display: flex;
    }

    li {
      list-style: none;
      height: auto;
      width: 100%;
      display: flex;
    }

  }

  .input-main {
    position: absolute;
    width: 100%;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    z-index: 1510;
  }

  .input-main .stop{
    width: 100%;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;

    .stop-item{
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--font-color-default);
      border: 1px var(--item-border-normal-color) solid;
      z-index: 1;
      transition: all 0.1s ease-out;
      background: var(--background-main);

      &:hover{
        box-shadow: 0 0 3px 1px var(--item-border-default-color);
        transition: all 0.2s ease-out;

      }
      &:active{
        transform: scale(0.92);
        transition: all 0.2s ease-in-out;
      }

      span{
        margin: 0 5px
      }
    }
  }
  ::v-deep .stop img{
    width: 15%;
  }

  .spacer {
    height: 50%;
  }

  ::v-deep .markdown-body {
    font-size: 15px;
  }
</style>
