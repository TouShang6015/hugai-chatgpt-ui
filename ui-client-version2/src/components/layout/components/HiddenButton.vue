<template>
  <div class="hidden-button" :class="{hiddenStatus: hiddenStatus}">
    <span class="pointer" @click="hiddenLeft">{{hiddenStatus ? '>' : '<'}}</span>
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
  @import "/src/assets/css/theme.scss";

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
  }
  .hidden-button span{
    display: block;
    padding: 20px 4px;
    border-radius: 0 8px 8px 0;
    background: $theme-blue-aside-color;
    color: white;
  }
  .hidden-button span:hover{
    box-shadow: 0px 0px 1px 1px $theme-blue-aside-color;
  }

</style>
