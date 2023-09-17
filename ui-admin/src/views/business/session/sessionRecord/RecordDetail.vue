<template>
  <div class="recordMain">
    <div class="item" v-for="(item,index) in dataList" :key="index">
      <div class="role-user" v-if="item.role === 'user'">
        <div class="item-user">
          <span class="time">{{item.createTime}}</span>
          <span class="name">用户</span>
        </div>
        <span class="content">{{item.content}}</span>
      </div>
      <div class="role-assisant" v-else>
        <div class="item-user">
          <span class="name">助手</span>
          <span class="time">{{item.createTime}}</span>
        </div>
        <div class="content">
          <MarkdownView :content="item.content" :editable="false" :toolbarsFlag="false" :subfield="false" :default-open="'preview'"></MarkdownView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from './api'

  export default {
    name: 'RecordDetail',
    props: {
      sessionId: { type: String, required: true }
    },
    data() {
      return {
        dataList: []
      }
    },
    watch: {},
    created() {
    },
    mounted() {
      this.getRecordList()
    },
    methods: {
      getRecordList() {
        api.getRecordList({ sessionId: this.sessionId }).then(res => {
          this.dataList = res.data
          console.log(this.dataList)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.recordMain{
  height: auto;
  max-height: 700px;
  overflow: auto;
  border-radius: 10px;
}

  .recordMain .item{
    width: 100%;
    border-bottom: 1px #acabab solid;

    .role-user{
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      flex-direction: column;
      padding: 12px 20px;
      background: #f1fff7;

      .item-user{
        border-bottom: 1px #56d50e solid;
      }
      .name{
        background: #56d50e;
      }
    }

    .role-assisant{
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      padding: 12px 20px;
      background: #f6f6f6;

      .item-user{
        border-bottom: 1px #2f94ff solid;
      }
      .name{
        background: #2f94ff;
      }
    }

    .content{
      color: black;
      padding: 8px;
      font-size: 16px;
      font-family: "幼圆", sans-serif;
    }

  }

.item .item-user{
  padding: 6px 0;
  color: white;
  font-size: 12px;

  .name{
    padding: 3px 16px ;
    border-radius: 5px;
  }
  .time{
    padding: 3px 16px ;
    color: #585858;
  }
}
</style>
