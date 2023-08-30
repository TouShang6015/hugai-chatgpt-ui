<template>
  <div class="settings">
    <div class="content">
      <div class="top">
        <ComponentTabs></ComponentTabs>
      </div>
    </div>
  </div>
</template>

<script>
  import ComponentTabs from "@/components/Tabs/Tabs";
  export default {
    name: "SettingsInd",
    components: {ComponentTabs},
    data(){
      return{
        tabValue: '1',
        tabItem: [
          {value: '1', label: "主题", route: ''},
        ]
      }
    }
  }
</script>

<style scoped>
  .settings {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
  }
  .content{

  }
</style>
