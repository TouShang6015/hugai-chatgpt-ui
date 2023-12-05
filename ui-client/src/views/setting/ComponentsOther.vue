<template>
  <div class="settingComponentsOther">
    <div class="logo">
      <img :src="require('/src/assets/imgs/logo2.png')" alt="">
    </div>
    <div class="content-text">
      <div class="setting-item" style="color: var(--item-border-active-color)">
        <h3>当前版本：</h3>
        <span>{{$store.state.webConfig.resourceMain.projectVersion}}</span>
      </div>
      <div class="setting-item">
        <h3>已运行天数：</h3>
        <span>{{dataInfo.runDay}} Day</span>
      </div>
      <div class="setting-item">
        <h3>总访问次数：</h3>
        <span>{{requestCount}}</span>
      </div>
      <div class="setting-item">
        <h3>会员数：</h3>
        <span>{{dataInfo.userCount}}</span>
        <div style="width: 20%"></div>
        <h3>游客数：</h3>
        <span>{{dataInfo.touristCount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ComponentsOther",
    props:{
      dataInfo: { type: Object, required: true },
      requestCount: { type: Number, required: true },
    },
    data(){
      return {
      }
    },
  }
</script>

<style scoped>
  .settingComponentsOther .logo{
    display: flex;
    justify-content: center;
    align-items: center;
  }
.settingComponentsOther .logo img{
  width: 30%;
}

.settingComponentsOther .content-text{
  padding: 20px;
}

  .setting-item{
    color: var(--font-color-no-normal);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 12px 0;
  }
  .setting-item h3{
    width: 120px;
    font-size: 17px;
    padding: 0 15px;
  }
</style>
