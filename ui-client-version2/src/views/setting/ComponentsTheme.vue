<template>
  <div class="themeMain">
    <div class="theme-item">
      <h3>主题</h3>
      <li class="pointer" :class="{active: theme === themes[0]}">
        <span class="iconfont icon-rain"></span>
      </li>
      <li class="pointer" :class="{active: theme === themes[1]}">
        <span class="iconfont icon-yejianmoshi"></span>
      </li>
      <li class="pointer" :class="{active: theme === themes[2]}">
        <span class="iconfont icon-mingliangmoshi"></span>
      </li>
    </div>
  </div>
</template>

<script>
  const themes = [
    'theme-blue',
    'theme-dark',
    'theme-light',
  ]

  export default {
    name: "ComponentsTheme",
    data() {
      return {
        themes,
        theme: this.$store.state.settings.theme
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
    font-size: 22px;
  }

  .theme-item li {
    padding: 0 16px;
  }

  .theme-item li .iconfont {
    color: var(--font-default-color);
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
