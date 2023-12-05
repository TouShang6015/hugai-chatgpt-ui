<template>
  <div class="imageMassGroup">
    <div class="img-item pointer rounded-md"
         v-for="(item,index) in config"
         :class="{active: item.key === value}"
         :key="index"
         @click="handleImgItemClick(item)">
      <el-tooltip :content="item.tips" :placement="placement" effect="light">
        <div class="img-item-span">
          <span>{{item.content}}</span>
          <span>{{item.content2}}</span>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ImageMassGroup",
    props:{
      config: { type: Array, required: true },
      placement: { type: String, default: '' },
      defaultConfigIndex: { type: Number ,default: 0 }
    },
    data(){
      return{
        value: undefined
      }
    },
    mounted() {
      this.handleImgItemClick(this.config[this.defaultConfigIndex])
    },
    methods:{
      handleImgItemClick(item){
        this.value = item.key
        this.$emit('change',item)
      }
    }
  }
</script>

<style scoped>
.imageMassGroup{
  width: 100%;
  height: auto;
  display: flex;
  justify-items: flex-start;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
  .imageMassGroup .img-item{
    min-width: 40px;
    max-width: 80px;
    height: 60px;
    margin: 4px 4px;
    border: 2px var(--item-border-default-color) solid;
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    text-align: center;
  }
.imageMassGroup .img-item:hover{
  border: 2px var(--item-border-hover-color) solid;
}
.imageMassGroup .img-item.active{
  border: 2px var(--item-border-active-color) solid;
  box-shadow: 0px 0px 2px 1px var(--item-border-active-color);

}

.imageMassGroup .img-item-span{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.imageMassGroup .img-item-span span{
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
}

  ::v-deep .el-form-item__content {
    line-height: 0px;
    font-size: 14px;
  }
</style>
