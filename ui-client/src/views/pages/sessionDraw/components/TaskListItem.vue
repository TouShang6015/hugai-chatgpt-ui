<template>
  <div>
    <div class="taskListItem" @click="handleItemClick">
      <div class="img-content">
        <div class="img-box">
          <el-image :src="staticUrl + itemData.showImg" lazy>
            <div slot="error" class="image-slot">
              <img :src="require('/src/assets/imgs/loadingError.png')" v-if="itemData.taskStatus !== 'WAIT'" alt="">
              <img :src="require('/src/assets/imgs/loading.png')" v-if="itemData.taskStatus === 'WAIT'" alt="">
            </div>
          </el-image>
        </div>
      </div>
      <div class="description">
        <div class="item">
          <span>任务状态</span>
          <span class="taskStatus bgc-blue" v-if="itemData.taskStatus === 'WAIT'">待执行</span>
          <span class="taskStatus bgc-blue" v-if="itemData.taskStatus === 'RUNNING'">进行中</span>
          <span class="taskStatus bgc-green" v-if="itemData.taskStatus === 'SUCCESS'">已完成</span>
          <span class="taskStatus bgc-red" v-if="itemData.taskStatus === 'FAIL'">失败</span>
        </div>
        <div class="item">
          <span>开始时间</span>
          <span class="time">{{itemData.createTime}}</span>
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
    name: "TaskListItem",
    props: {
      itemData: { type: Object, required: true }
    },
    data(){
      return{
        staticUrl: this.$store.getters.configMain.staticWebsite
      }
    },
    created() {
    },
    methods:{
      handleItemClick(){
        this.$emit('click',this.itemData)
      },
    }
  }
</script>

<style scoped>
.taskListItem{
  width: 230px;
  height: 310px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 20px 10px;
  border: 1px var(--draw-task-list-item-border-color) solid;
  border-radius: 5px;
  transition: all 0.2s ease-out;
}
.taskListItem:hover{
  border: 1px var(--item-border-hover-color) solid;
}

  .img-content{
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--draw-task-list-item-content-background);
    border-radius: 5px;
  }

  .img-box{
    width: 95%;
    height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
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
}
.description .item{
  margin: 5px 0;
}
.description .item span{
  margin: 3px 5px;
}
.description .item .time{
  color: var(--font-color-default);
  opacity: 0.7;
}
.description .taskStatus{
  padding: 1px 10px;
  text-align: center;
  border-radius: 20px;
  font-size: 12px;
}


  ::v-deep .el-image{
    display: inline-flex;
    max-width: 100%;
    max-height: 100%;
  }
</style>
