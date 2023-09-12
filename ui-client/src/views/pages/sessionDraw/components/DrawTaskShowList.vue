<template>
  <div style="width: 100%;height: 100%;display: flex;">
    <div class="drawTaskListMain">
      <div class="handle-top">
        <div class="top-item">
          <div class="left">
            <span>当前任务数量：{{this.taskQueueData.taskSize == null ? '空闲的' : this.taskQueueData.taskSize}}</span>
            <span>我的任务：{{this.taskQueueData.userIndex == null ? '暂无任务' : '第' + this.taskQueueData.userIndex + '位'}}</span>
          </div>
          <h2 class="pointer" @click="getTaskList">
            <span class="iconfont icon-shuaxin"></span>
            <span>刷新列表</span>
          </h2>
        </div>
      </div>
      <el-empty description="暂无任务" v-if="total === 0"></el-empty>

      <div class="task-content"  v-if="total > 0">
        <div class="content">
          <TaskListItem v-for="(item,index) in dataList" :item-data="item" :key="index" @click="handleTaskItemClick"></TaskListItem>
        </div>
        <div class="bottom-page">
          <el-pagination
                  v-if="total > 0"
                  background
                  layout="prev, pager, next"
                  :total="total"
                  @current-change="pageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <transition name="web-dialog">
      <DialogDetailInfo v-if="dialogState" :dialog-state="dialogState" :session-info-draw-id="sessionInfoDrawId" @close="closeDialog"></DialogDetailInfo>
    </transition>

    <transition name="web-dialog">
      <LoadingIframe width="80%" height="95%" v-if="loading"></LoadingIframe>
    </transition>

  </div>

</template>

<script>
  import TaskListItem from "@/views/pages/sessionDraw/components/TaskListItem";
  import {getToken} from "@/utils/auth";
  import DialogDetailInfo from "@/views/pages/sessionDraw/components/DialogDetailInfo";
  export default {
    name: "DrawTaskShowList",
    components: {DialogDetailInfo, TaskListItem},
    props:{
      drawType: { type: String, required: true }
    },
    data(){
      return{
        isLogin: !!getToken(),
        drawTypeKey: this.drawType,
        loading: false,

        dialogState: false,
        sessionInfoDrawId: undefined,

        queryParam: {
          page: 1
        },
        taskQueueData: {},
        dataList: [],
        total: 0
      }
    },
    created() {
    },
    mounted() {
      if (this.isLogin){
        this.getTaskList()
      }
    },
    methods:{
      getTaskList(){
        this.loading = true;
        this.$api.get('/module/draw/task/userTaskList/' + this.drawTypeKey,this.queryParam).then(res => {
          if (res.status){
            this.dataList = res.data
            this.total = res.total
          }else{
            this.$message.error(res.message)
          }
          this.loading = false
          this.getTaskQueue()
        })
      },
      getTaskQueue(){
        this.$api.get('/module/draw/task/getTaskDetail/' + this.drawTypeKey).then(res => {
          this.taskQueueData = res.data
        })
      },
      pageChange(val){
        this.queryParam.page = val;
        this.getTaskList()
      },
      handleTaskItemClick(item){
        if (item == null || item.sessionInfoDrawId == null){
          console.log("任务未完成，没有数据信息")
          return
        }
        this.dialogState = true;
        this.sessionInfoDrawId = item.sessionInfoDrawId
      },
      closeDialog(){
        this.dialogState = false;
        this.sessionInfoDrawId = undefined;
      }
    }
  }
</script>

<style scoped lang="scss">
  .drawTaskListMain{
    width: 100%;
    height: 100%;

    .handle-top{
      height: 5%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-top: 1px var(--background-textarea) solid;
      border-radius: 5px;
    }
    .top-item{
      width: calc(100% - 35px);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      margin-right: 35px;
    }
    .top-item .left{
      width: 82%;
      margin-left: 35px;
    }
    .top-item .left span{
      font-size: 14px;
      border-radius: 20px;
      padding: 4px 15px;
      background: var(--draw-task-list-item-border-color);
    }
    .top-item span{
      margin: 0 15px;
    }
    .top-item h2{

      span{
        font-size: 18px;
        color: var(--item-border-hover-color);
        margin: 0 3px;
        transition: all 0.3s ease-in-out;
      }

      &:hover{
        span{
          color: var(--item-border-active-color);
          transform: scale(1.1);
        }
      }

    }


    .task-content{
      width: 100%;
      max-height: 80%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      overflow: auto;

      .content{
        width: calc(100% - 20px);
        height: 80%;
        max-height: 80%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 20px;
        overflow: auto;
      }

      .bottom-page{
        flex: 1;
        position: fixed;
        bottom: 1%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 25%;
      }

    }

  }

</style>
