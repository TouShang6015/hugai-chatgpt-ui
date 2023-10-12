<template>
  <div class="account" @click="cancel">
    <div class="content" @click.stop>
      <DialogTopClose></DialogTopClose>
      <div class="top">
        <a-tabs :value="tabValue" :tab-item="tabItem" theme="simple" width="25%" @change="handleTabsChange"></a-tabs>
      </div>
      <div class="card-content">
        <ComponentUserInfo v-if="tabValue === '1'"></ComponentUserInfo>
      </div>
    </div>
  </div>
</template>

<script>
  import ComponentUserInfo from "@/views/account/ComponentUserInfo";
  export default {
    name: "AccountIndex",
    components: {ComponentUserInfo},
    data(){
      return{
        tabValue: '1',
        tabItem: [
          {value: '1', label: "个人信息", route: ''},
        ],
      }
    },
    methods:{
      handleTabsChange(val){
        this.tabValue = val;
      },
      cancel(){
        this.$store.commit('CLEAR_DIALOG')
      }
    }
  }
</script>

<style scoped lang="scss">
  .account {
    position: absolute;
    backdrop-filter: blur(1px);
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content{
    margin-top: -8%;
    width: 45%;
    min-height: 250px;
    background: var(--dialog-background);
    border-radius: 10px;
    box-shadow: var(--dialog-box-shadow);
  }
  .card-content{
    padding: 10px 20px;
  }
</style>
