<template>
  <div class="main">
    <slot name="chatInputs">
      <el-tooltip :content="hiddenStatus ? '开启侧边栏' : '隐藏侧边栏'" placement="top">
        <div class="input-button-box pointer" :class="{active: hiddenStatus}" @click="handleBoxClickSidebarHidden">
          <img :src="require('/src/assets/imgs/other/icon-sidebar-left.png')" alt=""/>
        </div>
      </el-tooltip>
      <el-tooltip :content="ifConc == '1' ? '连续对话(已开启)' : '连续对话(已关闭)'" placement="top">
        <div class="input-button-box pointer" :class="{active: ifConc == '1'}" @click="handleBoxClickIfConc">
          <img :src="require('/src/assets/imgs/other/icon-continuous.png')" alt=""/>
        </div>
      </el-tooltip>
      <div class="input-box">
        <!--输入框-->
        <textarea class="inputs rounded-md" id="textareaMsg" placeholder="请输入您的内容~（Enter 换行，Ctrl + Enter 发送）" v-autoheight
                  rows="3" dir autocorrect="off" aria-autocomplete="both" spellcheck="false"
                  autocapitalize="on" autocomplete="off" v-model="inputMsg"
                  @keyup.enter="handleKeyDown"></textarea>
      </div>
      <!--发送-->
      <el-tooltip content="发送" placement="top">
        <div class="input-button-box pointer" @click="sendInputMessage">
          <img :src="require('/src/assets/imgs/send.png')" alt=""/>
        </div>
      </el-tooltip>
    </slot>
  </div>
</template>

<script>
  export default {
    name: "inputMsg",
    data(){
      return{
        inputMsg: '',
        hiddenStatus: this.$store.state.settings.hiddenStatusSessionList,
        ifConc: this.$store.state.settings.ifConc,
      }
    },
    watch:{
      inputMsg(val){
        this.$emit('setInputMsg', val)
      }
    },
    methods:{
      handleKeyDown(event) {
        if (event.keyCode == 13 && event.ctrlKey) {
          this.sendInputMessage()
        }
      },
      sendInputMessage() {
        this.$emit('flushIfConc', this.ifConc)
        this.$emit('sendInputMessage', this.inputMsg)
        this.inputMsg = '';
      },
      handleBoxClickIfConc(){
        this.ifConc = ( this.ifConc == '1') ? '0' : '1';
        this.$store.commit('SET_SETTING_ITEM',{key: 'ifConc',value: this.ifConc})
      },
      handleBoxClickSidebarHidden() {
        this.hiddenStatus = !this.hiddenStatus
        this.$store.commit('SET_SETTING_ITEM',{key: 'hiddenStatusSessionList',value: this.hiddenStatus})
      }
    },
    directives: {
      //用于自适应文本框的高度
      autoheight: {
        inserted: function (el) {
          var Msg = document.getElementById("textareaMsg").value;
          if (Msg == "") {
            el.style.height = "26px"
          } else {
            el.style.height = el.scrollHeight + 'px'
          }
        },
        update: function (el) {
          var Msg = document.getElementById("textareaMsg").value;
          if (Msg == "") {
            el.style.height = "26px"
          } else {
            el.style.height = el.scrollHeight + 'px'
          }
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding-bottom: 12px;
    padding-top: 15px;
    box-shadow: 5px 0px 1px 1px var(--item-border-default-color);
  }

  .input-box {
    width: 70%;
    height: 100%;
    position: relative;
    margin: 0 15px;

    .inputs {
      width: 100%;
      height: 100%;
      padding: 10px;
      background-color: var(--background-textarea);
      box-sizing: border-box;
      transition: 0.2s;
      font-size: 15px;
      color: var(--font-color-default);
      font-weight: 100;
      margin-top: 1px;
      border: 1px;


      &:focus {
        outline: none;
      }
    }

  }

  .input-button-box {
    width: 28px;
    height: 100%;
    margin: 0 5px;
    padding: 6px;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    border: 1px solid var(--item-border-normal-color);
    border-radius: 15%;
    transition: 0.2s;

    &:hover{
      box-shadow: 0px 0px 2px 1px rgba(255, 255, 255, 0.3) inset;
    }

    &:active{
      transform: scale(0.92);
      transition: all 0.1s ease-in-out;
    }

    img {
      flex: 1;
      width: 100%;
      height: 100%;
      transition: transform 0.2s;
      transform-origin: center center;
    }
  }

  .input-button-box.active{
    box-shadow: 0px 0px 6px 2px var(--item-border-active-color) inset;
  }

  textarea {
    min-height: 2.8rem;
    max-height: 20rem;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }

</style>
