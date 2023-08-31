<template>
  <div class="main">
    <slot name="chatInputs">
      <el-popover placement="top" trigger="click">
        <ComponentsBox ref="componentBox" @flushIfConc="flushIfConc"></ComponentsBox>
        <div class="input-button-box" slot="reference">
          <img :src="require('/src/assets/imgs/block2.png')" alt=""/>
        </div>
      </el-popover>
      <div class="input-box">
        <!--输入框-->
        <textarea class="inputs" id="textareaMsg" placeholder="请输入您的内容~（Enter 换行，Ctrl + Enter 发送）" v-autoheight
                  rows="3" dir autocorrect="off" aria-autocomplete="both" spellcheck="false"
                  autocapitalize="on" autocomplete="off" v-model="inputMsg"
                  @keyup.enter="handleKeyDown"></textarea>
      </div>
      <!--发送-->
      <div class="input-button-box" @click="sendInputMessage">
        <img :src="require('/src/assets/imgs/send.png')" alt=""/>
      </div>
    </slot>
  </div>
</template>

<script>
  import ComponentsBox from "@/components/session/window/inputMsg/ComponentsBox";
  export default {
    name: "inputMsg",
    components: {ComponentsBox},
    props:{
      defaultIfConc: { type: String, default: '1' }
    },
    data(){
      return{
        inputMsg: '',
        ifConc: this.defaultIfConc,
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
      flushIfConc(val){
        this.ifConc = val
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
    padding-bottom: 5px;
  }

  .input-box {

    width: 70%;
    height: 100%;
    margin: 0 10px;

    .inputs {
      width: 100%;
      height: 100%;
      padding: 10px;
      background-color: rgb(66, 70, 86);
      border-radius: 6px;
      box-sizing: border-box;
      transition: 0.2s;
      font-size: 15px;
      color: #fff;
      font-weight: 100;
      margin-top: 1px;
      border: 1px;


      &:focus {
        outline: none;
      }
    }

  }

  .input-button-box {
    width: 35px;
    height: 100%;
    margin: 0 5px;
    padding: 5px;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    border:1px solid rgba(255, 255, 255, 0.3);
    border-radius: 15%;
    transition: 0.2s;

    &:hover{
      box-shadow: 0px 0px 2px 1px rgba(255, 255, 255, 0.3) inset;
    }

    img {
      flex: 1;
      width: 100%;
      height: 100%;
      transition: transform 0.2s;
      transform-origin: center center;
    }
  }

  textarea {
    min-height: 45px;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }

</style>
