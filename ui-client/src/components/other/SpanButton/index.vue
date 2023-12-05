<template>
  <div class="span-button-main rounded-md" :class="color">
    <slot name="img"></slot>
    <el-tooltip :content="tipsContent" :placement="tipsPlacement">
      <span class="pointer">{{value}}</span>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    name: "SpanButton",
    props:{
      openTips: { type: Boolean,default: false },
      tipsContent: { type: String,default: '' },
      tipsPlacement: { type: String,default: 'right' },
      backgroundColor: { type: String,default: 'default' },
      imgUrl: { type: String,default: null },
      value: { type: String,default: 'default' },
      randomBkg: { type: Boolean, default: true }
    },
    data(){
      return{
        color: this.backgroundColor
      }
    },
    watch:{
      backgroundColor(val){
        this.color = val
      }
    },
    created() {
    },
    mounted() {
      if (this.randomBkg){
        this.getColor()
      }
    },
    methods:{
      getColor(){
        const colors = ['default','red','violet','yellow'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        this.color = colors[randomIndex];
      }
    }
  }
</script>

<style scoped lang="scss">
  .span-button-main{
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0 10px 5px;
    padding: 2px 12px 3px 12px;
    img{
      width: 16px;
      margin-right: 5px;
    }
    span{
      font-size: 16px;
      color: var(--span-button-font-color);
      font-weight: bold;
    }
  }

  .span-button-main.default{
    background: var(--span-button-bkg-default);
  }
  .span-button-main.red{
    background: var(--span-button-bkg-red);
  }
  .span-button-main.violet{
    background: var(--span-button-bkg-violet);
  }
  .span-button-main.yellow{
    background: var(--span-button-bkg-yellow);
  }
</style>
