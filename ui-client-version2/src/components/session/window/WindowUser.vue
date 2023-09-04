<template>
  <div class="chat-me">
    <div class="info-time">
      <span>{{$store.getters.username}}</span>
      <el-image :src="userImgHead">
        <div slot="error" class="image-slot">
          <img :src="require('/src/assets/imgs/user_img_default1.png')" alt="">
        </div>
      </el-image>
    </div>
    <div class="chat-text">
      <span style="font-size:15px">{{ itemData.content }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WindowUser",
    props: {
      itemData: { type: Object, required: true },
    },
    data(){
      return{
        userImgHead: ''
      }
    },
    mounted() {
      this.userImgHead = this.$store.getters.configMain.staticWebsite + this.$store.getters.imgHeader
    },
  }
</script>

<style scoped lang="scss">
  .chat-me {
    width: 100%;
    float: right;

    .chat-text {
      float: right;
      max-width: 90%;
      padding: 8px 15px 8px 15px;
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
</style>
