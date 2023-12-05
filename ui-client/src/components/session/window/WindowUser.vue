<template>
  <div class="chat-me"
       @mouseenter="handleMouseEnter"
       @mouseleave="handleMouseLeave"
  >
    <div class="info-time">
      <span>{{$store.getters.username}}</span>
      <el-image :src="userImgHead">
        <div slot="error" class="image-slot">
          <img :src="require('/src/assets/imgs/user_img_default1.png')" alt="">
        </div>
      </el-image>
    </div>
    <div class="chat-text">
      <span style="font-size:15px;white-space: pre-wrap">{{ itemData.content }}</span>
    </div>
    <chat-tools
            :content="itemData.content"
            :session-record-id="itemData.id"
            :session-id="itemData.sessionId"
            @deleteAfter="handleDeleteAfter"
            v-show="toolsShow"
            v-if="openTools"
    ></chat-tools>
    <div style="height: 40px" v-show="!toolsShow && openTools"></div>
    <div style="height: 40px" v-show="!openTools"></div>
  </div>
</template>

<script>
  import ChatTools from "@/components/session/window/ChatTools";
  export default {
    name: "WindowUser",
    components: {ChatTools},
    props: {
      itemData: { type: Object, required: true },
      openTools: { type: Boolean, default: true }
    },
    data(){
      return{
        userImgHead: '',
        toolsShow: false
      }
    },
    mounted() {
      this.userImgHead = this.$store.getters.resourceMain.staticWebsite + this.$store.getters.imgHeader
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
  .chat-me {
    width: 100%;
    padding: 0px 8%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    &:hover{
      background-color: rgba(255, 255, 255, 0.04);
    }

    .chat-text {
      max-width: 90%;
      padding: 6px 10px 6px 10px;
      border-radius: 12px 5px 12px 12px;
      background-color: var(--session-window-user-background);
      color: var(--font-color-markdown);
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
        color: var(--font-color-default);
        margin-right: 10px;
        vertical-align: middle;
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

  ::v-deep .chat-tools{
    display: flex;
    justify-content: flex-end;
  }
</style>
