<template>
  <div class="userInfoRight">
    <div style="margin: 0px 15px 15px 0">
      <a-tabs :value="tabsValue" :width="'35%'" :tab-item="tabsConfig" theme="simple" @change="tabsChange"></a-tabs>
    </div>
    <div class="right-content">
      <transition-group name="fade-list">
        <components-user-base-info :key="tabsValue"></components-user-base-info>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import ComponentsUserBaseInfo from "@/views/pages/user/userHome/components/ComponentsUserBaseInfo";
  export default {
    name: "UserInfoRight",
    components: {ComponentsUserBaseInfo},
    data(){
      return{
        tabsValue: undefined,
        tabsConfig: [
          { value: '1', label: '基础信息'},
        ]
      }
    },
    created() {
      this.tabsChange(this.tabsConfig[0].value)
    },
    methods:{
      tabsChange(val){
        this.tabsValue = val;
      }
    }
  }
</script>

<style scoped>
.userInfoRight{
  width: 95%;
  height: 90%;
  position: relative;
  overflow: auto;
  padding-left: 30px;
}
  .right-content{
    width: 96%;
    position: relative;
  }
</style>
