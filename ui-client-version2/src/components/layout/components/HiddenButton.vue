<template>
  <div class="hidden-button" :class="{hiddenStatus: hiddenStatus}">
    <span class="pointer iconfont " :class="hiddenStatus ? 'icon-zhankai-01' : 'icon-zhedie-01'" @click="hiddenLeft"></span>
  </div>
</template>

<script>
  export default {
    name: "HiddenButton",
    data() {
      return {
        hiddenStatus: this.$store.state.settings.hiddenStatusLeft
      }
    },
    methods: {
      hiddenLeft() {
        this.hiddenStatus = !this.hiddenStatus
        const settings = this.$store.state.settings;
        settings.hiddenStatusLeft = this.hiddenStatus
        this.$store.state.settings.hiddenStatusLeft = this.hiddenStatus
        this.$cache.local.set("layout-setting", JSON.stringify(settings));
      }
    }
  }
</script>

<style scoped lang="scss">


  .hidden-button{
    width: auto;
    height: auto;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
    margin-left: -26px;
    z-index: 1;
  }
  .hidden-button span{
    display: block;
    padding: 16px 4px;
    border-radius: 0 8px 8px 0;
    background: var(--aside-color);
    color: white;
    font-size: 18px;
  }
  .hidden-button span:hover{
    box-shadow: 0px 0px 1px 1px var(--aside-color);
  }

  .hidden-button.hiddenStatus {
    margin-left: 0px;
  }

</style>
