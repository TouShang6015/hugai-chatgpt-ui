<template>
  <div class="desk" v-if="state">
    <div class="item" v-on:dblclick="handleItemGo($event,item)" v-for="(item,index) in itemDataList" :key="index">
      <el-image lazy :src="staticUrl + item.iconPath" fit="contain" draggable="false"></el-image>
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>

  export default {
    name: "DeskItem",
    props: {
      itemDataList: {
        type: Array,
        required: true
      },
      state: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return {
        staticUrl: this.$store.getters.configMain.staticWebsite
      }
    },
    methods: {
      handleItemGo(event, item) {
        this.$router.push(item.path)
      },
      viewsStaticImg(path) {
        return require(`@/assets/imgs/desk/${path}`);
      }
    }
  }
</script>

<style scoped>
  .desk {
    width: 85%;
    height: 800px;
    max-height: 800px;
    flex-direction: row;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
  }

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    min-width: 120px;
    height: 110px;
    margin: 5px;
    border: 1px var(--draw-task-list-item-border-color) solid;
    border-radius: 8px;
  }

  .item:hover {
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0px 0px 5px 1px var(--item-border-hover-color) inset;
  }

  ::v-deep .item .el-image {
    width: 40%;
    height: 55%;
    top: 0;
    z-index: 0;
  }

  .item span {
    width: 100%;
    height: auto;
    color: var(--font-color-default);
    text-align: center;
    font-size: 14px;
  }
</style>
