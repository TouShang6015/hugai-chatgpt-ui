<template>
  <div class="a-tabs">
    <div class="a-tabs-item pointer"
         v-for="(item,index) in tabItem"
         :key="index"
         :class="{active: activeValue === item.value}"
         @click="handleTabItemClick(item)"
    >
      <span>{{item.label}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ComponentTabs",
    props:{
      value: { type: String,required: true },
      tabItem: { type: Array,required: true }
    },
    watch:{
      value(val){
        this.activeValue = val;
      }
    },
    data(){
      return{
        activeValue: this.value
      }
    },
    methods:{
      handleTabItemClick(item){
        let value = item.value;
        this.activeValue = value;
        this.$emit('tabItemChange',value)
      }
    }
  }
</script>

<style scoped lang="scss">
@import "/src/assets/css/theme.scss";
  .a-tabs{
    display: inline-table;
    padding: 2px;
    background: $theme-blue-tabs-background;
    border-radius: 8px;
    color: $theme-blue-font-default-color;
    font-size: 14px;
  }

  .a-tabs-item{
    display: inline-block;
    padding: 4px 10px;
    margin: 2px;
    background: $theme-blue-tabs-background;
    border-radius: 4px;
    transition: all 0.15s;
  }
.a-tabs-item.active{
  background: $theme-blue-tabs-active-background;
}
</style>
