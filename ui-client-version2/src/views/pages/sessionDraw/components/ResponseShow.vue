<template>
  <div class="response-show">
    <div class="show-ai">
      <span>Hug Ai 绘图助理</span>
      <img :src="require('/src/assets/imgs/robot2.png')" alt=""/>
    </div>
    <div class="show-content" v-if="dataList != null && dataList.length > 0">
      <div class="main-content">
        <div class="chat-corner"></div>
        <div v-for="item in dataList">
          <ImagePic :img-url="item"></ImagePic>
        </div>
      </div>
    </div>
    <div class="this-prompt" v-if="dataList != null && dataList.length > 0">
      <div class="prompt-content">
        <span class="description"></span>
        <span>{{userPrompt}}</span>
      </div>

    </div>
  </div>
</template>

<script>
  import ImagePic from "@/views/pages/sessionDraw/components/ImagePic";
  export default {
    name: "responseShow",
    components: { ImagePic },
    data(){
      return{
        dataList: [],
        userPrompt: ""
      }
    }
  }
</script>

<style scoped>
.response-show{
  width: 100%;
  min-height: 500px;
}
.show-ai{
  width: 100%;
  height: 50px;
  line-height: 50px;
  float: right;
  padding-right: 50px;
}
.show-ai img{
  width: 38px;
  height: 38px;
  float: right;
  padding: 0 12px;
}
.show-ai span{
  color: white;
  float: right;
}
  .show-content{
    position: relative;
    display: flex;
    margin-top: 50px;
    padding: 10px 25px;
    justify-content: center;
    align-items: center;
  }
  .show-content .main-content{
    position: relative;
    right: 0;
    max-width: 76%;
    border: 1px #e5e5e5 solid;
    border-radius: 20px 5px 20px 20px;
    background: #efefef;
    display: flex;
    padding: 10px;
  }

  .chat-corner{
    position: absolute;
    top: -8px;
    right: 0px;
    width: 20px;
    height: 20px;
    background-color: #efefef;
    transform: rotate(60deg);
    border-radius: 0px 12px 0 0;
  }

  .this-prompt{
    display: flex;
    justify-content: center;
    align-items: center;
  }

.this-prompt .prompt-content{
  width: 80%;
  border: 1px white solid;
  border-radius: 10px;
  padding: 20px 50px;
  color: white;
}

.this-prompt .description{
  color: white;
}

</style>
