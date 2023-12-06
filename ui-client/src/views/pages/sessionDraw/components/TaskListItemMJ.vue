<template>
  <div class="taskList-main" @click="handleItemClick">
    <div class="taskListItem rounded-md">
      <div class="item-top-right" v-if="itemData.taskStatus === 'FAIL'">
        <span class="iconfont icon-delete-put-back tips pointer" @click="handleDeleteFailTask"></span>
      </div>
      <div class="img-content rounded-md">
        <div class="img-box">
          <el-image :src="staticUrl + itemData.showImg">
            <div slot="error" class="image-slot">
              <img :src="require('/src/assets/imgs/loadingError.png')" v-if="itemData.taskStatus === 'FAIL'" alt="">
              <img :src="require('/src/assets/imgs/loading.png')" v-if="itemData.taskStatus === 'WAIT'" alt="">
              <img :src="require('/src/assets/imgs/loading2.png')" v-if="itemData.taskStatus === 'RUNNING'" alt="">
            </div>
          </el-image>
        </div>
      </div>
      <div class="description">
        <div class="item" v-if="itemData.drawApiKey !== 'mj_u' && itemData.taskStatus === 'SUCCESS'">
          <li class="pointer rounded-md" v-for="index in 4" :key="index" @click="handleU(index)">
            图{{index}}
          </li>
        </div>
        <div class="item" v-if="itemData.drawApiKey !== 'mj_u' && itemData.taskStatus === 'SUCCESS'">
          <li class="pointer rounded-md" v-for="index in 4" :key="index" @click="handleV(index)">
            V{{index}}
          </li>
        </div>
        <div class="item">
          <span>状态</span>
          <span class="taskStatus bgc-blue rounded-md" v-if="itemData.taskStatus === 'WAIT'">待执行</span>
          <span class="taskStatus bgc-blue rounded-md" v-if="itemData.taskStatus === 'RUNNING'">进行中</span>
          <span class="taskStatus bgc-green rounded-md" v-if="itemData.taskStatus === 'SUCCESS'">已完成</span>
          <span class="taskStatus bgc-red rounded-md" v-if="itemData.taskStatus === 'FAIL'">失败</span>
        </div>
        <div class="item">
          <span>完成时间</span>
          <span class="time">{{itemData.taskEndTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TaskListItemMJ",
    props: {
      itemData: { type: Object, required: true }
    },
    data(){
      return{
        staticUrl: this.$store.getters.resourceMain.staticWebsite
      }
    },
    created() {
    },
    methods:{
      handleItemClick(){
        this.$emit('click',this.itemData)
      },
      handleU(index){
        const itemData = this.itemData;
        let param = {}
        param.originalTaskDrawId = itemData.id;
        param.index = index;
        param.drawType = "MJ";
        this.$api.post('/module/draw/task/createTask/mj_u',param).then(res =>{
          if (res.status){
            this.$message.success(res.message)
            this.$emit('flushList')
          }else{
            this.$message.warning(res.message)
          }
        })
      },
      handleV(index){
        const itemData = this.itemData;
        let param = {}
        param.originalTaskDrawId = itemData.id;
        param.index = index;
        param.drawType = "MJ";
        this.$api.post('/module/draw/task/createTask/mj_v',param).then(res =>{
          if (res.status){
            this.$message.success(res.message)
            this.$emit('flushList')
          }else{
            this.$message.warning(res.message)
          }
        })
      },
      handleDeleteFailTask(){
        this.$api.deleteRestful('/module/draw/task/baseDeleteByIds',this.itemData.id).then(res => {
          if (res.status){
            this.$emit('flushList')
            this.$message.success(res.message)
          }else{
            this.$message.error(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .taskList-main{
    width: 260px;
    height: 390px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    margin: 8px 8px;
  }
.taskListItem{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px var(--bkgy) solid;
  transition: all 0.2s ease-out;
  position: relative;
}
.taskListItem:hover{
  border: 1px var(--item-border-hover-color) solid;
}

  .img-content{
    width: 100%;
    height: 68%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--draw-task-list-item-content-background);
  }

  .img-box{
    width: 95%;
    height: 96%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-top-right{
    position: absolute;
    top: 10px;
    right: 4px;
  }

  .item-top-right .iconfont:hover{
    color: var(--item-border-hover-color);
  }
  .item-top-right:active{
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }
  .item-top-right .iconfont:active{
    color: var(--item-border-active-color);
  }

.description{
  flex: 1;
  background: var(--draw-task-list-item-bottom-background);
  border-radius: 0 0 5px 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  padding-left: 10px;
  padding-top: 5px;
}
.description .item{
  margin: 5px 0;
}
.description .item span{
  margin: 3px 5px;
}
  .description .item li{
    display: inline-block;
    background: var(--background-main);
    border: 1px var(--background-main) solid;
    padding: 4px 8px;
    margin: 0 5px;
    letter-spacing: 3px;
    word-spacing: 3px;
    width: 12%;
    transition: all 0.2s ease-out;
    text-align: center;
  }
  .description .item li:hover{
    border: 1px var(--item-border-hover-color) solid;
  }
  .description .item li:active{
    box-shadow: 0 0 5px 1px var(--item-border-active-color) inset;
  }
.description .item .time{
  color: var(--font-color-default);
  opacity: 0.7;
}
.description .taskStatus{
  padding: 1px 10px;
  text-align: center;
  font-size: 12px;
}


  ::v-deep .el-image{
    display: inline-flex;
    max-width: 100%;
    max-height: 100%;
  }
</style>
