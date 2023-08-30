<template>
  <div class="main-box">
    <div class="item">
      <p>连续对话</p>
      <div class="item-content">
        <el-switch v-model="ifConc"></el-switch>
      </div>
    </div>
    <div class="item">
      <p>侧边栏开启</p>
      <div class="item-content">
        <el-switch v-model="hiddenStatus"
                   :active-value="false"
                   :inactive-value="true"
                   @change="hiddenSessionStatus"></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ComponentsBox",
    props:{
      defaultIfConc: { type: Boolean, default: true }
    },
    data(){
      return{
        hiddenStatus: this.$store.state.settings.hiddenStatusSessionList,
        ifConc: this.defaultIfConc,
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
      },
      hiddenSessionStatus() {
        const settings = this.$store.state.settings;
        settings.hiddenStatusSessionList = this.hiddenStatus
        this.$store.state.settings.hiddenStatusSessionList = this.hiddenStatus
        this.$cache.local.set("layout-setting", JSON.stringify(settings));
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
