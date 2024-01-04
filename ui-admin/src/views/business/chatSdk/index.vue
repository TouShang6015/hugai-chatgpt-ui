<template>
  <div class="app-container">

    <el-card>
      <div slot="header">
        <span style="margin: 0 10px">切换平台：</span>
        <el-select v-model="activeChatSdkId">
          <el-option v-for="(item,index) in tableList" :label="item.sdkName" :value="item.id" :key="index"></el-option>
        </el-select>
        <el-button type="success" size="mini" style="float: right" icon="el-icon-plus" @click="handleAddChatSdkForm">新增平台SDK</el-button>
        <el-button type="primary" size="mini" @click="handleEditChatSdkForm">编辑平台SDK</el-button>
        <el-button type="warning" size="mini" icon="el-icon-refresh" @click="handleFlushCacheChatSdk" disabled>刷新缓存</el-button>
      </div>

      <!--      <el-tabs v-model="activeChatSdkId" type="card">-->
      <!--        <el-tab-pane v-for="(item,index) in tableList" :label="item.sdkName" :name="item.id" :key="index"></el-tab-pane>-->
      <!--      </el-tabs>-->
      <el-tabs v-model="tabActive" type="border-card">
        <el-tab-pane label="模型管理" :name="'1'" >
          <el-divider>模型管理</el-divider>
          <chat-model-index ref="chatModelIndex" :chat-sdk-id="activeChatSdkId" v-if="!loading"></chat-model-index>
        </el-tab-pane>
        <el-tab-pane label="镜像源配置" :name="'2'" >
          <el-divider>镜像源配置</el-divider>
          <chat-sdk-host-index ref="chatSdkHostIndex" :chat-sdk-id="activeChatSdkId" v-if="!loading"></chat-sdk-host-index>
        </el-tab-pane>
        <el-tab-pane label="秘钥池管理" :name="'3'" >
          <el-divider>秘钥池管理</el-divider>
          <chat-keys-index ref="chatKeysIndex" :chat-sdk-id="activeChatSdkId" v-if="!loading"></chat-keys-index>
        </el-tab-pane>
      </el-tabs>

    </el-card>

    <el-dialog title="GPT-SDK平台信息" :visible.sync="dialogChatSdkForm" width="600px" append-to-body>
      <chat-sdk-form ref="chatSdkForm" v-if="dialogChatSdkForm" @cancel="cancelChatSdkForm"></chat-sdk-form>
    </el-dialog>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud';
  import ChatSdkForm from './components/ChatSdkForm'
  import ChatModelIndex from './chatModel/index'
  import ChatSdkHostIndex from './chatSdkHost/index'
  import ChatKeysIndex from './chatKeys/index'

  export default {
    name: 'ChatSdkIndex',
    components: { ChatKeysIndex, ChatSdkHostIndex, ChatModelIndex, ChatSdkForm },
    mixins: [crud],
    data(){
      return{
        activeChatSdkId: undefined,
        dialogChatSdkForm: false,
        tabActive: '1',
        loading: true,
      }
    },
    watch:{
      activeChatSdkId(val){
        this.loading = true
        setTimeout(() => {
          this.loading = false
        },10)
      }
    },
    created() {
    },
    mounted() {
      this.baseHandleQuery();
    },
    methods: {
      baseInit() {
        this.url = '/module/config/chatsdk';
        this.viewName = 'GPT-SDK配置';
        this.isPage = false

        delete this.sortCondition.updateTime
        this.sortCondition.id = true
        return true;
      },
      afterQuery(){
        if (this.tableList != null && this.tableList.length > 0){
          this.activeChatSdkId = this.tableList[0].id
        }
        return true;
      },
      handleAddChatSdkForm(){
        this.dialogChatSdkForm = true
        this.$nextTick(() => {
          this.$refs.chatSdkForm.ifAdd = true
        })
      },
      handleEditChatSdkForm(){
        this.dialogChatSdkForm = true
        if (this.activeChatSdkId != null){
          const form = this.tableList.filter(item => item.id === this.activeChatSdkId)[0]
          if (form != null){
            this.$nextTick(() => {
              this.$refs.chatSdkForm.ifAdd = false
              this.$refs.chatSdkForm.form = JSON.parse(JSON.stringify(form))
            })
          }
        }
      },
      cancelChatSdkForm(){
        this.dialogChatSdkForm = false
      },
      handleFlushCacheChatSdk(){

      }
    }
  }

</script>

<style scoped>

</style>
