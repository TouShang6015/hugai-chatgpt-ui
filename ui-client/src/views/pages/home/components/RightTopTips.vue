<template>
  <div class="rightTopTips">
    <div class="mainTip">
      <span class="iconfont icon-linkedin-01 promotion pointer" @click="openState = !openState"></span>
    </div>
    <div class="select-item" :class="{hiddenStatus: openState}">
      <div class="item">
        <el-tooltip content="常见问题/帮助" placement="left">
          <span class="iconfont icon-guanyu pointer" @click="goIndex('/other/help')"></span>
        </el-tooltip>
      </div>
      <div class="item">
        <el-tooltip content="常见问题/帮助" placement="left">
          <span class="iconfont icon-guanyu pointer" @click="goIndex('/other/help')"></span>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RightTopTips",
        data(){
            return{
                openState: true
            }
        },
        methods:{
          goIndex(url){
              this.$router.push(url)
          }
        }
    }
</script>

<style scoped lang="scss">
  .rightTopTips {
    position: absolute;
    width: auto;
    height: auto;
    right: 3%;
    top: 4%;
  }

  .mainTip{
    transition: all 0.12s ease-out;
  }
  ::v-deep .mainTip .iconfont{
    font-size: 35px !important;
  }
  .mainTip:active{
    transform: scale(0.88);
  }

  .select-item{
    width: 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease-out;

    .item{
      width: 100%;
      padding: 0;
      margin: 12px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      ::v-deep .iconfont{
        font-size: 35px;
      }
    }
  }
  .select-item.hiddenStatus{
    height: 0;
    transform: translateY(100%);
    transition-property: all;
  }



  @keyframes blink {
    0% {
      color: var(--item-border-hover-color);
    }
    50% {
      color: var(--item-border-default-color);
    }
    100% {
      color: var(--item-border-hover-color);
    }
  }
  @keyframes bigAndSmall {
    0% { font-size: 30px; }
    50% { font-size: 28px; }
    100% { font-size: 30px; }
  }
  .promotion {
    font-size: 30px !important;
    animation: blink 3s infinite;
  }
</style>