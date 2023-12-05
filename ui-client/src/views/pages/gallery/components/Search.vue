<template>
  <div class="gallery-search-main">
    <div class="input">
      <el-input prefix-icon="el-icon-search" v-model="inputValue" placeholder="请输入搜索内容"></el-input>
    </div>
    <div class="button">
      <button class="btn">搜索</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GallerySearch",
    data(){
      return{
        inputValue: null,
      }
    }
  }
</script>

<style scoped lang="scss">
.gallery-search-main{
  flex: 0 0 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .input{
    width: 25%;
  }
}

/* input */
::v-deep .el-input__inner{
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.09);
  color: white;
  border: 1px solid #acacac;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  height: 40px;
  line-height: 45px;
}

::v-deep .el-input input:hover{
  border: 1px var(--item-border-normal-color) solid;
}
::v-deep .el-input input:focus{
  border: 1px var(--item-border-normal-color) solid;
}

/* 按钮 */
::v-deep .btn{
  margin: 0 15px;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 16px;
  letter-spacing: 0.1rem;
  transition: all 0.1s linear;
}
::v-deep .el-input--prefix .el-input__inner {
  padding-left: 40px;
}
::v-deep .el-input__prefix{
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
