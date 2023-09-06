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
    width: 0;
    display: flex;
    flex-direction: column;
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
    width: 110px;
    height: 125px;
    margin: 10px;
  }

  .item:hover {
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 5px 5px 15px 10px rgba(255, 255, 255, 0.6) inset;
  }

  ::v-deep .item .el-image {
    width: 55%;
    height: 70%;
    top: 0;
    z-index: 0;
  }

  .item span {
    width: 100%;
    height: auto;
    color: white;
    text-align: center;
  }
</style>
