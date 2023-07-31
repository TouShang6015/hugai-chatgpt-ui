<template>
  <div class="main">
    <div class="chatInputs">
      <div class="input-content">
        <slot name="chatInputs">
          <div class="input-box">
            <!--输入框-->
            <textarea class="inputs" id="textareaMsg" placeholder="请输入您的问题~" v-autoheight
                      maxlength="2048" rows="3" dir autocorrect="off" aria-autocomplete="both" spellcheck="false"
                      autocapitalize="off" autocomplete="off" v-model="inputMsg"
                      @keyup.enter="handleKeyDown"></textarea>
          </div>
          <!--发送-->
          <div class="input-button-box">
            <div class="send input-button" @click="sendInputMessage">
              <img :src="require('/src/assets/imgs/send.png')" alt=""/>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "inputMsg",
    data(){
      return{
        inputMsg: ''
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
        this.$emit('sendInputMessage', this.inputMsg)
        this.inputMsg = '';
      },
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
    flex: 1;
    height: 100%;
  }
  .chatInputs {
    width: 100%;
    height: 100%;
    margin: 0;

    .input-content {
      width: 100%;
      height: 100%;
      display: flex;

      .input-box {
        display: flex;
        width: 95%;
        height: 100%;

        .inputs {
          flex: 1;
          width: 100%;
          height: 100%;
          padding: 10px;
          background-color: rgb(66, 70, 86);
          border-radius: 10px;
          box-sizing: border-box;
          transition: 0.2s;
          font-size: 16px;
          color: #fff;
          font-weight: 100;

          &:focus {
            outline: none;
          }
        }

      }

      .input-button-box {
        flex: 1;

        .input-button {
          width: 100%;
          height: 100%;
          position: relative;
          text-align: center;
          align-items: center;
          justify-content: center;
          display: flex;

          img {
            width: 48px;
            height: 45px;
            position: absolute;
            transition: transform 0.5s;
            transform-origin: center center;

            &:hover{
              transform: scale(1.1);
            }

            &:active{
              border: 0;
              transition: 0.3s;
              transform: scale(0.8);
            }

          }
        }
      }

    }

  }

  textarea {
    z-index: 0;
    min-height: 100%;
    max-height: 100%;
    max-width: 100%;
    min-width: 45%;
  }

</style>
