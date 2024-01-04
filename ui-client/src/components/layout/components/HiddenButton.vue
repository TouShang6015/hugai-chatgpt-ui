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
        this.$store.commit('SET_SETTING_ITEM',{key: 'hiddenStatusLeft',value: this.hiddenStatus})
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
    margin-top: 1px;
    top: 0;
    right: 0;
    margin-right: 0px;
    z-index: 1;
    transition: width 0.2s;
  }
  .hidden-button span{
    display: block;
    padding: 10px 4px;
    border-radius: 0 8px 8px 0;
    background: var(--aside-background);
    color: var(--font-color-default);
    font-size: 16px;
  }
  .hidden-button span:hover{
    box-shadow: 0px 0px 1px 1px var(--aside-background);
  }

  .hidden-button.hiddenStatus {
  }

</style>
