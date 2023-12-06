<template>
  <div class="main">
    <transition name="web-fade">
      <div class="param-form">
        <h2 v-for="item in tabItem" :key="item.value" v-show="item.value === tabValue">{{item.label}}</h2>
        <OpenAiParamForm v-if="tabValue === 'openai'" :prompt="prompt" @submitFormCallBack="submitFormCallBack"></OpenAiParamForm>
        <SdParamForm v-if="tabValue === 'sd'" :prompt="prompt" @submitFormCallBack="submitFormCallBack"></SdParamForm>
        <MjParamForm v-if="tabValue === 'mj'" :prompt="prompt" @submitFormCallBack="submitFormCallBack"></MjParamForm>
      </div>
    </transition>
    <div class="right-content">
      <div class="top-selected">
        <a-tabs :value="tabValue" :tab-item="tabItem" width="45%" @change="tabsChange"></a-tabs>
      </div>
      <div class="draw-show">
        <transition name="web-fade">
          <DrawTaskShowList ref="drawTaskShowList" :draw-type="tabValue" v-if="status"></DrawTaskShowList>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import {getToken} from "@/utils/auth";
  import OpenAiParamForm from "@/views/pages/sessionDraw/type/openai/OpenAiParamForm";
  import DrawTaskShowList from "@/views/pages/sessionDraw/components/DrawTaskShowList";
  import SdParamForm from "@/views/pages/sessionDraw/type/sd/SdParamForm";
  import MjParamForm from "@/views/pages/sessionDraw/type/mj/MjParamForm";

  export default {
    name: "SessionDrawIndex",
    components: {MjParamForm, SdParamForm, DrawTaskShowList, OpenAiParamForm },
    props:{
      type: { type:String, default: 'sd' },
      prompt: { type:String, default: null },
    },
    data(){
      return{
        tabItem: [
          { value: 'sd',label: 'Stable Diffusion画图' },
          { value: 'mj',label: 'Midjourney画图' },
          { value: 'openai',label: 'OpenAi' },
        ],
        status: false,
        tabValue: '',
        isLogin: !!getToken()
      }
    },
    mounted() {
      this.tabsChange(this.tabItem[0].value)
    },
    methods:{
      tabsChange(val){
        if (this.tabValue === val){
          return
        }
        this.status = false
        setTimeout(() => {
          this.tabValue = val;
          this.status = true
        },50)
      },
      /**
       * 表单提交回调
       */
      submitFormCallBack(){
        this.$refs.drawTaskShowList.getTaskList()
      }
    }
  }
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  color: var(--font-color-default);
}
.param-form{
  width: 22%;
  height: 100%;
  background: var(--session-list-background);
  border-right: 1px var(--col-border-color) solid;
}
.param-form h2{
  font-size: 20px;
  text-align: center;
  padding: 15px 5px;
}
.right-content{
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.draw-show{
  flex: 1;
  height: 100%;
  width: 100%;
}

  .top-selected{
    display: grid;
    justify-items: center;
    align-items: center;
    padding: 16px 0;
  }
</style>
