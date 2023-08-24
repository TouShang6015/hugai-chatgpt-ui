<template>
  <div class="main">
    <div class="top-selected">
      <el-radio-group v-model="radioActive">
        <el-radio :label="1">Open Ai 图片生成</el-radio>
        <el-radio :label="2">敬请期待</el-radio>
      </el-radio-group>
    </div>
    <transition name="web-fade">
      <OpenaiIndex v-if="radioActive === 1"></OpenaiIndex>
    </transition>
  </div>
</template>

<script>
  import OpenaiIndex from "/src/views/pages/sessionDraw/type/openai/index";
  import {getToken} from "@/utils/auth";

  export default {
    name: "index",
    components: { OpenaiIndex },
    data(){
      return{
        radioActive: '',
        isLogin: !!getToken()
      }
    },
    mounted() {
      this.radioActive = 1;
    }
  }
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
}
  .top-selected{
    align-items: center;
    text-align: center;
    padding: 20px 0;
  }
</style>
