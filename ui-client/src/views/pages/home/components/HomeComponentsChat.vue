<template>
  <div class="tab-index">
    <div class="title">
      <h1>Hug Ai</h1>
    </div>
    <div class="center-content">
      <div class="item">
        <span class="iconfont icon-yumaobi"></span>
        <h2>示例</h2>
        <div class="content-text">
          <li class="pointer" v-for="(item,index) in questionArrays" :key="index" @click="handleEgClick(item)">"{{item}}"</li>
        </div>
      </div>
      <div class="item">
        <span class="iconfont icon-bangongguanli2"></span>
        <h2>功能</h2>
        <div class="content-text">
          <li>ChatGPT可以回答问题、帮助您学习、编写代码、一起进行头脑风暴等</li>
          <li>连续对话，云端存储对话信息</li>
          <li>系统添加预设对话、自定义对话，更灵活</li>
        </div>
      </div>
      <div class="item">
        <span class="iconfont icon-chat-bolt"></span>
        <h2>注意</h2>
        <div class="content-text">
          <li>GPT无法替代人类的思想，它的回答请注意分辨</li>
          <li>连续对话中GPT没有回答完全，输入"继续"可补充完接下来的对话</li>
          <li>GPT3.5 知识库受限于2021年以前的知识</li>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="pointer" @click="handleStart">
        <span>开始体验</span>
        <span class="iconfont icon-telegram-01"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getToken} from "@/utils/auth";

  const questionArrays = [
    "帮我制定一个3天的旅游计划",
    "我想要减肥，对此你有什么很好的建议？",
    "第一次拜访女朋友的父母应该送什么礼物?"
  ]
  export default {
    name: "HomeComponentsChat",
    data(){
      return{
        questionArrays,
        isLogin: !!getToken()
      }
    },
    methods:{
      handleEgClick(msg){
        this.$router.push({name: 'sessionChat',params: { inputMsg: msg}})
      },
      handleStart(){
        if (!this.isLogin){
          this.$message.info('登陆后体验更佳，快来加入吧')
          this.$store.commit('SET_AUTH_DIALOG',true)
          this.$store.commit('SET_LOGIN_DIALOG',true)
          return
        }
        this.$router.push({name: 'sessionChat'})
      }
    }
  }
</script>

<style scoped lang="scss">
  .tab-index{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-content: center;
    color: var(--font-color-default);
  }

  .title{
    display: flex;
    justify-content: center;
    padding: 20px;
    bottom: 0;
    left: 0;
  }
  h1{
    font-size: 40px;
    align-items: center;
  }

  .center-content{
    width: 100%;
    margin-top: 50px;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-content: center;
  }
  .center-content .item{
    min-height: 450px;
    max-width: 280px;
    padding: 5px;
    margin: 0px 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }
  .center-content .item .iconfont{
    font-size: 35px;
  }
  .center-content .item h2{
    padding: 12px;
  }
  .center-content .item li{
    min-height: 70px;
    height: auto;
    background: var(--aside-background);
    margin: 8px 6px;
    border-radius: 15px;
    padding: 15px;
    font-size: 14px;
    letter-spacing: 1px;
    word-spacing: 1px;
  }
  .center-content .item li:hover {
    box-shadow: 1px 1px 20px 10px var(--aside-hover-color);
  }


  .bottom{
    width: 100%;
    height: 150px;
    position: absolute;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bottom>div{
    position: relative;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-out;
  }
  .bottom>div:hover{
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
  }
  .bottom span{
    display: block;
    color: var(--font-color-default);
    font-size: 25px;
    letter-spacing: 2px;
    word-spacing: 2px;

  }
</style>
