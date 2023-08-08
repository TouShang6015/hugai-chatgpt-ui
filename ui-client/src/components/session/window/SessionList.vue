<template>
  <div class="session-list">
    <h1>历史会话</h1>

    <div class="list-box">
        <ul>
          <transition-group name="fade-list-to-right">
            <li :class="sessionData.id === item.id ? 'pointer itemActive' : 'pointer'" v-for="(item,index) in sessionList" :key="index" @click="clickSessionListItem(item.id)">
              <h2>{{item.sessionName || '无标题'}}</h2>
              <div class="litem-bottom">
                <div class="litem-time">{{item.createTime}}</div>
                <div class="litem-count">
                  <el-tooltip content="系统预估值，实际以openAi官网为准。" placement="top">
                    <span>Token消耗：{{item.allConsumerToken}}</span>
                  </el-tooltip>
                </div>
              </div>
            </li>
          </transition-group>
        </ul>
    </div>

    <div class="bottom-box">

    </div>
  </div>
</template>

<script>
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
      }
    },
    data(){
      return{
        queryParam: {},
        sessionList: []
      }
    },
    created() {
    },
    mounted() {
    },
    methods:{
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .session-list {
    flex: 1;
    background: linear-gradient(to bottom, #353b57, #272a37);
    border-radius: 15px;
    box-shadow: 1px 0px 5px 2px rgba(221, 225, 234, 0.4) inset;
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-family: "幼圆", sans-serif;
    color: white;
    font-size: 22px;
    line-height: 42px;
  }

  .list-box {
    border-top: 2px #374076 solid;
    width: 100%;
    height: 76%;
    padding: 15px 15px 0 15px;
    overflow: auto;
  }

  .list-box::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  .bottom-box {
    align-self: flex-end;
    width: 100%;
    height: 15%;
    max-height: 15%;
  }

  .list-box li {
    list-style: none;
    position: relative;
    width: 100%;
    height: 75px;
    margin-bottom: 12px;
    background: #3c5178;
    border-radius: 10px;
    color: white;
    box-shadow: 0px 0px 2px 1px #506a9c inset;
    padding: 2px;
    transition: transform 0.3s;

    &:hover {
      box-shadow: 0px 0px 2px 1px rgb(192, 183, 241) inset;
      background: #4d6182;
      transform: scale(0.97);
    }
  }

  .list-box ul li.pointer.itemActive{
    box-shadow: 0px 0px 2px 1px rgb(215, 211, 236) inset !important;
    background: #566c90 !important;
  }

  .list-box li h2 {
    font-weight: bold;
    max-width: 80%;
    position: absolute;
    top: 30%;
    left: 12px;
    transform: translate(0, -50%);
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .litem-bottom{
    position: absolute;
    width: 92%;
    height: 25%;
    left: 12px;
    bottom: 6px;
    font-size: 12px;
    display: flex;
  }

  .litem-bottom .litem-time {
    font-weight: 200;
    width: 50%;
    position: relative;
    text-align: left;
    color: rgba(234, 231, 231, 0.85);
  }

  .litem-bottom .litem-count {
    flex: 1;
    width: auto;
    font-weight: 200;
    position: relative;
    text-align: right;
    color: rgba(234, 231, 231, 0.85);
  }

  ::v-deep.list-box li .iconfont {
    color: white;
    font-size: 12px;
  }
  ::v-deep.list-box li .iconfont:hover {
    color: #d4d2d2;
  }
</style>
