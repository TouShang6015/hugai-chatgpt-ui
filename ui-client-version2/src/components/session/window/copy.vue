<template>
  <div class="main">
    <el-tooltip content="复制" effect="light" placement="top">
      <div class="copy">
        <img :src="require('/src/assets/imgs/copy.png')" alt="" @click="$copy(value, '已复制')">
      </div>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    name: "copy",
    props: {
      value: { type: String, required: true }
    },
    methods:{

    }
  }
</script>

<style scoped>
  .main{
    display: flex;
  }
img{
  width: 22px;
  height: 22px;
}
  .copy {
    display: flex;
    padding-left: 8px;
  }

  .copy:hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px 0px rgb(70, 87, 102);
    border-radius: 50%;
  }

</style>
