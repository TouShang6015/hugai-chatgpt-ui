<template>
  <div class="top">
    <el-row>
      <el-col :span="18">
        <slot name="topTitle">
          <div class="top-title">
            <span>{{windowData.title}}</span>
            <span>{{windowData.description}}</span>
          </div>
        </slot>
      </el-col>
      <el-col :span="6">
        <div class="other-fun">
          <slot name="topRight">
            <el-tooltip content="开启新会话" placement="top">
              <span class="iconfont color-white icon-a-tianjia pointer" @click="handleCreateSession"></span>
            </el-tooltip>
            <el-tooltip content="清空会话" placement="top">
              <span class="iconfont color-white icon-shuaxin pointer" @click="handleClearSession"></span>
            </el-tooltip>
            <el-tooltip content="删除会话" placement="top">
              <span class="iconfont color-white icon-shanchu pointer" @click="handleDeleteSession"></span>
            </el-tooltip>
          </slot>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getToken} from "@/utils/auth";

  export default {
    name: "SessionTop",
    props:{
      windowData: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return{
        isLogin: !!getToken()
      }
    },
    methods: {
      handleBefore(){
        if (!this.isLogin) {
          this.$message.info('登录后体验更多功能~')
          return false;
        }
        return true
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
      handleDeleteSession(){
        if (this.handleBefore()){
          this.$emit('handleDeleteSession');
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .iconfont:hover {

    color: rgb(29, 144, 245);
    .block {
      opacity: 1;
    }

  }
  .top {

    &::after {
      content: "";
      display: block;
      clear: both;
    }

    .head-pic {
      float: left;
    }

    .top-title {
      float: left;
      margin: 5px 0px 0 5px;

      span{
        height: 30px;
      }

      span:nth-child(1) {
        display: block;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }

      span:nth-child(2) {
        display: block;
        color: #9e9e9e;
        font-size: 14px;
        margin-top: 2px;
      }
    }

    .other-fun {
      float: left;
      margin-top: 20px;

      span {
        margin-left: 30px;
      }

      input {
        display: none;
      }
    }
  }
</style>
