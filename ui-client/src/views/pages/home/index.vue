<template>
  <div class="home">
    <div class="background">
      <transition name="web-dialog">
        <DeskItem :item-data-list="deskItem" :state="deskItemFlashState"></DeskItem>
      </transition>
      <div class="background-img">
        <el-image lazy
                v-if="initLoading"
                :src="backgroundImageUrl"
                fit="cover"
                draggable="false"
                @load="backgroundImageLoading = true"
                @error="backgroundImageLoading = true">
          <div slot="error" class="image-slot">
            <img src="" alt=""/>
          </div>
        </el-image>
      </div>
    </div>
    <div class="home-bottom">
      <div class="left">
        <el-tooltip placement="top-start">
          <div slot="content" class="system-box">
            <br><p>用户：{{deskData.userSessionStatisticsData.showName}}</p>
            <br><p>总会话数：{{deskData.userSessionStatisticsData.sessionCount}}</p>
            <br><p>绘图数：{{deskData.userSessionStatisticsData.sessionDrawCount}}</p>
            <br><p>Token消耗：{{deskData.userSessionStatisticsData.tokenConsumer}}</p>
            <br><p>加入时间：{{deskData.userSessionStatisticsData.joinTime}}</p>
            <br><p>OpenAi key绑定：{{deskData.userSessionStatisticsData.tokenNum}}个</p>
            <el-divider content-position="center"></el-divider>
            <br><p>🟢会员数：{{deskData.deskCommonData.userCount}}人&ensp;|&ensp;🟡游客数：{{deskData.deskCommonData.touristCount}}人</p>
            <br><p>运行天数：{{deskData.deskCommonData.runDay}}天</p>
            <br><p>网站总访问次数：{{deskData.webClientRequestCount}}</p>
          </div>
          <el-image lazy :src="require('/src/assets/imgs/desk/help.png')" fit="contain" draggable="false"></el-image>
        </el-tooltip>
        <el-tooltip content="更换壁纸" placement="top">
          <el-popover placement="top-start" width="280" trigger="click">
            <BackgroundUpload></BackgroundUpload>
            <el-image lazy slot="reference" :src="require('/src/assets/imgs/desk/bottomBackgroundImg.png')" fit="contain" draggable="false"></el-image>
          </el-popover>
        </el-tooltip>
      </div>
      <div class="center">
        <el-tooltip content="全部" placement="top">
          <el-image lazy :src="require('/src/assets/imgs/desk/bottomAll.png')" fit="contain" draggable="false" @click="handleBottomClick(DeskItemType.common)"></el-image>
        </el-tooltip>
        <el-tooltip content="普通对话" placement="top">
          <el-image lazy :src="require('/src/assets/imgs/desk/bottomChat.png')" fit="contain" draggable="false" @click="handleBottomClick(DeskItemType.chat)"></el-image>
        </el-tooltip>
        <el-tooltip content="场景对话" placement="top">
          <el-image lazy :src="require('/src/assets/imgs/desk/bottomDomain.png')" fit="contain" draggable="false" @click="handleBottomClick(DeskItemType.domain)"></el-image>
        </el-tooltip>
      </div>
      <div class="right">

      </div>
    </div>
  </div>
</template>

