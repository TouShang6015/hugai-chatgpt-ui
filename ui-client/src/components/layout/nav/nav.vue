<template>
  <div class="nav">
    <div class="nav-menu-wrapper">
      <ul class="menu-list">
        <div v-for="(item, index) in menuList" :key="index" class="menu-item">
          <li :class="{ activeNav: index == current }" class="pointer" @click="changeMenu(item)">
<!--            <div class="block"></div>-->
            <el-tooltip class="tooltip" effect="dark" :content="item.title" placement="right-start">
              <span class="iconfont" :class="item.icon"></span>
            </el-tooltip>
          </li>
        </div>
      </ul>
    </div>
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
    data() {
      return {
        menuList,
        current: 0,
      };
    },
    watch:{
      '$route.path': {
        handler: function(val) {
          this.activeIndex()
        },
      },
    },
    created() {
      this.activeIndex();
    },
    methods: {
      activeIndex(){
        var route = this.$route;
        let path = route.path;
        let filter = this.menuList.filter(item => item.routePath == path);
        this.current = (filter == null || filter.length === 0) ? -1 : filter[0].index;
      },
      changeMenu(item) {
        this.$router.push(item.routePath)
        this.current = item.index;
      }
    },
  };
</script>

<style lang="scss" scoped>

  .nav {
    margin-top: 52px;
    width: 100%;
    height: 100%;
    position: relative;

    .nav-menu-wrapper {
      height: 100vh;
      position: relative;

      .menu-list {
        width: 100%;
        height: 65px;
        line-height: 65px;
        text-align: center;

        li {
          list-style: none;
          position: relative;

          &:hover {
            box-shadow: 0px 0px 8px 3px rgb(67, 93, 226) inset;
            border-radius: 10px;
            opacity: 1;

            span {
              color: rgb(29, 144, 245);
              opacity: 1;
            }

            .block {
              opacity: 1;
            }
          }
        }
      }
    }

    .own-pic {
      position: absolute;
      bottom: 10%;
      margin-left: 25px;
    }
  }

  .menu-item{
    width: 100%;
    height: 100%;
    /*border: 1px darkcyan solid;*/
  }

  .activeNav {
    box-shadow: 0px 0px 6px 3px rgb(67, 93, 226) inset;
    border-radius: 10px;
    opacity: 1;
    span {
      color: rgb(29, 144, 245);
      opacity: 1;
    }
  }
</style>
