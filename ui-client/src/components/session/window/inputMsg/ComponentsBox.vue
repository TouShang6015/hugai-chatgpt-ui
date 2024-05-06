<template>
  <div class="main-box">
    <div class="item">
      <p>连续对话</p>
      <div class="item-content">
        <el-switch v-model="ifConc" active-value="1" inactive-value="0"></el-switch>
      </div>
    </div>
    <div class="item">
      <p>侧边栏开启</p>
      <div class="item-content">
        <el-switch v-model="hiddenStatus" :active-value="false" :inactive-value="true" @change="hiddenSessionStatus"></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ComponentsBox",
    data(){
      return{
        hiddenStatus: this.$store.state.settings.hiddenStatusSessionList,
        ifConc: this.$store.state.settings.ifConc,
      }
    },
    watch:{
      ifConc(val){
        this.flushIfConc();
      },
    },
    methods:{
      flushIfConc(){
        this.$emit('flushIfConc',this.ifConc)
        this.$store.commit('SET_SETTING_ITEM',{key: 'ifConc',value: this.ifConc})
      },
      hiddenSessionStatus() {
        this.$store.commit('SET_SETTING_ITEM',{key: 'hiddenStatusSessionList',value: this.hiddenStatus})
      }
    }
  }
</script>

<style scoped>
  .main-box{
    padding: 5px 10px;
  }
.item{
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin: 15px 0px;
}
  .item p{
    width: 110px;
  }
  .item .item-content{
    flex: 1;
  }
</style>