<script>
  import iconData from "@/common/constants/IconData";
  import DeskItem from "@/components/DeskItem/DeskItem";
  import BackgroundUpload from "@/views/pages/home/BackgroundUpload";

  const DeskItemType = {
    common: 'common',
    chat: 'chat',
    domain: 'domain'
  }
  const itemChat = iconData.chatData;

  export default {
    name: "HomeIndex",
    components:{BackgroundUpload, DeskItem},
    data() {
      return {
        DeskItemType,

        deskItemFlashState: undefined ,
        backgroundImageLoading: false ,
        initLoading: false ,

        deskItem: [],
        apiItemDomainList: [],
        itemDomain: [],
        staticWebsite: this.$store.getters.configMain.staticWebsite,
        backgroundImageUrl: "",
        deskData: {
          deskCommonData: {},
          userSessionStatisticsData: {},
          webClientRequestCount: 0
        }
      }
    },
    watch: {
      apiItemDomainList(val){
        if (val != null){
          this.itemDomain = JSON.parse(JSON.stringify(val));
          this.itemDomain.forEach(item => {
            item.title = item.iconName;
            item.icon = item.iconPath
            item.path = item.routePath;
          })
        }
      },
      '$store.getters.userDeskImgUrl': {
        handler: function() {
          this.flushBackgroundImg();
        },
      },
    },
    created() {
      this.deskItemFlashState = false;
    },
    mounted() {
      this.getDomainItemList();
      this.flushBackgroundImg();
      this.getDeskData();
    },
    methods: {
      flushBackgroundImg() {
        let userDeskImgUrl = this.$store.getters.userDeskImgUrl;
        let defaultDeskImgUrl = this.$store.getters.configMain.deskImgDefault;
        if (userDeskImgUrl == null || userDeskImgUrl == ''){
          this.backgroundImageUrl = this.staticWebsite + defaultDeskImgUrl;
        }else{
          this.backgroundImageUrl = this.staticWebsite + userDeskImgUrl;
        }
        this.backgroundImageUrl = this.backgroundImageUrl + `?timestamp=${new Date().getTime()}`
      },
      getDomainItemList(){
        this.$api.post('/module/session/domain/baseQueryByParam',{ifDeskShow: '1'}).then(res => {
          this.apiItemDomainList = res.data.slice(0, 15);
          this.flushDeskItem(DeskItemType.common)
        })
      },
      getDeskData(){
        this.$api.get('/module/statistics/getUserDeskInfo',null).then(res => {
          if (res.status){
            this.deskData.deskCommonData = res.data.deskCommonData;
            this.deskData.userSessionStatisticsData = res.data.userSessionStatisticsData;
            this.deskData.webClientRequestCount = res.data.webClientRequestCount;
          }
        })
      },
      initDeskItem(){
        let itemList = [];
        this.$nextTick(() => {
          JSON.parse(JSON.stringify(itemChat)).forEach(item => itemList.push(item))
          JSON.parse(JSON.stringify(this.itemDomain)).forEach(item => itemList.push(item))
        })
        this.deskItem = itemList;
      },
      flushDeskItem: function (itemType) {
        this.deskItemFlashState = false;
        if (itemType == DeskItemType.common) {
          this.initDeskItem();
        } else if (itemType == DeskItemType.chat) {
          this.deskItem = JSON.parse(JSON.stringify(itemChat));
        } else if (itemType == DeskItemType.domain) {
          this.deskItem = JSON.parse(JSON.stringify(this.itemDomain));
        }
        setTimeout(() => {
          this.deskItemFlashState = true;
          if (!this.initLoading) {
            this.initLoading = true;
          }
        }, 15)
      },
      handleBottomClick(itemType){
        if (itemType == DeskItemType.common || itemType == DeskItemType.chat || itemType == DeskItemType.domain){
          this.flushDeskItem(itemType)
        }
      }
    },
  }
</script>

<style scoped>
  .home {
    width: 100%;
    height: 93vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;
    border: 3px solid rgb(104, 100, 100);
    border-radius: 8px;
    box-shadow: 5px 5px 15px 10px rgba(255, 255, 255, 0.6) inset;
  }

  .background {
    display: flex;
    width: 100%;
    height: calc(100% - 45px);
    z-index: 0;
  }

  .background-img {
    display: flex;
    width: 100%;
    height: auto;
  }

  ::v-deep .background-img .el-image {
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0 0;
    z-index: -50;
  }

  ::v-deep .background-img .el-image img {
    width: 100%;
    height: auto;
    opacity: 80%;
    z-index: -9999;
  }

  .home-bottom {
    display: flex;
    flex: 0 1 auto;
    width: calc(100% - 0px);
    height: 45px;
    border-radius: 0 0 8px 8px;
    bottom: 0;
    background-image: linear-gradient(#c5e6ea, #9ea9b8);
    opacity: 80%;
  }

  ::v-deep .home-bottom .el-image {
    width: 34px;
    height: auto;
    z-index: 10;
    margin: 0 10px 0 10px
  }

  ::v-deep .home-bottom .el-image:hover {
    cursor: pointer;
  }

  .home-bottom .left {
    width: 30%;
    height: auto;
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .home-bottom .center {
    width: 40%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .home-bottom .right {
    width: 30%;
    height: auto;
    display: flex;
    justify-content: right;
    align-items: center;
  }

  ::v-deep.home-bottom img{
    transition: transform 0.3s;
    transform-origin: center center;
  }
  ::v-deep.home-bottom img:hover{
     transform: scale(0.8);
   }

  ::v-deep.system-box {
    font-size: 15px ;
    line-height: 1;
  }
  ::v-deep.system-box p{
    font-size: 15px ;
  }
</style>
