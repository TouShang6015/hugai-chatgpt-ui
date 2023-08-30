<template>
  <div class="tab-index">
    <div class="title">
      <h1>Hug Ai</h1>
    </div>
    <div class="center-content">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
  export default {
    name: "TabIndex1"
  }
</script>

<style scoped lang="scss">
  .tab-index{
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
  }

  .item{
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
  }

  .title{
    display: flex;
    justify-content: center;
    padding: 25px;
  }
  h1{
    font-size: 40px;
    align-items: center;
  }
  .center-content{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
  }
  .bottom{
  }
</style>
