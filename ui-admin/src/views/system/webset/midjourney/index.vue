<template>
  <div class="app-container">

    <search-form
      ref="baseSearchForm"
      :query-params="queryParams"
      :builder-form="builderSearch.search"
      :builder-button="builderSearch.button"
      :label-width="'100px'"
      @baseHandleQuery="baseHandleQuery"
      @resetQuery="resetQuery"
      @baseHandleAdd="baseHandleAdd"
      @goApiParamConfig="goApiParamConfig"
      @handleFlushCache="handleFlushCache"
    >
      <template slot="item-xxx" slot-scope="scope">
      </template>
    </search-form>

    <base-table
      :loading="loading"
      :table-list="tableList"
      :query-params="queryParams"
      :page-total="total"
      :builder-columns="builderTable.columns"
      :builder-actions="builderTable.actions"
      :action-width="450"
      @baseHandleQuery="baseHandleQuery"
      @baseHandleEdit="baseHandleEdit"
      @submitDeleteByColumn="submitDeleteByColumn"
      @baseHandleSelectionChange="baseHandleSelectionChange"
      @handleAgainConnect="handleAgainConnect"
      @handleChannelManager="handleChannelManager"
      @handleCloseConnect="handleCloseConnect"
    >
      <template slot="column-accountStatus" slot-scope="scope">
        <el-switch
          v-model="scope.row.accountStatus"
          active-value="NORMAL"
          inactive-value="FREEZE"
          @change="handleStatusChange(scope.row)"
        ></el-switch>
        <!--        <el-tag v-for="item in labelOptionAccountStatus" v-show="scope.row.accountStatus == item.value" :type="item.tagType">{{item.label}}</el-tag>-->
      </template>
      <template slot="column-socketStatus" slot-scope="scope">
        <el-tag v-show="scope.row.socketStatus === 1" type="success">🟢 已连接</el-tag>
        <el-tag v-show="scope.row.socketStatus === 0" type="danger">🟠 已断开</el-tag>
      </template>
    </base-table>

    <base-form
      ref="baseForm"
      :title="title"
      :dialog="dialog"
      :form="form"
      :rules="rules"
      :builder-item="builderForm.items"
      :width="'800px'"
      @cancel="cancel"
      @submitForm="submitForm"
    >
      <template slot="item-ifProxy">
        <el-switch v-model="form.ifProxy" active-value="1" inactive-value="0"></el-switch>
      </template>
    </base-form>

    <el-dialog :title="`账户${form.userName}频道管理`" :visible.sync="dialogChannel" width="700px" @close="handleDialogChannelCancel" append-to-body>
      <ChannelManager v-if="dialogChannel" :id="form.id"></ChannelManager>
    </el-dialog>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud'
  import AccountStatus from "/src/common/constants/AccountStatus";
  import api from './api'
  import ChannelManager from "./channel";

  export default {
    name: 'MidjourneyConfigIndex',
    components: {ChannelManager},
    mixins: [crud],
    props: {},
    data() {
      return {
        builderSearch, builderTable, builderForm,
        labelOptionAccountStatus: Object.values(AccountStatus),
        dialogChannel: false,
        rules: {
          userName: [{required: true, trigger: 'blur', message: ''}],
          userToken: [{required: true, trigger: 'blur', message: ''}],
          userAgent: [{required: true, trigger: 'blur', message: ''}],
          dataObject: [{required: true, trigger: 'blur', message: ''}],
          ifProxy: [{required: true, trigger: 'blur', message: ''}],
        },
      }
    },
    watch: {},
    created() {
    },
    mounted() {
      this.baseHandleQuery()
    },
    methods: {
      baseInit() {
        this.url = '/module/config/cmjaccount'
        this.viewName = 'Midjourney账户'
        this.useBaseComponent = true

        delete this.sortCondition.updateTime
        this.sortCondition.id = false
        return true
      },
      baseHandleAdd(row) {
        this.clearForm();
        this.title = this.viewName + '新增';
        this.form.dataObject = defaultDataObject
        this.dialog = true;
      },
      handleAgainConnect(row){
        api.againConnect(row.id).then(res => {
          if (res.status){
            this.notifySuccess(res.message)
          }else{
            this.notifyError(res.message)
          }
        })
      },
      handleStatusChange(row){
        if (row != null){
          this.apiPut(this.CRUD.edit,JSON.parse(JSON.stringify(row))).then(res => {
            if (res.status){
              this.notifySuccess(res.message)
            }else{
              this.notifyError(res.message)
            }
            this.baseHandleQuery()
          })
        }
      },
      handleChannelManager(row){
        this.clearForm();
        this.form = JSON.parse(JSON.stringify(row))
        this.dialogChannel = true
      },
      handleDialogChannelCancel(){
        this.dialogChannel = false
      },
      goApiParamConfig(){
        this.$router.push("/mjconfig/apiParamConfig")
      },
      handleCloseConnect(item){
        this.apiGetRestful('closeConnect',item.id).then(res => {
          if (res.status){
            this.notifySuccess(res.message)
          }
        })
      },
      handleFlushCache(){
        this.apiGet('flushCache').then(res => {
          if (res.status){
            this.notifySuccess(res.message)
          }
        })
      }
    }
  }

  const builderSearch = {
    search: [
      {title: '账户名', key: 'userName', span: 8},
    ],
    button: [
      {title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh-right', action: 'resetQuery'},
      {title: '查询', key: 'search', type: 'primary',icon:'el-icon-zoom-in', action: 'baseHandleQuery'},
      {title: '新增', key: 'add', type: 'success',icon:'el-icon-circle-plus-outline', action: 'baseHandleAdd'},
      {title: '更新缓存', key: 'flushCache', type: 'danger', action: 'handleFlushCache'},
      {title: 'Api参数配置', key: 'apiParamConfig', type: 'info', action: 'goApiParamConfig'},
    ]
  }
  const builderTable = {
    columns: [
      {title: '账户名', key: 'userName'},
      {title: 'token', key: 'userToken'},
      {title: '帐号状态', key: 'accountStatus',width: '150px'},
      {title: 'Socket状态', key: 'socketStatus',width: '150px'},
      {title: '创建时间', key: 'createTime'}
    ],
    actions: [
      {title: '重新连接Socket', key: 'againConnect', type: 'success',plain: true, action: 'handleAgainConnect'},
      {title: '关闭连接', key: 'closeConnect', type: 'info',plain: true, action: 'handleCloseConnect'},
      {title: '频道管理', key: 'channelManager', type: 'primary',plain: true, action: 'handleChannelManager'},
      {title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      {title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'}
    ]
  }
  const builderForm = {
    items: [
      {title: '账户名', key: 'userName'},
      {title: 'token', key: 'userToken'},
      {title: 'ua', key: 'userAgent'},
      {title: '使用代理', key: 'ifProxy'},
      {title: '默认参数', key: 'dataObject',type: 'textarea',rows: 12},
    ]
  }
  const defaultDataObject = `{
\t"capabilities": 16381,
\t"client_state": {
\t\t"api_code_version": 0,
\t\t"highest_last_message_id": "0",
\t\t"read_state_version": 0,
\t\t"user_guild_settings_version": -1,
\t\t"private_channels_version": "0",
\t\t"user_settings_version": -1,
\t\t"guild_versions": {}
\t},
\t"compress": false,
\t"presence": {
\t\t"activities": [],
\t\t"afk": false,
\t\t"since": 0,
\t\t"status": "online"
\t},
\t"properties": {
\t\t"referer": "https://www.midjourney.com",
\t\t"os": "Windows 10",
\t\t"referring_domain_current": "",
\t\t"client_event_source": null,
\t\t"referrer_current": "",
\t\t"system_locale": "zh-CN",
\t\t"browser": "Chrome",
\t\t"release_channel": "stable",
\t\t"browser_version": "108.0.0.0",
\t\t"device": "",
\t\t"browser_user_agent": "",
\t\t"client_build_number": 222963,
\t\t"referring_domain": "www.midjourney.com"
\t},
\t"token": ""
}`
</script>

<style scoped>

</style>
