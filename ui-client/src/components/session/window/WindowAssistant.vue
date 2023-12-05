<template>
  <div class="chat-friend"
       @mouseenter="handleMouseEnter"
       @mouseleave="handleMouseLeave"
  >
    <div class="info-time">
      <img :src="require('/src/assets/imgs/robot4.png')" alt=""/>
      <span>Hug Ai 助手</span>
      <span>{{itemData.createTime}}</span>
    </div>
    <div class="chat-main-content">
      <div class="chat-text">
        <div class="message-content">
          <MarkdownView
                  ref="mv"
                  v-if="contentShowType == ContentShowType.Markdown"
                  :content="itemData.content"
          ></MarkdownView>
          <div v-html="itemData.content" v-if="contentShowType == ContentShowType.Html"/>
        </div>
      </div>
    </div>
    <chat-tools
            :content="itemData.content"
            :session-record-id="itemData.id"
            :session-id="itemData.sessionId"
            @deleteAfter="handleDeleteAfter"
            v-show="toolsShow && openTools"
    ></chat-tools>
    <div style="height: 40px" v-show="!toolsShow && openTools"></div>
    <div style="height: 40px" v-show="!openTools"></div>
  </div>
</template>

<script>
  import ContentShowType from "@/common/constants/ContentShowType";
  import MarkdownView from '@/components/MarkdownView/index'
  import ChatTools from "@/components/session/window/ChatTools";

  export default {
    name: "WindowAssistant",
    components: {
      ChatTools, MarkdownView
    },
    props: {
      itemData: { type: Object, required: true },
      contentShowType: { type: String, default: ContentShowType.Markdown},
      openTools: { type: Boolean, default: true }
    },
    data(){
      return{
        ContentShowType,
        toolsShow: false
      }
    },
    created() {
    },
    methods:{
      handleMouseEnter() {
        this.toolsShow = true
      },
      handleMouseLeave() {
        this.toolsShow = false
      },
      handleDeleteAfter(){
        this.$emit('handleFlushThisSession',this.itemData.sessionId)
      }
    }
  }
</script>

<style scoped lang="scss">

  .chat-friend {
    width: 100%;
    height: auto;
    padding: 0px 8%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:hover{
      background-color: rgba(255, 255, 255, 0.04);
    }

    .chat-text {
      max-width: 100%;
      padding: 6px 10px 6px 10px;
      border-radius: 5px 12px 12px 12px;
      background-color: var(--session-window-system-background);
    }

    .info-time {
      margin: 10px 0;
      color: var(--font-color-default);
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
        color: var(--font-color-default);
        margin-left: 10px;
        vertical-align: middle;
      }
    }
  }

  ::v-deep .chat-tools{
    display: flex;
    justify-content: flex-start;
  }
</style>
