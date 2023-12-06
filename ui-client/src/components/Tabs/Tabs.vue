<template>
  <div class="a-tabs rounded-md" :class="theme" :style="{
           width: width
         }">
    <div class="a-tabs-item pointer rounded-md"
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
  const themes = {
    normal: 'normal',
    simple: 'simple',
    noBorder: 'noBorder'
  }

  export default {
    name: "a-tabs",
    props:{
      theme: { type: String , default: themes.normal},
      value: { type: String,required: true },
      tabItem: { type: Array,required: true },
      width: { type: String,default: '20%' },
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
        if (item.route !== ''){
          this.$router.push(item.route)
        }
        this.$emit('change',value)
      }
    }
  }
</script>

<style scoped lang="scss">

  .a-tabs{
    display: flex;
    padding: 2px;
    background: var(--tabs-background);
    color: var(--font-color-default);
    font-size: 14px;
  }
  .simple.a-tabs{
    background: rgba(0, 0, 0, 0.0);
  }
  .noBorder.a-tabs{
    background: rgba(0, 0, 0, 0.0);
  }

/* normal */
  .normal {
    .a-tabs-item{
      flex: 1;
      text-align: center;
      display: inline-block;
      padding: 4px 10px;
      margin: 2px;
      background: var(--tabs-background);
      transition: all 0.15s;
    }
    .a-tabs-item.active{
      color: var(--item-border-active-color);
      background: var(--tabs-active-background);
    }
  }

  /* simple */
  .simple {
    .a-tabs-item{
      flex: 1;
      text-align: center;
      display: inline-block;
      padding: 4px 12px;
      margin: 4px;
      border-radius: 0px;
      border-bottom: 3px solid var(--tabs-simple-background);
      transition: all 0.15s;
    }
    .a-tabs-item.active{
      color: var(--item-border-active-color);
      border-bottom: 3px solid var(--item-border-active-color);
    }
  }

  /* noBorder */
  .noBorder {
    .a-tabs-item{
      flex: 1;
      text-align: center;
      display: inline-block;
      padding: 4px 12px;
      margin: 4px;
      border-bottom: 0px solid var(--tabs-simple-background);
      transition: all 0.15s;
    }
    .a-tabs-item.active{
      color: var(--item-border-active-color);
      border-bottom: 0px solid var(--item-border-active-color);
    }
  }
</style>
