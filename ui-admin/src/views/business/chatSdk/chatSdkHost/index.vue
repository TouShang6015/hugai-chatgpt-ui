<template>
  <div>

    <div style="margin-bottom: 15px;margin-left: .5rem">
      <el-button type="success" icon="el-icon-plus" @click="baseHandleAdd">新增镜像源</el-button>
      <el-button type="danger" icon="el-icon-refresh" @click="handleFlushCache">更新缓存</el-button>
    </div>

    <base-table
      :loading="loading"
      :table-list="tableList"
      :query-params="queryParams"
      :page-total="total"
      :openSelection="false"
      :open-page="false"
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
      <template slot="column-ifDefault" slot-scope="scope">
        <el-switch v-model="scope.row.ifDefault" active-value="1" inactive-value="0" @change="handleColumnEdit(scope.row)"></el-switch>
      </template>
      <template slot="column-ifProxy" slot-scope="scope">
        <el-switch v-model="scope.row.ifProxy" active-value="1" inactive-value="0" @change="handleColumnEdit(scope.row)"></el-switch>
      </template>
    </base-table>

    <base-form
      ref="baseForm"
      :title="title"
      :dialog="dialog"
      :form="form"
      :auto-rules="true"
      :builder-item="builderForm.items"
      :width="'700px'"
      :label-width="'110px'"
      @cancel="cancel"
      @submitForm="submitForm"
    >
      <template slot="item-xxx">
      </template>
    </base-form>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud';

  export default {
    name: 'ChatSdkHostIndex',
    mixins: [crud],
    props:{
      chatSdkId: { type: String, required: true }
    },
    data(){
      return{
        builderTable,builderForm,

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
        this.url = '/module/config/chatsdkhost';
        this.viewName = '镜像源管理';
        this.useBaseComponent = true;

        this.queryParams.chatSdkId = this.chatSdkId
        return true;
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
      beforeAdd(){
        this.form.chatSdkId = this.chatSdkId;
        return true;
      },
      beforeEdit(){
        this.form.chatSdkId = this.chatSdkId;
        return true;
      },
      handleFlushCache(){
        this.$api.get('/module/config/chatsdkhost/flushCache').then(res => {
          this.notifySuccess(res.message)
        })
      },
    }
  }

  const builderTable = {
    columns: [
      { title: '镜像源地址', key: 'hostUrl',width: 380},
      { title: '开启状态', key: 'enableStatus' },
      { title: '是否默认', key: 'ifDefault' },
      { title: '是否开启代理', key: 'ifProxy' },
      { title: '超时时间', key: 'timeoutValue' },
      { title: '最大并发', key: 'maxConnect' },
      { title: '权重', key: 'weightValue' },
    ],
    actions: [
      { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'},
    ]
  };
  const builderForm = {
    items: [
      { title: '镜像源', key: 'hostUrl' },
      { title: '权重', key: 'weightValue',type: 'number',min: 0,max: 10 },
      { title: '超时时间(秒)', key: 'timeoutValue',type: 'number',min: -1,span: 12  },
      { title: '最大并发', key: 'maxConnect',type: 'number',min: -1,span: 12  },
      { title: '设为默认', key: 'ifDefault',type: 'switch', activeValue: '1', inactiveValue: '0',span: 12 },
      { title: '开启代理', key: 'ifProxy',type: 'switch', activeValue: '1', inactiveValue: '0',span: 12 },
      { title: '开启状态', key: 'enableStatus',type: 'switch', activeValue: '0', inactiveValue: '1',span: 12 },

    ]
  };
</script>

<style scoped>

</style>
