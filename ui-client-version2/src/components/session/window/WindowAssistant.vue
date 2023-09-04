<template>
  <div class="chat-friend">
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
      <Copy :value="itemData.content"></Copy>
    </div>
  </div>
</template>

<script>
  import Copy from './copy';
  import ContentShowType from "@/common/constants/ContentShowType";
  import MarkdownView from '@/components/MarkdownView/index'

  export default {
    name: "WindowAssistant",
    components: {
      Copy, MarkdownView
    },
    props: {
      itemData: { type: Object, required: true },
      contentShowType: { type: String, default: ContentShowType.Markdown},
    },
    data(){
      return{
        ContentShowType
      }
    }
  }
</script>

<style scoped lang="scss">

  .chat-friend {
    width: 100%;
    height: auto;
    float: left;

    .chat-text {
      float: left;
      max-width: 80%;
      padding: 8px 15px 8px 15px;
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
</style>
