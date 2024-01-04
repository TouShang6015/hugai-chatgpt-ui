<template>
  <div class="chat-tools">
    <div class="create-time">{{createTime}}</div>
    <el-tooltip content="复制" effect="dark" placement="bottom">
      <div class="icon" @click="$copy(content, '内容已复制')">
        <img :src="require('/src/assets/imgs/other/icon-copy.png')" alt="">
      </div>
    </el-tooltip>
    <el-tooltip content="删除" effect="dark" placement="bottom">
      <div class="icon" @click="handleIconDeleteClick">
        <img :src="require('/src/assets/imgs/other/icon-delete.png')" alt="">
      </div>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    name: "ChatTools",
    props:{
      content: { type: String, default: '' },
      sessionRecordId: { type: String, default: null },
      sessionId: { type: String, default: null },
      createTime: { type: String, default: '' }
    },
    methods:{
      handleIconDeleteClick(){
        if (this.sessionRecordId != null && this.sessionId != null){
          this.$confirm('确定删除该条会话记录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.get('/module/session/sessionrecord/removeSessionRecord',{
              sessionId: this.sessionId,
              sessionRecordIds: this.sessionRecordId
            }).then(res => {
              if (res.status)
                this.$emit('deleteAfter',this.sessionRecordId)
            })
          }).catch(() => {
          });
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .chat-tools{
    width: 100%;
    max-height: 40px;
    height: 40px;
  }
  .chat-tools .icon{
    margin: 0 2px;
    width: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    &:active{
      transform: scale(0.9);
      transition: all 0.2s ease-in-out;
    }
  }

  .create-time{
    font-size: .8rem;
    color: var(--font-color-no-normal);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: .5rem;
    margin-right: 1rem;
  }

  .chat-tools img{
    width: 100%;
  }
</style>
