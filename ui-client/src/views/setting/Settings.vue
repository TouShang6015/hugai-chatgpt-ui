<template>
  <div class="settings">
    <div class="content">
      <DialogTopClose></DialogTopClose>
      <div class="top">
        <a-tabs :value="tabValue" :tab-item="tabItem" theme="simple" @change="handleTabsChange"></a-tabs>
      </div>
      <div class="card-content">
        <ComponentsTheme v-if="tabValue === '1'"></ComponentsTheme>
        <ComponentsOther v-if="tabValue === '2'" :data-info="dataInfo" :request-count="requestCount"></ComponentsOther>
      </div>
    </div>
  </div>
</template>

<script>
  import ComponentsTheme from "@/views/setting/ComponentsTheme";
  import ComponentsOther from "@/views/setting/ComponentsOther";
  export default {
    name: "SettingsInd",
    components: {ComponentsOther, ComponentsTheme},
    data(){
      return{
        tabValue: '1',
        tabItem: [
          {value: '1', label: "主题", route: ''},
          {value: '2', label: "关于", route: ''},
        ],
        dataInfo: {},
        requestCount: 0,
      }
    },
    created() {
      this.getSettingInfo();
    },
    mounted() {

    },
    methods:{
      handleTabsChange(val){
        this.tabValue = val;
      },
      getSettingInfo(){
        this.$api.get('/module/statistics/getSettingInfo').then(res => {
          if (res.status){
            this.dataInfo = res.data.info;
            this.requestCount = res.data.requestCount;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .settings {
    position: absolute;
    backdrop-filter: blur(1px);
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--font-color-default);
  }
  .content{
    width: 35%;
    min-height: 250px;
    background: var(--dialog-background);
    border-radius: 10px;
    box-shadow: var(--dialog-box-shadow);
  }
  .card-content{
    padding: 10px 20px;
  }
</style>
