<template>
  <div>

    <div style="margin-bottom: 15px;margin-left: .5rem">
      <el-button type="success" icon="el-icon-plus" @click="baseHandleAdd">添加秘钥</el-button>
      <el-button type="danger" icon="el-icon-refresh" @click="handleFlushCache">更新缓存</el-button>
    </div>

    <base-table
      :loading="loading"
      :table-list="tableList"
      :query-params="queryParams"
      :page-total="total"
      :openSelection="false"
      :open-page="true"
      :action-width="150"
      :builder-columns="builderTable.columns"
      :builder-actions="builderTable.actions"
      @baseHandleQuery="baseHandleQuery"
      @baseHandleEdit="baseHandleEdit"
      @submitDeleteByColumn="submitDeleteByColumn"
      @baseHandleSelectionChange="baseHandleSelectionChange"
    >
      <template slot="column-enableStatus" slot-scope="scope">
        <el-switch v-model="scope.row.enableStatus" active-value="0" inactive-value="1" @change="handleColumnEdit(scope.row)"></el-switch>
      </template>
    </base-table>

    <base-form
      ref="baseForm"
      :title="title"
      :dialog="dialog"
      :form="form"
      :auto-rules="true"
      :builder-item="builderForm.items"
      :width="'600px'"
      :label-width="'100px'"
      @cancel="cancel"
      @submitForm="submitForm"
      @changeRules="changeRules"
    >
      <template slot="item-xxx">
      </template>
    </base-form>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud';

  export default {
    name: 'ChatKeysIndex',
    mixins: [crud],
    props:{
      chatSdkId: { type: String, required: true }
    },
    data(){
      return{
        builderTable,builderForm,
        rules:{
          xxx: [{ required: true, trigger: "blur", message: "" }]
        }
      }
    },
    watch:{
    },
    created() {
    },
    mounted() {
      this.baseHandleQuery();
    },
    methods: {
      baseInit() {
        this.url = '/module/config/chatkeys';
        this.viewName = '对话秘钥池管理';
        this.useBaseComponent = true;

        this.queryParams.chatSdkId = this.chatSdkId
        return true;
      },
      beforeAdd(){
        this.form.chatSdkId = this.chatSdkId;
        return true;
      },
      beforeEdit(){
        this.form.chatSdkId = this.chatSdkId;
        return true;
      },
      handleFlushCache(){
        this.$api.get('/module/config/chatkeys/flushCache').then(res => {
          this.notifySuccess(res.message)
        })
      },
      handleColumnEdit(column){
        this.apiPut(this.CRUD.edit,column).then(res => {
          if (res.status){
            this.notifySuccess(res.message)
            this.baseHandleQuery()
          }else{
            this.notifyError(res.message)
          }
        })
      },
      changeRules(rules){
        delete rules.appId
        delete rules.apiSecret
      }
    }
  }

  const builderTable = {
    columns: [
      { title: 'Token', key: 'apiToken'},
      { title: '别名', key: 'aliasName'},
      { title: '备注', key: 'remark'},
      { title: '可用状态', key: 'enableStatus',width: 120 },
      { title: '权重', key: 'weightValue',width: 120 },
    ],
    actions: [
      { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'},
    ]
  };
  const builderForm = {
    items: [
      { title: 'ApiToken', key: 'apiToken'},
      { title: 'AppId', key: 'appId'},
      { title: 'ApiSecret', key: 'apiSecret'},
      { title: '别名', key: 'aliasName'},
      { title: '权重', key: 'weightValue',type: 'number',min: 0,max: 10 },
      { title: '可用状态', key: 'enableStatus',type: 'switch',activeValue: '0',inactiveValue: '1'},
    ]
  };
</script>

<style scoped>

</style>
