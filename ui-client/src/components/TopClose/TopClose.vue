<template>
  <div class="head-info">
    <label @click="cancel">
<!--      <el-tooltip content="关闭" placement="top">-->
        <span class="iconfont icon-e_guanbi"></span>
<!--      </el-tooltip>-->
    </label>
  </div>
</template>

<script>
  export default {
    name: "DialogTopClose",
    props:{
      ifGlobal: { type: Boolean, default: true }
    },
    methods:{
      cancel(){
        this.$emit('cancel')
        if (this.ifGlobal){
          this.$store.commit('CLEAR_DIALOG')
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  .head-info {
    position: relative;
    padding: 5px 0;
    text-align: center;
    font-weight: 600;
    font-size: 2em;
    height: 38px;
    border-top-left-radius: 10px;
    -webkit-border-top-left-radius: 10px;
    -moz-border-top-left-radius: 10px;
    -o-border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    -webkit-border-top-right-radius: 10px;
    -moz-border-top-right-radius: 10px;
    -o-border-top-right-radius: 10 p;
  }

  .head-info label {
    width: 28px;
    height: 28px;
    display: block;
    float: right;
    border-radius: 50%;
    margin: 5px 10px 0 0;
  }
  .head-info label:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.1s ease-in-out;

    .iconfont{
      color: var(--item-border-hover-color);
    }
  }

  .head-info label span {
    display: block;
    position: relative;
    font-size: 20px;
    margin-top: 4px;
    color: var(--topclose-font-color);
  }

</style>
