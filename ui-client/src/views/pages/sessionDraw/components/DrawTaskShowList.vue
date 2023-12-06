<template>
  <div style="width: 100%;height: 100%;display: flex;">
    <div class="drawTaskListMain">
      <div class="handle-top rounded-md">
        <div class="top-item">
          <div class="left">
            <span class="rounded-md">当前任务：{{this.taskQueueData.runningCount == null ? '0' : this.taskQueueData.runningCount}}</span>
            <span class="rounded-md">排队中：{{this.taskQueueData.sum == null ? '0' : this.taskQueueData.sum}}</span>
          </div>
          <h2 class="pointer" @click="getTaskList">
            <span class="iconfont icon-shuaxin"></span>
            <span>刷新列表</span>
          </h2>
        </div>
      </div>
      <div class="list-page">
        <el-pagination
                v-if="total > 0"
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="pageChange"
        >
        </el-pagination>
      </div>
      <el-empty description="暂无任务" v-if="total === 0"></el-empty>

      <div class="task-content"  v-if="total > 0">
        <div class="content" v-if="drawType !== 'mj'">
          <TaskListItem
                  v-for="(item,index) in dataList"
                  :item-data="item"
                  :key="index"
                  @click="handleTaskItemClick(item)"
                  @flushList="getTaskList"
          ></TaskListItem>
        </div>
        <div class="content" v-if="drawType === 'mj'">
          <TaskListItemMJ
                  v-for="(item,index) in dataList"
                  :item-data="item"
                  :key="index"
                  @click="handleTaskItemClick(item)"
                  @flushList="getTaskList"
          ></TaskListItemMJ>
        </div>
      </div>
    </div>

    <div class="frame-detail" v-if="dialogState" @click="closeDialog">
      <transition name="web-dialog">
        <DialogDetailInfo v-if="dialogState"
                          :dialog-state="dialogState"
                          :session-info-draw-id="sessionInfoDrawId"
                          :prompt="itemPrompt"
                          :img-url="itemImg"
                          :platform="getPlatform()"
                          :draw-api-name="getDrawApiName()"
                          @close="closeDialog"
        ></DialogDetailInfo>
      </transition>
    </div>

    <transition name="web-dialog">
      <LoadingIframe width="80%" height="95%" v-if="loading"></LoadingIframe>
    </transition>

  </div>

</template>

<script>
  import TaskListItem from "@/views/pages/sessionDraw/components/TaskListItem";
  import {getToken} from "@/utils/auth";
  import DialogDetailInfo from "@/views/pages/sessionDraw/components/DialogDetailInfo";
  import TaskListItemMJ from "@/views/pages/sessionDraw/components/TaskListItemMJ";
  import DrawType from "@/common/constants/DrawType";
  import DrawApiKey from "@/common/constants/DrawApiKey";
  export default {
    name: "DrawTaskShowList",
    components: {TaskListItemMJ, DialogDetailInfo, TaskListItem},
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
        itemData: undefined,
        itemPrompt: '',
        itemImg: undefined,

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
        this.sessionInfoDrawId = item.sessionInfoDrawId
        this.itemData = JSON.parse(JSON.stringify(item))
        this.itemImg = this.itemData.showImg;
        if(this.itemData.requestParam != null){
          this.itemPrompt = JSON.parse(this.itemData.requestParam).prompt
        }
        this.dialogState = true;
      },
      closeDialog(){
        this.dialogState = false;
        this.sessionInfoDrawId = undefined;
        this.itemData = undefined;
      },
      getPlatform(){
        return DrawType[this.drawType.toUpperCase()];
      },
      getDrawApiName(){
        return DrawApiKey[this.itemData.drawApiKey];
      }
    }
  }
</script>

<style scoped lang="scss">
  .drawTaskListMain{
    width: 100%;
    height: 100%;
    max-height: 100%;

    .handle-top{
      height: 5%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-top: 1px var(--background-textarea) solid;
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
      padding: 4px 15px;
      background: var(--bkgy);
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
      box-sizing: border-box;
      width: 100%;
      height: 88%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .content{
        box-sizing: border-box;
        width: calc(100% - 20px);
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        white-space: nowrap;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        padding-left: 10px;
        overflow: auto;
        padding-bottom: 100px;
      }

    }

  }
  .list-page{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }

  .frame-detail{
    position: fixed;
    backdrop-filter: blur(1px);
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1501;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
