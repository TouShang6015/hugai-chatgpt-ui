<template>
  <div class="main">
    <el-tooltip content="复制" effect="light" placement="top">
      <img :src="require('/src/assets/imgs/copy.png')" alt="" @click="$copy(value, '已复制')">
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    name: "SessionCopy",
    props: {
      value: {type: String, required: true}
    },
    methods: {}
  }
</script>

<style scoped>
  .main {
    display: flex;
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 22px;
    height: 22px;
  }

  img:hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px 2px rgb(70, 87, 102);
  }

</style>
