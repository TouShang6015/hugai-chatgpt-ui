<template>
  <div class="main">
    <transition name="web-fade">
      <div class="param-form">
        <h2 v-for="item in tabItem" :key="item.value" v-show="item.value === tabValue">{{item.label}}</h2>
        <OpenAiParamForm  v-if="tabValue === '1'"></OpenAiParamForm>
      </div>
    </transition>
    <div class="right-content">
      <div class="top-selected">
        <a-tabs :value="tabValue" :tab-item="tabItem" @change="tabsChange"></a-tabs>
      </div>
      <transition name="web-fade">
        <OpenaiIndex v-if="tabValue === '1'"></OpenaiIndex>
      </transition>
    </div>
  </div>
</template>

<script>
  import OpenaiIndex from "/src/views/pages/sessionDraw/type/openai/index";
  import {getToken} from "@/utils/auth";
  import OpenAiParamForm from "@/views/pages/sessionDraw/type/openai/OpenAiParamForm";

  export default {
    name: "SessionDrawIndex",
    components: {OpenAiParamForm, OpenaiIndex },
    data(){
      return{
        tabItem: [
          { value: '1',label: 'OpenAi' },
          { value: '2',label: '敬请期待' },
        ],
        tabValue: '',
        isLogin: !!getToken()
      }
    },
    mounted() {
      this.tabValue = '1';
    },
    methods:{
      tabsChange(val){
        this.tabValue = val;
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
}
.param-form h2{
  font-size: 20px;
  text-align: center;
  padding: 15px 5px;
}
.right-content{
  flex: 1;
}
  .top-selected{
    display: grid;
    justify-items: center;
    align-items: center;
    padding: 20px 0;
  }
</style>
