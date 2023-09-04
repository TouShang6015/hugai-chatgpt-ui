<template>
  <div style="width: 100%;height: 100%;position: relative">
    <div class="session-window" ref="sessionWindow">
      <div class="chat-content" ref="chatContent" @scroll="onScroll">
        <li v-for="(item,index) in sessionRecordData" :key="index">
          <WindowAssistant v-if="item.role !== 'user'" :content-show-type="windowData.contentShowType" :item-data="item"></WindowAssistant>
          <WindowUser v-else :item-data="item"></WindowUser>
        </li>
        <div class="spacer"></div>
      </div>
    </div>
    <div class="input-main">
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
  import WindowAssistant from "@/components/session/window/WindowAssistant";
  import WindowUser from "@/components/session/window/WindowUser";

  export default {
    name: "SessionWindow",
    components: {
      WindowUser,
      InputMsg,WindowAssistant
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
      /**
       * 获取窗口高度并滚动至最底层
       */
      scrollBottom() {
        this.$nextTick(() => {
          if (!this.isAutoScroll) return;
          const scrollDom = this.$refs.chatContent;
          scrollDom.scrollTop = scrollDom.scrollHeight;
          // animation(scrollDom, scrollDom.scrollHeight);
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
        setTimeout(() => {
          this.$nextTick(() => {
            const mv = this.$refs.mv;
            if (mv != null && mv.length > 0) {
              for (let i = 0; i < mv.length; i++) {
                mv[i].initCodes();
              }
            }
          })
        }, 300)
      }
    },
  }
</script>

<style lang="scss" scoped>

  .session-window {
    width: 100%;
    height: 100vh;
    background-size: 100% 100%;
    border-radius: 20px;
    padding: 10px;
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
    padding: 8px 10% 14px 10%;
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
      margin-bottom: 20px;
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
    padding: 8px 0;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    z-index: 1510;
  }

  .spacer {
    height: 120px;
  }

  ::v-deep .markdown-body {
    font-size: 15px;
  }
</style>
