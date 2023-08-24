<template>
  <div class="nav-menu-wrapper">
    <ul class="menu-list">
      <div v-for="(item, index) in menuList" :key="index" class="menu-item">
        <li :class="{ activeNav: index == current,hiddenStatus: hiddenStatus }" class="pointer"
            @click="changeMenu(item)">
          <span class="item-icon iconfont" :class="item.icon" v-show="!hiddenStatus"></span>
          <span class="item-title" :class="{hiddenStatus:hiddenStatus}">{{item.title}}</span>
          <el-tooltip class="tooltip" effect="dark" :content="item.title" placement="right-start">
            <span class="item-icon iconfont" :class="item.icon" style="font-size: 22px" v-show="hiddenStatus"></span>
          </el-tooltip>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>

  const menuList = [
    { icon: 'icon-AI', routePath: '/home',title: '我的桌面', index: 0 },
    { icon: 'icon-dengpao', routePath: '/sessionQA',title: '问答室', index: 1 },
    { icon: 'icon-chat-bolt', routePath: '/sessionChat',title: 'Ai聊天室', index: 2 },
    { icon: 'icon-tiaoseban ', routePath: '/sessionDraw',title: '绘图助手', index: 3 },
    { icon: 'icon-qixiangleida', routePath: '/sessionDomain',title: '场景对话', index: 4 },
  ]

  export default {
    name: "Menu",
    data() {
      return {
        menuList,
        current: 0,
        hiddenStatus: this.$store.state.settings.hiddenStatusLeft
      };
    },
    watch:{
      '$route.path': {
        handler: function() {
          this.activeIndex()
        },
      },
      '$store.state.settings.hiddenStatusLeft':{
        handler: function(val) {
          this.hiddenStatus = val
        },
      }
    },
    created() {
      this.activeIndex();
    },
    methods: {
      activeIndex(){
        let route = this.$route;
        let path = route.path;
        let filter = this.menuList.filter(item => item.routePath == path);
        this.current = (filter == null || filter.length === 0) ? -1 : filter[0].index;
      },
      changeMenu(item) {
        this.$router.push(item.routePath)
        this.current = item.index;
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "/src/assets/css/theme.scss";

  .nav-menu-wrapper {
    flex: 1;
    max-height: 75%;
    display: flex;

    .menu-list {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: left;

      li {
        border-radius: 10px;
        margin: 0 35px;
        list-style: none;
        position: relative;
      }

      li.hiddenStatus {
        margin: 0 0px;
        list-style: none;
        position: relative;
      }
    }
  }

  .menu-list li:hover {
    background: $theme-blue-aside-hover-color;
  }

  .menu-item{
    width: 100%;
    height: 100%;
  }

  .item-icon{
    margin-left: 20px;
    height: 100%;
  }
  .item-title{
    visibility: visible;
    opacity: 1;
    color: white;
    font-size: 15px;
    margin: 0 10px;
    transition: opacity 0.2s ease, visibility 0.2s 0.2s;
  }
  .item-title.hiddenStatus{
    visibility: hidden;
    opacity: 0;
    position: absolute;
    color: white;
    font-size: 15px;
    margin: 0 10px;
    transition: opacity 0.2s ease, visibility 0.2s 0.2s;
  }

  .activeNav {
    opacity: 1;
    background: $theme-blue-aside-hover-color;
  }
  .activeNav .iconfont{
    color: $theme-blue-font-default-color;
    opacity: 1;
  }

  ::v-deep .iconfont {
    font-size: 18px;
  }
</style>
