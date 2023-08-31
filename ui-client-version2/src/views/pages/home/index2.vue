<template>
  <div class="home">
    <div class="top-tabs">
      <a-tabs :value="tabsSelect" :tab-item="tabItem" theme="normal" @change="handleTabsChange"></a-tabs>
    </div>
    <div class="content">
      <HomeComponentsChat v-if="tabsSelect === '1'"></HomeComponentsChat>
    </div>
  </div>
</template>

<script>
  import HomeComponentsChat from "@/views/pages/home/components/HomeComponentsChat";

  export default {
    name: "HomeIndex",
    components: {HomeComponentsChat},
    data() {
      return {
        tabsSelect: undefined,
        tabItem: [
          {value: '1', label: "问答", route: ''},
          {value: '2', label: "热门场景", route: ''},
          {value: '3', label: "创作", route: ''},
        ]
      }
    },
    created() {
      this.tabsSelect = '1'
    },
    methods: {
      handleTabsChange(val){
        this.tabsSelect = val;
      }
    }
  }
</script>

<style scoped lang="scss">
  .home{
    width: 100%;
    height: 100%;
    display: flex;
    justify-items: flex-start;
    flex-direction: column;
  }
  .top-tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
  }
  .content{
    flex: 1;
    width: 100%;
    height: 100%;
  }
</style>
