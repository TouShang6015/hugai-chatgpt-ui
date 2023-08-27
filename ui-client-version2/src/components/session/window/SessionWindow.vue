<template>
  <div style="width: 100%;height: 100%;position: relative">
    <div class="session-window" ref="sessionWindow">
      <div class="chat-content" ref="chatContent" @scroll="onScroll">
        <li v-for="(item,index) in sessionRecordData" :key="index">
          <div class="chat-friend" v-if="item.role !== 'user'">
            <div class="info-time">
              <img :src="require('/src/assets/imgs/robot4.png')" alt=""/>
              <span>Hug Ai 助手</span>
              <span>{{item.createTime}}</span>
            </div>
            <div class="chat-main-content">
              <div class="chat-text">
                <div class="message-content">
                  <MarkdownView
                          ref="mv"
                          v-if="windowData.contentShowType == ContentShowType.Markdown"
                          :content="item.content"
                  ></MarkdownView>
                  <div v-html="item.content" v-if="windowData.contentShowType == ContentShowType.Html"/>
                </div>
              </div>
              <Copy :value="item.content"></Copy>
            </div>
          </div>
          <div class="chat-me" v-else>
            <div class="info-time">
              <span>{{$store.getters.username}}</span>
              <el-image :src="userImgHead">
                <div slot="error" class="image-slot">
                  <img :src="require('/src/assets/imgs/user_img_default1.png')" alt="">
                </div>
              </el-image>
            </div>
            <div class="chat-text">
              <span style="font-size:15px">{{ item.content }}</span>
            </div>
          </div>
        </li>
        <div class="spacer"></div>
      </div>
    </div>
    <div class="input-main">
      <InputMsg
              @setInputMsg="setInputMsg"
              @sendInputMessage="sendInputMessage"
      ></InputMsg>
    </div>
  </div>

</template>

<script>
  import InputMsg from './inputMsg/inputMsg';
  import Copy from './copy';
  import ContentShowType from "@/common/constants/ContentShowType";
  import MarkdownView from '@/components/MarkdownView/index'

  export default {
    name: "SessionWindow",
    components: {
      InputMsg, Copy, MarkdownView
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
      loading: {type: Boolean, default: false}
    },
    data() {
      return {
        ContentShowType,
        isAutoScroll: true,

        inputMsg: '',
        userImgHead: '',

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
      this.userImgHead = this.$store.getters.configMain.staticWebsite + this.$store.getters.imgHeader
    },
    methods: {
      setInputMsg(val) {
        this.inputMsg = val
      },
      setSessionRecord(val) {
        this.sessionRecordData = val;
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
  @import "/src/assets/css/theme.scss";

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
    padding: 8px 14px 14px 14px;
    box-sizing: border-box;
    flex-grow: 1;
    padding: 0 10%;

    .chat-main-content {
      width: 100%;
    }

    li {
      list-style: none;
      height: auto;
      width: 100%;
      margin-bottom: 20px;
      display: flex;
    }

    .chat-friend {
      width: 100%;
      height: auto;
      float: left;

      .chat-text {
        float: left;
        max-width: 80%;
        padding: 8px 15px 8px 15px;
        border-radius: 5px 12px 12px 12px;
        background-color: #fff;

      }

      .info-time {
        margin: 10px 0;
        color: #fff;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 10px;
        }

        span {
          line-height: 30px;
        }

        span:last-child {
          color: rgb(101, 104, 115);
          margin-left: 10px;
          vertical-align: middle;
        }
      }
    }

    .chat-me {
      width: 100%;
      float: right;

      .chat-text {
        float: right;
        max-width: 90%;
        padding: 8px 15px 8px 15px;
        border-radius: 12px 5px 12px 12px;
        background-color: #95ec69;
        color: #000;
        word-break: break-all;
      }

      .info-time {
        margin: 10px 0;
        color: #fff;
        font-size: 14px;
        display: flex;
        justify-content: flex-end;

        span {
          line-height: 30px;
        }

        span:first-child {
          color: rgb(101, 104, 115);
          margin-right: 10px;
          vertical-align: middle;
        }
      }
    }
  }

  ::v-deep .info-time .el-image img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 10px;
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
