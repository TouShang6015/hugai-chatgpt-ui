<template>
  <div class="settings">
    <div class="content">
      <DialogTopClose></DialogTopClose>
      <div class="top">
        <a-tabs :value="tabValue" :tab-item="tabItem" theme="simple" @change="handleTabsChange"></a-tabs>
      </div>
      <div class="card-content">
        <ComponentsTheme v-if="tabValue === '1'"></ComponentsTheme>
      </div>
    </div>
  </div>
</template>

<script>
  import ComponentsTheme from "@/views/setting/ComponentsTheme";
  export default {
    name: "SettingsInd",
    components: {ComponentsTheme},
    data(){
      return{
        tabValue: '1',
        tabItem: [
          {value: '1', label: "主题", route: ''},
          {value: '2', label: "关于", route: ''},
        ]
      }
    },
    methods:{
      handleTabsChange(val){
        this.tabValue = val;
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
    color: var(--font-default-color);
  }
  .content{
    width: 35%;
    min-height: 250px;
    background: var(--dialog-background);
    border-radius: 10px;
    box-shadow: 5px 2px 0px 3px var(--aside-color);
  }
  .card-content{
    padding: 10px 20px;
  }
</style>
