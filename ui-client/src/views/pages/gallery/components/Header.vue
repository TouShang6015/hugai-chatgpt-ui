<template>
  <div class="gallery-header-main">
    <div
            v-for="item in headConfig"
            class="item pointer"
            :class="{ active: item.key === value }"
            :key="item.key"
            @click="headTabClick(item)">
      <span class="rounded-md">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GalleryHeader",
    data(){
      return{
        value: undefined,
        headConfig: [
          { key: 1, title: '画廊广场',action: 'change' },
          { key: 2, title: '我的',action: 'change' },
        ]
      }
    },
    created() {
      this.headTabClick(this.headConfig[0])
    },
    methods: {
      headTabClick(item){
        this.value = item.key
        this.$emit(item.action,item.key)
      }
    }
  }
</script>

<style scoped lang="scss">
.gallery-header-main{
  flex: 0 0 5%;
  background: var(--aside-background);
  display: flex;
  justify-content: center;
  align-items: center;
  .item{
    min-width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 6px);
    border-bottom: 3px rgba(255, 255, 255, 0.0) solid;
    margin: 0 15px;
    transition: all 0.2s ease-in;

    span{
      width: auto;
      color: var(--font-color-default);
      font-size: 20px;
      padding: 5px 15px;
      transition: all 0.3s ease;
    }

    &:hover{
      span{
        color: var(--item-border-hover-color);
        background: var(--item-border-normal-color);
        transition: all 0.3s ease;
      }
    }
  }

  .item.active{
    border-bottom: 3px var(--item-border-active-color) solid;
    span{
      color: var(--item-border-active-color);
      transition: all 0.3s ease-in;
    }
  }
}
</style>
