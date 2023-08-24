<template>
  <div class="session-window" ref="sessionWindow">
    <div class="chat-content" id="chat-content" ref="chatContent" @scroll="onScroll">
      <transition-group name="fade-list">
        <li v-for="(item,index) in sessionRecordData" :key="index">
          <div class="chat-friend" v-if="item.role !== 'user'">
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

            <div class="info-time">
              <img :src="require('/src/assets/imgs/robot.png')" alt=""/>
              <span>Hug Ai 助手</span>
              <span>{{item.createTime}}</span>
            </div>
          </div>
          <div class="chat-me" v-else>
            <div class="chat-text">
              <span style="font-size:15px">{{ item.content }}</span>
            </div>
            <div class="info-time">
              <span>{{$store.getters.username}}</span>
              <span>{{item.createTime}}</span>
              <el-image :src="userImgHead">
                <div slot="error" class="image-slot">
                  <img :src="require('/src/assets/imgs/user_img_default1.png')" alt="">
                </div>
              </el-image>
            </div>
          </div>
        </li>
      </transition-group>
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
  import {animation} from "@/utils/util";

  export default {
    name: "SessionWindow",
    components: {
      InputMsg,Copy,MarkdownView
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
      loading: { type: Boolean, default: false }
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
      sessionRecordData:{
        deep: true,
        handler(val){
          if (val != null) {
            this.$nextTick(() => {
              this.scrollBottom();
            })
          }
        }
      },
      loading(val){

      }
    },
    created() {
    },
    mounted() {
      this.userImgHead = this.$store.getters.configMain.staticWebsite + this.$store.getters.imgHeader
    },
    methods: {
      setInputMsg(val){
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
      /*
      * 处理消息数据
      * */
      handleMessageData(msgList) {
        this.sessionRecordData.push(msgList);
        this.scrollBottom();
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
          scrollDom.scrollTop =  scrollDom.scrollHeight;
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
      flushMarkdown(){
        setTimeout(() => {
          this.$nextTick(() => {
            const mv = this.$refs.mv;
            if(mv != null && mv.length > 0){
              for (let i = 0; i < mv.length; i++) {
                mv[i].initCodes();
              }
            }
          })
        },300)
      }
    },
  }
</script>

<style lang="scss" scoped>

  .session-window {
    width: 100%;
    height: 85vh;
    background-size: 100% 100%;
    border-radius: 20px;
    padding: 10px;
    box-sizing: border-box;
    background-color: rgb(50, 54, 68);
    overflow: auto;

    .chat-main-content {
      width: 100%;
    }

    .chat-content {
      width: 100%;
      height: 84%;
      overflow-y: scroll;
      padding: 10px 20px 20px 20px;
      box-sizing: border-box;

      li {
        list-style: none;
        height: auto;
      }

      .chat-friend {
        width: 100%;
        height: auto;
        float: left;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;

        .chat-text {
          /*display: flex;*/
          float: left;
          max-width: 80%;
          padding: 8px 15px 8px 15px;
          border-radius: 20px 20px 20px 5px;
          background-color: #fff;

        }

        .chat-img {
          img {
            max-width: 300px;
            max-height: 200px;
            border-radius: 10px;
          }
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
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        height: auto;

        .chat-text {
          float: right;
          max-width: 90%;
          padding: 8px 15px 8px 15px;
          border-radius: 20px 20px 5px 20px;
          background-color: #95ec69;
          color: #000;
          word-break: break-all;
        }

        .chat-img {
          img {
            max-width: 300px;
            max-height: 200px;
            border-radius: 10px;
          }
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

  }

  ::v-deep .info-time .el-image img{
    width: 34px;
    height: 34px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 10px;
  }

  .input-main{
    width: 100%;
    height: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 8px;
    border-top: 2px solid rgb(83, 98, 111);
    border-radius: 5px 5px 0px 0px;
  }

  ::v-deep .markdown-body {
    font-size: 15px;
  }
</style>
