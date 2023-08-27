<template>
  <div class="session-list">
    <div class="createSession pointer">
      <div @click="handleCreateSession">
        <span class="iconfont icon-add-01"></span>
        <span>新的对话</span>
      </div>
    </div>
    <div class="list-box">
      <transition-group name="fade-list-to-right">
        <li :class="sessionData.id === item.id ? 'pointer itemActive' : 'pointer'" v-for="(item,index) in sessionList" :key="index" @click="clickSessionListItem(item.id)">
          <span class="iconfont icon-chat"></span>
          <span>{{item.sessionName || '无标题'}}</span>
          <div class="action" v-if="sessionData.id === item.id">
            <el-tooltip content="删除会话" placement="top">
              <span class="iconfont icon-waste" @click="handleDeleteSession(item.id)"></span>
            </el-tooltip>
          </div>
        </li>
      </transition-group>
    </div>

    <div class="bottom-box">

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
      loading: { type: Boolean, default: false }
    },
    watch:{
      loading(val){
        if (!val){
          this.getUserSessionList()
        }
      },
    },
    data(){
      return{
        queryParam: {
          page: 1,
          size: 20
        },
        sessionList: [],
        isLogin: !!getToken(),
      }
    },
    created() {
    },
    mounted() {
    },
    methods:{
      handleBefore(){
        if (!this.isLogin) {
          this.$message.warning('请先登录后在操作')
          return false;
        }
        return true
      },
      getUserSessionList(){
        this.queryParam.type = this.sessionData.type
        this.queryParam.domainUniqueKey = this.sessionData.domainUniqueKey
        this.queryParam.drawUniqueKey = this.sessionData.drawUniqueKey
        this.$api.get('/module/session/sessioninfo/getUserSessionList',this.queryParam).then(res => {
          this.sessionList = res.data
        })
      },
      clickSessionListItem(sessionId){
        if (sessionId !== this.sessionData.id){
          this.$emit('clickSessionListItem',sessionId);
        }
      },
      handleCreateSession(){
        if (this.handleBefore()){
          this.$emit('handleCreateSession');
        }
      },
      handleClearSession(){
        if (this.handleBefore()){
          this.$emit('handleClearSession');
        }
      },
      handleDeleteSession(sessionId){
        if (this.handleBefore()){
          this.$emit('handleDeleteSession',sessionId);
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "/src/assets/css/theme.scss";
  .session-list {
    width: 100%;
    flex: 1;
    padding: 10px 14px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    align-items: flex-start;
    border-right: 1px solid $theme-blue-aside-color;
    flex-direction: column;
    color: $theme-blue-font-default-color;
    background: #2f3340;
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
    border: 1px rgba(255, 255, 255, 0.47) dashed;
    transition: all 0.2s ease;
    margin-bottom: 16px;
  }
  .createSession span{
    font-size: 15px;
    padding: 0 2px;
  }
  .createSession>div:hover{
    border: 1px #ffffff dashed;
    transform: scale(0.99);
  }

  .list-box {
    flex: 1;
    width: 100%;
    max-height: 70%;
    overflow: auto;
  }

  .list-box::-webkit-scrollbar {
    width: 0;
    background: transparent;
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
      background: $theme-blue-aside-hover-color;
    }
  }

  .list-box li.pointer.itemActive{
    background: $theme-blue-aside-hover-color;
  }

  .list-box li span {
    max-width: 75%;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ::v-deep.list-box li span.iconfont {
    color: white;
    font-size: 20px;
    margin: 0 4px 0 8px
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
    background: $theme-blue-session-list-item-action-background;
  }

  .bottom-box {
    align-self: flex-end;
    width: 100%;
    height: 15%;
    max-height: 15%;
  }
</style>
