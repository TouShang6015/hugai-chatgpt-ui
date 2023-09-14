<template>
  <div class="themeMain">
    <div class="theme-item">
      <h3>主题</h3>
      <li class="pointer" v-for="(item,index) in themes" :class="{active: theme === item.name}" @click="changeTheme(item.name)" :key="index">
        <span class="iconfont" :class="item.icon"></span>
      </li>
    </div>
  </div>
</template>

<script>
  const themes = [
    {name: 'theme-blue',icon: 'icon-rain'},
    // {name: 'theme-dark',icon: 'icon-yejianmoshi'},
    // {name: 'theme-light',icon: 'icon-mingliangmoshi'},
  ]

  export default {
    name: "ComponentsTheme",
    data() {
      return {
        themes,
        theme: this.$store.state.settings.theme
      }
    },
    watch:{
      '$store.state.settings.theme':{
        handler:function (val) {
          this.theme = val
        }
      }
    },
    methods:{
      changeTheme(theme){
        this.$store.commit('SET_SETTING_ITEM',{key: 'theme',value: theme})
        this.$store.commit('GET_THEME')
      }
    }
  }
</script>

<style scoped>
  .themeMain {
  }

  .theme-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 0;
  }

  .theme-item h3 {
    width: 120px;
    align-items: center;
    text-align: center;
    font-size: 18px;
  }

  .theme-item li {
    padding: 0 16px;
  }

  .theme-item li .iconfont {
    padding: 2px 4px;
    border: 1px var(--item-border-default-color) solid;
    border-radius: 4px;
  }
  .theme-item li.active .iconfont{
    border: 1px var(--item-border-active-color) solid;
    box-shadow: 0 0 5px 1px var(--item-border-active-color) inset;
  }

  .theme-item li .iconfont:hover {
    border: 1px var(--item-border-active-color) solid;
    box-shadow: 0 0 5px 1px var(--item-border-active-color) inset;
  }
</style>
