<template>
  <div class="prompt-main">
    <div class="textarea">
      <el-input type="textarea" rows="4" v-model="input" placeholder="输入你要描述的信息"></el-input>
    </div>
    <div class="confirm-button">
      <el-button @click="submitPrompt" :disabled="loadingServer">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PromptInput",
    data(){
      return{
        input: '',
        loadingServer: false
      }
    },
    methods: {
      submitPrompt(){
        this.$emit('submitPrompt',this.input)
      }
    }
  }
</script>

<style scoped>
.prompt-main{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: revert;
}
.textarea{
  width: 70%;
  min-height: 100%;
  max-height: 120px;
  font-family: "幼圆", sans-serif;
  position: relative;
  margin-left: 10%;
  margin-bottom: 25px;
}

.confirm-button{
  width: auto;
  height: auto;
  position: relative;
  padding-left: 20px;
}

::v-deep .el-textarea__inner {
  font-size: 16px;
  color: #e7e7e7;
  background-color: #3c3a4b;
  background-image: none;
  border: 1px solid #a4a5a5;
  border-radius: 4px;
  padding: 12px 12px 12px 12px;
  max-height: 120px;
}

  ::v-deep .el-button{
    width: 140px;
    border-radius: 10px;
    height: 35px;
    line-height: 0px;
    background: #474646;
    border: 1px solid #3b3a3a;
    color: #e3e2e2;
    letter-spacing: 12px;
    box-shadow: 0px 0px 4px 0px rgb(177 177 177) inset;
  }

::v-deep .el-button:hover {
  box-shadow: 0px 0px 4px 4px rgba(165, 162, 170, 0.96) inset;
}
::v-deep .el-button:active {
  box-shadow: 0px 0px 15px 12px rgba(165, 162, 170, 0.96) inset;
}
</style>
