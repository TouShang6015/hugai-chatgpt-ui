<template>
  <div class="help-main">
    <div class="help-top">
      <div class="watermark"></div>
      <transition-group name="fade-list-to-right">
        <div class="top-item" v-for="(item,index) in convertItemData" :key="index">
          <WindowUser v-if="item.role === 'user'" :open-tools="false" :item-data="item"></WindowUser>
          <WindowAssistant v-else :item-data="item" :open-tools="false" :content-show-type="ContentShowType.Markdown"></WindowAssistant>
        </div>
      </transition-group>
    </div>
    <div class="help-bottom">
      <h2></h2>
      <div class="bottom-item-main">
        <li class="click-box pointer rounded-md" v-for="(item,index) in noticeData" :key="index" @click="handleQuestion(item)">
          <span>{{index + 1}}. {{item.title}}</span>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentShowType from '@/common/constants/ContentShowType';
  import WindowUser from "@/components/session/window/WindowUser";
  import WindowAssistant from "@/components/session/window/WindowAssistant";

  export default {
    name: "PagesHelp",
    components: {WindowAssistant, WindowUser},
    data() {
      return {
        ContentShowType,
        noticeData: [],
        convertItemData: [],
      }
    },
    created() {
    },
    mounted() {
      this.getNoticeData()
    },
    methods: {
      getNoticeData() {
        this.$api.post('/module/business/noticeclient/baseQueryByParam', {noticeType: 'HELP',sortCondition: { sort: true }}).then(res => {
          if (res.status) {
            this.noticeData = res.data
            let one = this.noticeData[0];
            if (one != null){
              this.handleQuestion(one)
            }
          }
        })
      },
      handleQuestion(item){
        let arr = [];
        arr.push({content: item.title, createTime: item.createTime, role: 'user',id: '',sessionId: '',sessionRecordId: ''});
        arr.push({content: item.content, createTime: item.createTime, role: 'assistant',id: '',sessionId: '',sessionRecordId: ''});
        this.convertItemData = arr;
      }
    }
  }
</script>

<style scoped>
  .help-main {
    position: relative;
    width: 100%;
    height: 99%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    background: var(--help-background);
  }

  .help-top {
    width: 100%;
    height: 70%;
    padding: 8px 0 14px 0;
    box-sizing: border-box;
    flex-grow: 1;
    z-index: 0;
    position: relative;
    overflow: hidden;
  }

  .help-top .top-item {
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
  }

  .help-bottom {
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: var(--font-color-default);
  }
  .help-bottom h2{
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .help-bottom .bottom-item-main{
    width: 100%;
    height: 100%;
    display: flex;
    padding: 10px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .help-bottom .bottom-item-main li{
    width: auto;
    position: relative;
    height: 34px;
    background: var(--help-bottom-li-background);
    padding: 3px 10px;
    margin: 3px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    letter-spacing: 2px ;
    word-spacing: 2px ;
  }

  .watermark{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: url('/src/assets/imgs/logo.png') no-repeat center;
  }
  .watermark span{

  }
</style>
