<template>
  <div class="session-list">
    <div class="createSession pointer">
      <div @click="handleCreateSession">
        <span class="iconfont icon-add-01"></span>
        <span>新的对话</span>
      </div>
    </div>
    <div class="list-box">
      <div style="max-height: 700px">
        <transition-group name="fade-list-to-right">
          <li :class="thisSessionData.id === item.id ? 'pointer itemActive' : 'pointer'" v-for="(item,index) in sessionList" :key="index" @click="clickSessionListItem(item)">
            <span class="iconfont icon-chat"></span>
            <span>{{item.sessionName || '无标题'}}</span>
            <div class="action" v-if="thisSessionData.id === item.id">
              <el-tooltip content="删除会话" placement="top">
                <span class="iconfont icon-waste" @click="handleDeleteSession"></span>
              </el-tooltip>
            </div>
          </li>
        </transition-group>
      </div>
    </div>
    <div class="loading-more pointer" @click="handleLoadingMore">
      <span>加载更多</span>
    </div>
    <div class="bottom-box">
      <div class="item">
        <button type="button" class="btn transparent" @click="handleFlushList"><span class="iconfont icon-shuaxin"></span>刷新列表</button>
      </div>
      <div class="item">
        <button type="button" class="btn transparent" @click="handleClearSession"><span class="iconfont icon-waste-restore"></span>清空</button>
        <button type="button" class="btn transparent" @click="handleDeleteSession"><span class="iconfont icon-shanchu"></span>删除</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getToken} from "@/utils/auth";

  export default {
    name: "SessionList",
    props: {
      windowData: {
        type: Object,
        default: () => {
        }
      },
      sessionData: {
        type: Object,
        default: () => {
        }
      },
      loading: { type: Boolean, default: false },
      type:{ type: String,default: null },
      domainUniqueKey:{ type: String,default: null },
      drawUniqueKey:{ type: String,default: null },
    },
    watch:{
      // loading(val){
      //   if (!val){
      //     this.getUserSessionList()
      //   }
      // },
    },
    data(){
      return{
        scrollFlag: false,
        queryParam: {
          page: 1,
          size: 10
        },
        sessionList: [],
        isLogin: !!getToken(),
        thisSessionData: {}
      }
    },
    created() {
    },
    mounted() {
      if (this.loading && this.isLogin) {
        this.getUserSessionList()
      }
    },
    methods:{
      handleBefore(){
        if (!this.isLogin) {
          this.$message.info('请先登录后在操作~')
          return false;
        }
        return true
      },
      initSessionList(){
        this.sessionList = [];
        this.queryParam = {page: 1, size: 10};
      },
      getUserSessionList(){
        this.queryParam.type = this.type
        this.queryParam.domainUniqueKey = this.domainUniqueKey
        this.queryParam.drawUniqueKey = this.drawUniqueKey
        this.$api.get('/module/session/sessioninfo/getUserSessionList',this.queryParam).then(res => {
          if (res.status){
            if (res.data.length > 0){
              let sessionListIds = this.sessionList.map(item => item.id);
              res.data.forEach(item => {
                if (!sessionListIds.includes(item.id)){
                  this.sessionList.push(item)
                }
              })
              this.scrollFlag = false
            }
          }
        })
      },
      handleFlushList(){
        this.initSessionList()
        this.getUserSessionList()
      },
      handleLoadingMore(){
        if (this.scrollFlag){
          this.$message.info("没有更多项了")
          return
        }
        this.scrollFlag = true;
        this.queryParam.page++;
        this.getUserSessionList();
      },
      clickSessionListItem(item){
        this.thisSessionData = item
        this.$emit('clickSessionListItem',item);
      },
      flushRecord(){
        this.$emit('clickSessionListItem',this.thisSessionData);
      },
      handleCreateSession(){
        if (this.handleBefore()){
          this.$emit('handleCreateSession');
        }
      },
      handleClearSession(){
        if (this.handleBefore()){
          this.$emit('handleClearSession',this.thisSessionData.id);
        }
      },
      handleDeleteSession(){
        if (this.handleBefore()){
          this.$emit('handleDeleteSession',this.thisSessionData.id);
        }
      },
    }
  }
</script>

<style lang="scss" scoped>

  .session-list {
    width: 100%;
    flex: 1;
    padding: 10px 14px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    align-items: flex-start;
    border-right: 1px solid var(--aside-background);
    flex-direction: column;
    color: var(--font-color-default);
    background: var(--session-list-background);
    transition: padding 0.5s;
  }
  .hiddenStatusSession .session-list {
    padding: 0;
  }

  .createSession{
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }
  .createSession>div{
    width: 100%;
    height: 32px;
    max-height: 32px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    border: 1px var(--session-list-create-session-border) dashed;
    transition: all 0.2s ease;
    margin-bottom: 16px;
  }
  .createSession span{
    font-size: 15px;
    padding: 0 2px;
  }
  .createSession>div:hover{
    border: 1px dashed var(--session-list-create-session-border-hover);
    transform: scale(0.99);
  }

  .list-box {
    flex: 1;
    width: 100%;
    height: 70%;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .list-box::-webkit-scrollbar {
    width: 0;
    background: transparent;
    display: none; /* Chrome Safari */
  }

  .list-box li {
    list-style: none;
    position: relative;
    width: 100%;
    height: 48px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin: 4px 0;

    &:hover {
      background: var(--session-list-li-background);
    }
  }

  .list-box li.pointer.itemActive{
    background: var(--session-list-li-active-background);
  }

  .list-box li span {
    max-width: 75%;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ::v-deep.list-box li span.iconfont {
    color: var(--session-list-li-iconfont-color);
    font-size: 20px;
    margin: 0 4px 0 8px
  }

  .loading-more{
    margin: 5px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px var(--item-border-normal-color) dashed;
    transition: all 0.2s ease;

    &:hover{
      border: 1px dashed var(--session-list-create-session-border-hover);
      transform: scale(0.99);
    }

    span{
      padding: 5px 0;
    }
  }

  .action{
    right: 0;
    position: absolute;
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-radius: 0 5px 5px 0;
    background: var(--session-list-item-action-background);
  }

  .bottom-box {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    height: 15%;
    max-height: 15%;
  }
  .bottom-box .item{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .bottom-box .item button{
    flex: 1;
    margin: 5px 3px;
    display: flex;
    justify-content: center;
    align-items: center;

    .iconfont{
      margin-right: 5px;
      font-size: 15px !important;
    }
  }
</style>
