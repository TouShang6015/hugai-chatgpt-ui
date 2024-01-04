<template>
  <div class="session-list">
    <div class="createSession pointer" style="flex: 0 5%">
      <div @click="handleCreateSession">
        <span class="iconfont icon-add-01"></span>
        <span>新的对话</span>
      </div>
    </div>
    <div class="list-box" style="flex: 0 80%;max-height: 80vh">
      <transition-group name="fade-list-to-right" class="h100">
        <li :class="{ itemActive: thisSessionData.id === item.id }"
            class="pointer rounded-md"
            v-for="(item,index) in sessionList"
            :key="index"
            @click="clickSessionListItem(item)">
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
    <div class="session-bottom w100" style="flex: 0 15%">
      <div class="loading-more pointer" @click="handleLoadingMore">
        <span>加载更多</span>
      </div>
      <div class="flex mg-top-sm bd-bottom pd-bottom-xs">
        <button type="button" style="flex: 1;margin-left: .2rem;margin-right: .2rem" class="btn" @click="handleClearSession">清空</button>
        <button type="button" style="flex: 1;margin-left: .2rem;margin-right: .2rem" class="btn" @click="handleDeleteSession">删除</button>
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
    data(){
      return{
        scrollFlag: false,
        ifTourist: this.$store.getters.ifTourist === '1',
        staticUrl: this.$store.getters.resourceMain.staticWebsite,
        imgHeader: this.$store.getters.imgHeader,
        queryParam: {
          page: 1,
          size: 10
        },
        sessionList: [],
        isLogin: !!getToken(),
        thisSessionData: {},
      }
    },
    watch:{
    },
    created() {
    },
    mounted() {
      // if (this.loading && this.isLogin) {
      //   this.getUserSessionList()
      // }
    },
    methods:{
      handleBefore(){
        if (!this.isLogin) {
          this.$message.info('登录后体验更多功能~')
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
    overflow: hidden;
    align-items: flex-start;
    flex-wrap: nowrap;
    flex-direction: column;
    color: var(--font-color-default);
    background: var(--session-list-background);
    border-right: 1px var(--col-border-color) solid;
    transition: padding 0.5s;
    user-select: none;
    overflow: hidden;
  }
  .hiddenStatusSession .session-list {
    padding: 0;
  }

  .createSession{
    width: 100%;
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
    position: relative;
    width: 100%;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-x: hidden;
    overflow-y: auto;

    li {
      list-style: none;
      position: relative;
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      margin: 4px 0;

      &:hover {
        background: var(--session-list-li-background);
      }
    }

    li.pointer.itemActive{
      background-image: var(--session-list-item-action-background);
    }

    li span {
      max-width: 75%;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .list-box::-webkit-scrollbar {
    width: 0;
    background: transparent;
    display: none; /* Chrome Safari */
  }


  ::v-deep.list-box li span.iconfont {
    color: var(--font-color-default);
    font-size: 20px;
    margin: 0 4px 0 8px
  }

  .session-bottom{
    display: flex;
    flex-direction: column;
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
  }


</style>
