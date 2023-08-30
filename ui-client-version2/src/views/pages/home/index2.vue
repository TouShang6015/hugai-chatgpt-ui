<template>
  <div class="home">
    <div class="top-tabs">
      <tabs :value="tabsSelect" :tab-item="tabItem" theme="normal"></tabs>
    </div>
    <div class="content">
      <TabIndex1></TabIndex1>
    </div>
  </div>
</template>

<script>
  import Tabs from "@/components/Tabs/Tabs";
  import TabIndex1 from "@/views/pages/home/components/TabIndex1";

  export default {
    name: "Index2",
    components: {Tabs,TabIndex1},
    data() {
      return {
        tabsSelect: '1',
        tabItem: [
          {value: '1', label: "问答", route: ''},
          {value: '2', label: "热门场景", route: ''},
          {value: '3', label: "创作", route: ''},
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .top-tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
  }
</style>
